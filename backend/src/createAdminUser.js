import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDb, closeDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const email = process.env.ADMIN_EMAIL?.toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD are required.');
  process.exit(1);
}

const db = await getDb();
const collection = db.collection('admin_users');
await collection.createIndex({ email: 1 }, { unique: true });

const passwordHash = await bcrypt.hash(password, 12);
await collection.updateOne(
  { email },
  {
    $set: {
      email,
      name: 'TechAgency Admin',
      passwordHash,
      role: 'admin',
      updatedAt: new Date(),
    },
    $setOnInsert: {
      createdAt: new Date(),
    },
  },
  { upsert: true },
);

console.log(`Admin user ready: ${email}`);
await closeDb();
