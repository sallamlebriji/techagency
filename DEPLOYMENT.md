# TechAgency deployment

## Architecture

- Frontend: Vercel, connected to GitHub.
- Backend API: Render Web Service.
- Database: MongoDB Atlas.

Render still has a Free compute option for web services, but it is intended for personal projects/prototypes and has usage limits. Vercel Hobby is also free for personal projects.

## 1. MongoDB Atlas

Create a free/shared cluster, then copy the connection string:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=techagency
```

Add your Render outbound access in Atlas Network Access. During setup, you can temporarily allow `0.0.0.0/0`, then tighten later.

## 2. Backend on Render

Create a new Render Web Service from the GitHub repo.

Use:

```bash
Build Command: npm install
Start Command: npm run server
```

Environment variables:

```env
MONGODB_URI=your MongoDB Atlas URI
MONGODB_DB=techagency
FRONTEND_URL=https://your-vercel-app.vercel.app
```

After deploy, test:

```text
https://your-render-service.onrender.com/api/health
```

Expected:

```json
{"ok":true,"database":"connected"}
```

## 3. Frontend on Vercel

Import the same GitHub repo in Vercel.

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

Vercel will use `vercel.json` so `/admin` works on direct refresh.

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
