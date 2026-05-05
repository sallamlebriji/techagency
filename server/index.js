import 'dotenv/config';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import crypto from 'node:crypto';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDb } from './db.js';
import { defaultAdminConfig } from './defaultAdminData.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const configKey = 'main';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const adminEmail = process.env.ADMIN_EMAIL || 'admin@techagency.local';
const adminPassword = process.env.ADMIN_PASSWORD || '';
const cookieName = 'techagency_admin';

function getSessionSecret() {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || 'dev-session-secret-change-me';
}

function signToken(value) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('hex');
}

function createAdminToken(userId) {
  const payload = `admin.${userId}.${Date.now()}`;
  return `${payload}.${signToken(payload)}`;
}

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((cookie) => cookie.trim().split('='))
      .filter(([key, value]) => key && value)
      .map(([key, value]) => [key, decodeURIComponent(value)]),
  );
}

function isValidAdminToken(token) {
  if (!token || !token.includes('.')) return false;
  const [role, userId, timestamp, signature] = token.split('.');
  const payload = `${role}.${userId}.${timestamp}`;
  return role === 'admin' && signature === signToken(payload);
}

function requireAdmin(request, response, next) {
  const token = parseCookies(request.headers.cookie)[cookieName];
  if (!isValidAdminToken(token)) {
    response.status(401).json({ message: 'Authentification admin requise.' });
    return;
  }
  next();
}

app.use(express.json({ limit: '1mb' }));
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
  }),
);

app.post('/api/admin-login', async (request, response) => {
  try {
    const { email, password } = request.body || {};

    if (!email || !password) {
      response.status(400).json({ message: 'Email et mot de passe obligatoires.' });
      return;
    }

    const collection = await getAdminUsersCollection();
    const user = await collection.findOne({ email: String(email).toLowerCase() });
    const validPassword = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!user || !validPassword) {
      response.status(401).json({ message: 'Identifiants admin incorrects.' });
      return;
    }

    await collection.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

    const secure = process.env.NODE_ENV === 'production';
    response.cookie(cookieName, createAdminToken(String(user._id)), {
      httpOnly: true,
      secure,
      sameSite: secure ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 12,
      path: '/',
    });
    response.json({ ok: true, user: { email: user.email, name: user.name } });
  } catch (error) {
    response.status(500).json({ message: 'Erreur authentification admin.', detail: error.message });
  }
});

app.post('/api/admin-logout', (_request, response) => {
  response.clearCookie(cookieName, { path: '/' });
  response.json({ ok: true });
});

app.get('/api/admin-me', (request, response) => {
  const token = parseCookies(request.headers.cookie)[cookieName];
  response.json({ authenticated: isValidAdminToken(token) });
});

async function getConfigCollection() {
  const db = await getDb();
  return db.collection('admin_config');
}

async function getAdminUsersCollection() {
  const db = await getDb();
  return db.collection('admin_users');
}

async function ensureDefaultAdminUser() {
  const collection = await getAdminUsersCollection();
  await collection.createIndex({ email: 1 }, { unique: true });

  const email = adminEmail.toLowerCase();
  const existingUser = await collection.findOne({ email });
  if (existingUser || !adminPassword) return;

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await collection.insertOne({
    email,
    name: 'TechAgency Admin',
    passwordHash,
    role: 'admin',
    createdAt: new Date(),
  });
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'running' });
});

app.get('/api/db-health', async (_request, response) => {
  try {
    await getDb();
    response.json({ ok: true, database: 'connected' });
  } catch (error) {
    response.status(500).json({ ok: false, message: error.message });
  }
});

app.get('/api/admin-config', requireAdmin, async (_request, response) => {
  try {
    const collection = await getConfigCollection();
    const savedConfig = await collection.findOne({ key: configKey }, { projection: { _id: 0 } });

    if (!savedConfig) {
      const now = new Date();
      const document = { key: configKey, ...defaultAdminConfig, createdAt: now, updatedAt: now };
      await collection.insertOne(document);
      const { _id, ...config } = document;
      response.json(config);
      return;
    }

    response.json({
      ...savedConfig,
      sections: savedConfig.sections || defaultAdminConfig.sections,
      offers: savedConfig.offers || defaultAdminConfig.offers,
      projects: savedConfig.projects || defaultAdminConfig.projects,
      settings: { ...defaultAdminConfig.settings, ...(savedConfig.settings || {}) },
    });
  } catch (error) {
    response.status(500).json({ message: 'Impossible de charger la configuration admin.', detail: error.message });
  }
});

app.get('/api/public-content', async (_request, response) => {
  try {
    const collection = await getConfigCollection();
    const savedConfig = await collection.findOne({ key: configKey }, { projection: { _id: 0 } });
    const projects = savedConfig?.projects || defaultAdminConfig.projects;

    response.json({
      sections: savedConfig?.sections || defaultAdminConfig.sections,
      offers: savedConfig?.offers || defaultAdminConfig.offers,
      projects: projects.filter((project) => project.visible !== false),
      settings: { ...defaultAdminConfig.settings, ...(savedConfig?.settings || {}) },
    });
  } catch (error) {
    response.status(500).json({ message: 'Impossible de charger le contenu public.', detail: error.message });
  }
});

app.put('/api/admin-config', requireAdmin, async (request, response) => {
  try {
    const { sections, offers, projects, settings } = request.body;

    if (
      !Array.isArray(sections) ||
      !Array.isArray(offers) ||
      !Array.isArray(projects) ||
      typeof settings !== 'object' ||
      settings === null
    ) {
      response.status(400).json({ message: 'Payload invalide.' });
      return;
    }

    const collection = await getConfigCollection();
    const updatedAt = new Date();
    await collection.updateOne(
      { key: configKey },
      {
        $set: { sections, offers, projects, settings, updatedAt },
        $setOnInsert: { createdAt: updatedAt },
      },
      { upsert: true },
    );

    response.json({ ok: true, updatedAt });
  } catch (error) {
    response.status(500).json({ message: 'Impossible d enregistrer la configuration admin.', detail: error.message });
  }
});

app.post('/api/contact', async (request, response) => {
  try {
    const { name, email, phone, projectType, message } = request.body || {};

    if (!name || !email || !message) {
      response.status(400).json({ message: 'Nom, email et message sont obligatoires.' });
      return;
    }

    const db = await getDb();
    const collection = db.collection('contact_requests');
    const configCollection = await getConfigCollection();
    const savedConfig = await configCollection.findOne({ key: configKey }, { projection: { _id: 0, settings: 1 } });
    const recipient = savedConfig?.settings?.formRecipientEmail || defaultAdminConfig.settings.formRecipientEmail;

    const document = {
      name,
      email,
      phone: phone || '',
      projectType: projectType || '',
      message,
      recipient,
      status: 'new',
      createdAt: new Date(),
    };

    await collection.insertOne(document);
    response.json({ ok: true, recipient });
  } catch (error) {
    response.status(500).json({ message: 'Impossible d enregistrer la demande.', detail: error.message });
  }
});

app.use(express.static(distPath));

app.get('*splat', (request, response, next) => {
  if (request.path.startsWith('/api')) {
    next();
    return;
  }

  response.sendFile(path.join(distPath, 'index.html'));
});

ensureDefaultAdminUser()
  .catch((error) => {
    console.warn(`Default admin seed skipped: ${error.message}`);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`TechAgency API running on http://127.0.0.1:${port}`);
    });
  });
