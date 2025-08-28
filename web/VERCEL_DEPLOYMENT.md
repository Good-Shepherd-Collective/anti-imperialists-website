# Vercel Deployment Instructions

## Prerequisites
1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI (optional): `npm i -g vercel`

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to https://vercel.com/new
3. Import your Git repository
4. Configure the deployment:
   - **Framework Preset**: Other
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. Add Environment Variables (if needed):
   - None required for this static site
   - The Sanity project ID and dataset are already hardcoded in the client

6. Click "Deploy"

### Option 2: Deploy via CLI

From the project root:

```bash
cd web
npx vercel
```

Follow the prompts:
- Set up and deploy: Yes
- Which scope: Your account
- Link to existing project: No (first time) / Yes (subsequent deploys)
- Project name: anti-imperialists-com (or your preference)
- Root directory: `./`
- Override build command: No (uses vercel.json settings)

## Configuration Files

- **vercel.json**: Contains all Vercel-specific configuration
  - Build and output settings
  - Rewrite rules for SPA routing
  - Security headers
  - Cache control for static assets

- **svelte.config.js**: Already configured with `adapter-static` for static site generation

## Post-Deployment

1. Your site will be available at:
   - Production: `https://[your-project-name].vercel.app`
   - Preview deployments for each push to non-main branches

2. Custom Domain (optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Notes

- The site is built as a static SPA with client-side routing
- All routes fallback to `index.html` for proper SvelteKit routing
- Static assets in `/_app/` are cached for 1 year
- Sanity CMS remains separate and doesn't need deployment