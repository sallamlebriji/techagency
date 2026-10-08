import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import crypto from 'node:crypto';
import path from 'node:path';
import {initializeStore,list,write,remove} from './store.js';
import {closeDb} from './db.js';
const root=path.resolve(import.meta.dirname,'../..');
for(const file of ['backend/.env.local','backend/.env','.env'])dotenv.config({path:path.join(root,file),quiet:true});
const email=process.env.ADMIN_EMAIL?.trim().toLowerCase(),password=process.env.ADMIN_PASSWORD;
if(!email||!/^\S+@\S+\.\S+$/.test(email)||!password||password.length<12||password.length>128)throw Error('ADMIN_EMAIL et ADMIN_PASSWORD (12 à 128 caractères) requis.');
if(process.argv.includes('--reset')||process.argv.includes('--from-example'))throw Error('Options anciennes désactivées. Utiliser --reset-password pour un seul compte existant.');
await initializeStore();
try{
 const existing=(await list('users')).find(x=>x.email===email);
 if(existing&&!process.argv.includes('--reset-password'))throw Error('Ce compte existe. Réinitialisation explicite : --reset-password.');
 const id=existing?.id||crypto.randomUUID(),now=new Date().toISOString();
 await write('users',id,{...existing,id,email,name:existing?.name||'Administration INNOVIA',role:existing?.role||'admin',passwordHash:await bcrypt.hash(password,12),createdAt:existing?.createdAt||now,updatedAt:now});
 for(const bucket of ['sessions','resets'])for(const record of await list(bucket))if(record.userId===id&&record.key)await remove(bucket,record.key);
 const auditId=crypto.randomUUID();await write('audit',auditId,{id:auditId,at:now,user:'CLI locale',action:existing?'mot de passe réinitialisé':'administrateur créé',detail:email});
 console.log('Compte prêt. Aucun autre compte modifié.');
}finally{await closeDb();}
