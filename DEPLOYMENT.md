# TechAgency deployment

## Architecture

- Frontend: `frontend/`, deploye sur Vercel.
- Backend API: `backend/`, deploye sur Render.
- Database: MongoDB Atlas.

## 1. MongoDB Atlas

Create a free/shared cluster, then copy the connection string:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=techagency
```

## 2. Backend on Render

Create a new Render Web Service from the GitHub repo.

Use the root repository with:

```bash
Build Command: npm install
Start Command: npm run server
```

Environment variables:

```env
MONGODB_URI=your MongoDB Atlas URI
MONGODB_DB=techagency
FRONTEND_URL=https://your-vercel-app.vercel.app
ADMIN_EMAIL=admin@your-domain.com
ADMIN_PASSWORD=use-a-strong-password
SESSION_SECRET=use-a-long-random-secret
```

The first backend startup creates the admin user in MongoDB if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set. You can also run:

```bash
npm run create-admin
```

After deploy, test:

```text
https://your-render-service.onrender.com/api/health
https://your-render-service.onrender.com/api/db-health
```

Expected:

```json
{"ok":true,"service":"running"}
```

## 3. Frontend on Vercel

Import the same GitHub repo in Vercel, then set the project root to:

```text
frontend
```

Use:

```bash
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Environment variable:

```env
VITE_API_URL=https://your-render-service.onrender.com
```

Vercel will use `frontend/vercel.json` so `/admin` works on direct refresh.

## 4. After both deployments

Update Render's `FRONTEND_URL` with your final Vercel domain:

```env
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Then redeploy Render.

Verify:

```text
https://your-vercel-app.vercel.app/
https://your-vercel-app.vercel.app/admin
```

Admin changes should save to MongoDB through the Render API.
