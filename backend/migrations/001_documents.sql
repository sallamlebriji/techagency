-- Applied automatically by initializeStore; persistent SQLite, WAL journaling.
CREATE TABLE IF NOT EXISTS migrations(version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS documents(bucket TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, PRIMARY KEY(bucket,key));
-- MongoDB uses cms_documents with unique compound index {bucket:1,key:1}.
-- Both stores keep content draft/publication, users, sessions, media, requests and audit in distinct buckets.
