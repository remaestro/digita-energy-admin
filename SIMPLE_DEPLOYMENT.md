# Simple Azure Deployment - No CI/CD

> Direct GitHub to Azure deployment (like your previous apps)

## ✅ What You Have

**Production Only:**
- Frontend: https://kind-sky-0cd10f60f.1.azurestaticapps.net
- Backend: https://digita-energy-api-production.azurewebsites.net

**Staging**: ❌ Deleted (as requested)

---

## 🚀 Setup (5 Minutes Total)

### **Backend Deployment** (App Service)

1. Go to: https://portal.azure.com
2. Find: **digita-energy-api-production**
3. Left sidebar → **Deployment Center**
4. Source: **GitHub**
5. Authorize GitHub (if needed)
6. Organization: **remaestro**
7. Repository: **digita-energy-admin**
8. Branch: **main**
9. Build Provider: **App Service Build Service** (Oryx)
10. Click **Save**

✅ Backend will auto-deploy on every push to `main`!

---

### **Frontend Deployment** (Static Web App)

**Option A: Using Azure Portal**
1. Go to Static Web App: **digita-energy-web-production**
2. Settings → Configuration → **Deployment token**
3. Copy the token (already have it in `azure-tokens.txt`)
4. GitHub repo → Settings → Secrets → New secret
5. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
6. Value: `e6cf710cd0d6b45d67d775ac66a1041cba5d580ce3971d06a88a2818feb2ff6c01-c41a35e6-8e88-42ea-b7be-0cffba3f7b8300f22240cd10f60f`
7. Save

**Option B: Use Existing GitHub Actions** 
Static Web Apps auto-creates a GitHub Action workflow when you connect via portal.

---

## 📝 Simple Workflow

```bash
# Make changes
git add .
git commit -m "update"
git push origin main

# Azure automatically:
# 1. Detects push
# 2. Builds your code
# 3. Deploys to production
# 4. Done! ✅
```

**No staging, no tests in pipeline** - Just like your previous apps!

---

## 🧪 Running Tests Locally (On Demand)

```bash
# When YOU want to test:
pnpm test              # Unit tests
pnpm test:e2e          # E2E tests
pnpm lint              # Linting
pnpm typecheck         # Type checking

# Only push when YOU'RE satisfied!
```

---

## 🌐 Access Your App

- **Frontend**: https://kind-sky-0cd10f60f.1.azurestaticapps.net
- **Backend API**: https://digita-energy-api-production.azurewebsites.net

---

## ⚙️  Environment Variables

### Backend (App Service)
Portal → App Service → Configuration → Application settings

Add:
```
DATABASE_URL=<from Supabase>
SUPABASE_URL=<from Supabase>
SUPABASE_ANON_KEY=<from Supabase>
SUPABASE_SERVICE_KEY=<from Supabase>
JWT_SECRET=<generate random 32+ chars>
NODE_ENV=production
```

### Frontend (Static Web App)
Portal → Static Web App → Configuration → Application settings

Add:
```
VITE_API_URL=https://digita-energy-api-production.azurewebsites.net/api
VITE_SUPABASE_URL=<from Supabase>
VITE_SUPABASE_ANON_KEY=<from Supabase>
```

---

## 📊 Deployment Logs

**Backend:**
- Portal → App Service → Deployment Center → Logs

**Frontend:**
- Portal → Static Web App → GitHub Actions (links to GitHub Actions tab)

---

**Time to Deploy**: ~5 minutes
**Simplicity**: Maximum ✅
**CI/CD**: None (as requested)
**Tests**: Run locally when you want
