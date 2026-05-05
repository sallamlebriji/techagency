import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { getDb, closeDb } from './db.js';

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
