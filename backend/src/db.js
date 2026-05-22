import dns from 'node:dns';
import { MongoClient } from 'mongodb';

let client;
let db;
let dnsConfigured = false;

function configureMongoDns(uri) {
  if (dnsConfigured || !uri.startsWith('mongodb+srv://')) return;

  const configuredServers = process.env.MONGODB_DNS_SERVERS || (process.env.NODE_ENV === 'production' ? '' : '1.1.1.1,8.8.8.8');
  const servers = configuredServers
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (servers.length > 0) {
    dns.setServers(servers);
  }

  dnsConfigured = true;
}

export async function getDb() {
  if (db) return db;

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
  const dbName = process.env.MONGODB_DB || 'techagency';

  configureMongoDns(uri);

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

export async function closeDb() {
  if (client) {
    await client.close();
    client = undefined;
    db = undefined;
  }
}
