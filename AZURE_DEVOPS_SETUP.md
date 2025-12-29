# Azure DevOps Setup Guide

> Complete guide for deploying Digita Energy Admin with Azure DevOps

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   AZURE DEVOPS                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  GitHub Repo ──→ Azure Pipelines ──→ Deployments       │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────┐  │
│  │   Frontend   │    │   Backend    │    │ Database │  │
│  │    (React)   │    │  (Express)   │    │(Supabase)│  │
│  └──────┬───────┘    └──────┬───────┘    └────┬─────┘  │
│         │                   │                  │        │
│         ▼                   ▼                  │        │
│  ┌──────────────┐    ┌──────────────┐         │        │
│  │Azure Static  │    │ Azure App    │         │        │
│  │  Web Apps    │◄──►│   Service    │◄────────┘        │
│  └──────────────┘    └──────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

## 📋 Prerequisites

- [ ] Azure account (free tier available)
- [ ] Azure DevOps organization
- [ ] GitHub repo (already connected)
- [ ] Supabase account (already have)

---

## 🚀 Step-by-Step Setup

### **Step 1: Create Azure DevOps Organization**

1. Go to: https://dev.azure.com
2. Sign in with Microsoft account
3. Click **"Create organization"** or use existing
4. Name: `digita-energy` (or your preference)

### **Step 2: Create Azure DevOps Project**

1. In your organization, click **"New project"**
2. Project name: `digita-energy-admin`
3. Visibility: **Private**
4. Version control: **Git** (we'll link to GitHub)
5. Click **Create**

### **Step 3: Connect GitHub Repository**

1. In Azure DevOps project → **Pipelines** → **New Pipeline**
2. Select **GitHub** (not Azure Repos)
3. Authorize Azure Pipelines to access GitHub
4. Select repository: `remaestro/digita-energy-admin`
5. Choose **"Existing Azure Pipelines YAML file"**
6. Path: `/azure-pipelines.yml`
7. Click **Continue**

### **Step 4: Create Azure Resources**

#### **A. Create Resource Group**
```bash
# Using Azure CLI (or use Azure Portal)
az group create \
  --name digita-energy-rg \
  --location eastus
```

#### **B. Create Azure Static Web App (Frontend)**

**Staging:**
```bash
az staticwebapp create \
  --name digita-energy-web-staging \
  --resource-group digita-energy-rg \
  --location eastus2 \
  --sku Free
```

**Production:**
```bash
az staticwebapp create \
  --name digita-energy-web-production \
  --resource-group digita-energy-rg \
  --location eastus2 \
  --sku Standard
```

Get deployment tokens:
```bash
# Staging
az staticwebapp secrets list \
  --name digita-energy-web-staging \
  --query "properties.apiKey" -o tsv

# Production
az staticwebapp secrets list \
  --name digita-energy-web-production \
  --query "properties.apiKey" -o tsv
```

#### **C. Create Azure App Service (Backend)**

**Create App Service Plan:**
```bash
az appservice plan create \
  --name digita-energy-plan \
  --resource-group digita-energy-rg \
  --sku B1 \
  --is-linux
```

**Staging:**
```bash
az webapp create \
  --name digita-energy-api-staging \
  --resource-group digita-energy-rg \
  --plan digita-energy-plan \
  --runtime "NODE:20-lts"
```

**Production:**
```bash
az webapp create \
  --name digita-energy-api-production \
  --resource-group digita-energy-rg \
  --plan digita-energy-plan \
  --runtime "NODE:20-lts"
```

### **Step 5: Create Service Connection**

1. Azure DevOps → **Project Settings** → **Service connections**
2. Click **"New service connection"**
3. Select **"Azure Resource Manager"**
4. Authentication method: **Service principal (automatic)**
5. Subscription: Select your Azure subscription
6. Resource group: `digita-energy-rg`
7. Service connection name: `Azure-Service-Connection`
8. Check **"Grant access permission to all pipelines"**
9. Click **Save**

### **Step 6: Create Variable Group (Secrets)**

1. Azure DevOps → **Pipelines** → **Library**
2. Click **"+ Variable group"**
3. Name: `digita-energy-secrets`
4. Add variables:

| Variable Name | Value | Secret? |
|--------------|-------|---------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING` | Token from Step 4B | ✅ |
| `AZURE_STATIC_WEB_APPS_API_TOKEN_PRODUCTION` | Token from Step 4B | ✅ |
| `SUPABASE_DATABASE_URL` | From Supabase dashboard | ✅ |
| `SUPABASE_URL` | From Supabase dashboard | ✅ |
| `SUPABASE_ANON_KEY` | From Supabase dashboard | ✅ |
| `SUPABASE_SERVICE_KEY` | From Supabase dashboard | ✅ |
| `JWT_SECRET` | Generate random 32+ chars | ✅ |

5. Click **Save**

### **Step 7: Create Environments**

1. Azure DevOps → **Pipelines** → **Environments**
2. Create two environments:
   - Name: `staging` → Click **Create**
   - Name: `production` → Click **Create**
3. For **production** environment:
   - Click on it → ⋯ (menu) → **Approvals and checks**
   - Add **Approvals** → Select approvers
   - This ensures production deploys require approval

### **Step 8: Run the Pipeline**

1. Azure DevOps → **Pipelines**
2. Select your pipeline
3. Click **Run pipeline**
4. Select branch: `main`
5. Click **Run**

---

## 🎯 What Happens When Pipeline Runs

### **On Push to `develop` branch:**
1. ✅ Lint & Type Check
2. ✅ Build applications
3. ✅ Run unit tests
4. ✅ Run E2E tests
5. ✅ Deploy to **Staging**

### **On Push to `main` branch:**
1. ✅ Lint & Type Check
2. ✅ Build applications
3. ✅ Run unit tests
4. ✅ Run E2E tests
5. ⚠️ Wait for approval (if configured)
6. ✅ Deploy to **Production**
7. ✅ Run smoke tests

---

## 📊 Pipeline Stages

```
┌────────────────┐
│ Build & Test   │
│ - Lint         │
│ - Type Check   │
│ - Build        │
│ - Unit Tests   │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│   E2E Tests    │
│ - Playwright   │
│ - 59 tests     │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ Deploy Staging │ (develop branch)
│ - Frontend     │
│ - Backend      │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│Deploy Production│ (main branch)
│ - Frontend     │
│ - Backend      │
│ - Approval?    │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│  Smoke Tests   │
│ - Health checks│
└────────────────┘
```

---

## 🔐 Environment Variables

### **Frontend (Static Web App)**
Set in Azure Portal → Static Web App → Configuration:

```
VITE_API_URL=https://digita-energy-api-production.azurewebsites.net/api
VITE_SUPABASE_URL=<from Supabase>
VITE_SUPABASE_ANON_KEY=<from Supabase>
```

### **Backend (App Service)**
Automatically set by pipeline in Step 4C, or manually in:
Azure Portal → App Service → Configuration:

```
DATABASE_URL=<from Supabase>
SUPABASE_URL=<from Supabase>
SUPABASE_ANON_KEY=<from Supabase>
SUPABASE_SERVICE_KEY=<from Supabase>
JWT_SECRET=<random 32+ characters>
NODE_ENV=production
PORT=8080
```

---

## 🌐 URLs After Deployment

### **Staging:**
- Frontend: `https://digita-energy-web-staging.azurestaticapps.net`
- Backend: `https://digita-energy-api-staging.azurewebsites.net`

### **Production:**
- Frontend: `https://digita-energy-web-production.azurestaticapps.net`
- Backend: `https://digita-energy-api-production.azurewebsites.net`

---

## 🛠️ Useful Azure CLI Commands

```bash
# View pipeline runs
az pipelines runs list --organization https://dev.azure.com/YOUR_ORG --project digita-energy-admin

# View specific run
az pipelines runs show --id RUN_ID --organization https://dev.azure.com/YOUR_ORG --project digita-energy-admin

# View logs
az webapp log tail --name digita-energy-api-production --resource-group digita-energy-rg

# Restart app
az webapp restart --name digita-energy-api-production --resource-group digita-energy-rg
```

---

## 💰 Cost Estimate

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Static Web Apps (Staging) | Free | $0 |
| Static Web Apps (Production) | Standard | ~$9 |
| App Service Plan | B1 | ~$13 |
| Supabase | Free | $0 |
| **Total** | | **~$22/month** |

---

## 🎓 Next Steps

1. ✅ Create Azure DevOps organization
2. ✅ Create project
3. ✅ Connect GitHub repository
4. ✅ Create Azure resources
5. ✅ Configure service connection
6. ✅ Add secrets to variable group
7. ✅ Run pipeline
8. 🎉 Watch it deploy!

---

## 📞 Support

- **Azure DevOps Docs**: https://docs.microsoft.com/azure/devops/
- **Azure Static Web Apps**: https://docs.microsoft.com/azure/static-web-apps/
- **Azure App Service**: https://docs.microsoft.com/azure/app-service/

---

**Created**: 2025-12-29  
**Agent**: Agent 2 (DevOps Engineer)  
**Status**: Ready for Azure DevOps Setup
