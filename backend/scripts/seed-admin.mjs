import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import {initializeStore,list,write} from '../src/store.js';
import {closeDb} from '../src/db.js';

const root=path.resolve(import.meta.dirname,'../..');
for(const file of ['backend/.env.local','backend/.env','.env'])dotenv.config({path:path.join(root,file),quiet:true});
const email=process.env.ADMIN_EMAIL?.trim().toLowerCase();
if(!process.env.MONGODB_URI)throw Error('MONGODB_URI requis pour ce seeder.');
if(!email||!/^\S+@\S+\.\S+$/.test(email))throw Error('ADMIN_EMAIL valide requis.');

try{
 await initializeStore();
 const existing=(await list('users')).find(user=>user.email===email);
 if(existing){
  if(existing.role!=='admin')throw Error('Ce compte existe avec un autre rôle. Aucun changement effectué.');
  console.log(`Administrateur déjà présent : ${email}. Aucun changement effectué.`);
 }else{
  const configured=process.env.ADMIN_PASSWORD;
  const generated=!configured||configured.length<12;
  const password=generated?crypto.randomBytes(24).toString('base64url'):configured;
  if(password.length>128)throw Error('ADMIN_PASSWORD : 128 caractères maximum.');
  const id=crypto.randomUUID(),now=new Date().toISOString();
  const credentialsFile=path.join(root,'backend/.local-admin.txt');
  if(generated){
   // Write the credentials first; never create an account whose password is lost.
   await fs.writeFile(credentialsFile,`Email: ${email}\nPassword: ${password}\n`,{mode:0o600,flag:'wx'});
  }
  await write('users',id,{id,email,name:process.env.ADMIN_NAME?.trim()||'Administration INNOVIA',role:'admin',passwordHash:await bcrypt.hash(password,12),createdAt:now,updatedAt:now});
  const auditId=crypto.randomUUID();
  await write('audit',auditId,{id:auditId,at:now,user:'Seeder local',action:'administrateur créé',detail:email});
  console.log(`Administrateur créé : ${email}`);
  console.log(generated?'Mot de passe généré enregistré dans backend/.local-admin.txt (privé).':'Mot de passe fourni par ADMIN_PASSWORD.');
 }
}finally{await closeDb();}
