import 'dotenv/config';
import cors from 'cors';
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

app.use(express.json({ limit: '1mb' }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
  }),
);

async function getConfigCollection() {
  const db = await getDb();
  return db.collection('admin_config');
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

app.get('/api/admin-config', async (_request, response) => {
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

app.put('/api/admin-config', async (request, response) => {
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

app.use(express.static(distPath));

app.get('*splat', (request, response, next) => {
  if (request.path.startsWith('/api')) {
    next();
    return;
  }

  response.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`TechAgency API running on http://127.0.0.1:${port}`);
});
