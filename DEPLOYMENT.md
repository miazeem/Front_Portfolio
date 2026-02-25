# Deployment Guide — Laravel (Render) + React (Vercel)

---

## Overview

| Part | Platform | Runtime |
|------|----------|---------|
| Backend (Laravel 12) | [Render](https://render.com) | Docker + PostgreSQL |
| Frontend (React + Vite) | [Vercel](https://vercel.com) | Static / SPA |

> **Database note:** Render's free managed database is **PostgreSQL**, not MySQL.  
> Laravel supports both — you only need to change `DB_CONNECTION=pgsql` in your `.env`.  
> The `pdo_pgsql` extension is already included in the `Dockerfile`.

---

## Files Created For You

| File | Purpose |
|------|---------|
| `backend/Dockerfile` | Containerises the Laravel API for Render |
| `backend/.dockerignore` | Excludes unnecessary files from the Docker image |
| `backend/render.yaml` | Infrastructure-as-code for Render (optional, but useful) |
| `backend/config/cors.php` | Updated to allow all `*.vercel.app` origins automatically |
| `frontend/vercel.json` | Fixes client-side React Router routing on Vercel |

---

## PART 1 — Deploy Backend to Render

### Step 1 — Push your code to GitHub

Make sure **both** `backend/` and `frontend/` are pushed to a GitHub repository.

```bash
git add .
git commit -m "Add deployment config files"
git push origin main
```

> Render pulls code directly from GitHub on every push.

---

### Step 2 — Create a Render account

Go to [https://render.com](https://render.com) and sign up (free tier is enough).

---

### Step 3 — Create a PostgreSQL database on Render

1. Click **New → PostgreSQL**
2. Fill in:
   - **Name:** `portfolio-db`
   - **Region:** Choose the closest to you
   - **Plan:** Free
3. Click **Create Database**
4. Once created, copy the **Internal Database URL** — you'll need it later

---

### Step 4 — Create a Web Service on Render

1. Click **New → Web Service**
2. Connect your GitHub repo
3. Configure the service:
   - **Name:** `portfolio-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Docker`
   - **Branch:** `main`
   - **Plan:** Free
4. Click **Create Web Service** — it will fail first time until you set env vars (next step)

---

### Step 5 — Set Environment Variables on Render

In your Web Service → **Environment** tab, add the following:

| Key | Value |
|-----|-------|
| `APP_NAME` | Portfolio |
| `APP_ENV` | production |
| `APP_DEBUG` | false |
| `APP_KEY` | *(click "Generate" or run `php artisan key:generate --show` locally)* |
| `APP_URL` | `https://portfolio-backend.onrender.com` *(your Render service URL)* |
| `FRONTEND_URL` | `https://your-app.vercel.app` *(your Vercel URL — add after Step 10)* |
| `DB_CONNECTION` | pgsql |
| `DATABASE_URL` | *(paste the Internal Database URL from Step 3)* |
| `CACHE_STORE` | database |
| `SESSION_DRIVER` | database |
| `QUEUE_CONNECTION` | database |
| `LOG_CHANNEL` | stderr |
| `SANCTUM_STATEFUL_DOMAINS` | `your-app.vercel.app` *(no https://)* |

> After adding env vars, click **Manual Deploy → Deploy latest commit** to redeploy.

---

### Step 6 — Verify the backend is live

Open your Render URL in the browser:

```
https://portfolio-backend.onrender.com/api/projects
```

You should see a JSON response (empty array `[]` is fine if no data yet).

---

## PART 2 — Deploy Frontend to Vercel

### Step 7 — Create a Vercel account

Go to [https://vercel.com](https://vercel.com) and sign up with GitHub.

---

### Step 8 — Import your project on Vercel

1. Click **Add New → Project**
2. Import your GitHub repository
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

---

### Step 9 — Add the environment variable on Vercel

In the **Environment Variables** section before deploying:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://portfolio-backend.onrender.com/api` |

Then click **Deploy**.

---

### Step 10 — Update CORS on Render with your Vercel URL

Once Vercel finishes deploying, you'll get a URL like `https://myportfolio.vercel.app`.

Go back to Render → your Web Service → **Environment**:

- Update `FRONTEND_URL` → `https://myportfolio.vercel.app`
- Update `SANCTUM_STATEFUL_DOMAINS` → `myportfolio.vercel.app`

Then **Redeploy** the Render service.

---

## PART 3 — Seed Initial Data (Optional)

After the backend is live, open the Render **Shell** tab and run:

```bash
php artisan db:seed
```

Or manually use the admin dashboard on your live site to add projects and testimonials.

---

## PART 4 — Custom Domain (Optional)

**Vercel:** Settings → Domains → Add your domain  
**Render:** Settings → Custom Domain → Add your domain  

Then update `FRONTEND_URL` and `SANCTUM_STATEFUL_DOMAINS` on Render to match your custom domain.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 500 error on Render | Check Render logs. Usually a missing `APP_KEY` or wrong `DATABASE_URL` |
| CORS error in browser | Verify `FRONTEND_URL` on Render matches your exact Vercel URL |
| React Router 404 on refresh | `frontend/vercel.json` handles this — make sure it was pushed |
| Render spins down (free tier) | Free tier sleeps after 15 min of inactivity. First request is slow (~30s). Upgrade to Starter ($7/mo) to avoid. |
| `pgsql` driver error | Make sure `DB_CONNECTION=pgsql` and `DATABASE_URL` is set correctly |

---

## Free Tier Limits

| Service | Limit |
|---------|-------|
| Render Web Service | 750 hrs/month, sleeps after 15 min |
| Render PostgreSQL | 90 days free, then $7/mo |
| Vercel | Unlimited deployments, 100GB bandwidth/month |
