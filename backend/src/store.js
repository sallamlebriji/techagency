import fs from 'node:fs';
import path from 'node:path';
import {DatabaseSync} from 'node:sqlite';
import {getDb} from './db.js';
let sqlite;
export async function initializeStore(){
  if(process.env.MONGODB_URI){const db=await getDb();await db.collection('cms_documents').createIndex({bucket:1,key:1},{unique:true});return 'mongodb';}
  const file=path.resolve(process.env.SQLITE_PATH||path.join(import.meta.dirname,'../data/innovia.sqlite'));fs.mkdirSync(path.dirname(file),{recursive:true});
  sqlite=new DatabaseSync(file);sqlite.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS migrations(version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS documents(bucket TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, PRIMARY KEY(bucket,key)); INSERT OR IGNORE INTO migrations VALUES(1, CURRENT_TIMESTAMP);');return 'sqlite';
}
export async function read(bucket,key){if(sqlite){const row=sqlite.prepare('SELECT value FROM documents WHERE bucket=? AND key=?').get(bucket,key);return row?JSON.parse(row.value):null;}const row=await(await getDb()).collection('cms_documents').findOne({bucket,key});return row?.value||null;}
export async function write(bucket,key,value){if(sqlite){sqlite.prepare('INSERT INTO documents VALUES(?,?,?) ON CONFLICT(bucket,key) DO UPDATE SET value=excluded.value').run(bucket,key,JSON.stringify(value));return;}await(await getDb()).collection('cms_documents').updateOne({bucket,key},{$set:{value}},{upsert:true});}
export async function remove(bucket,key){if(sqlite){sqlite.prepare('DELETE FROM documents WHERE bucket=? AND key=?').run(bucket,key);return;}await(await getDb()).collection('cms_documents').deleteOne({bucket,key});}
export async function list(bucket){if(sqlite)return sqlite.prepare('SELECT value FROM documents WHERE bucket=?').all(bucket).map(x=>JSON.parse(x.value));return(await(await getDb()).collection('cms_documents').find({bucket}).toArray()).map(x=>x.value);}
// Optimistic publication/draft writes are atomic in both storage engines.
export async function compareWrite(bucket,key,revision,value){if(sqlite)return sqlite.prepare("UPDATE documents SET value=? WHERE bucket=? AND key=? AND json_extract(value,'$.revision')=?").run(JSON.stringify(value),bucket,key,revision).changes===1;const result=await(await getDb()).collection('cms_documents').updateOne({bucket,key,'value.revision':revision},{$set:{value}});return result.modifiedCount===1;}
