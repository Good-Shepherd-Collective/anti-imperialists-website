# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack web application for the Anti-Imperialists Study Circle (AISC), consisting of:
- **Sanity CMS** (`/cms`) - Content management system for managing articles, members, photos, and other content
- **SvelteKit Frontend** (`/web`) - Public-facing website that displays content from Sanity

## Architecture

### CMS (Sanity Studio)
- **Project ID**: `opgd2bhj`
- **Dataset**: `production`
- Custom plugins for Word document import and multi-image upload
- Schema types include: blog posts, member bios, points of unity, editorial statements, community logos, photos, volumes, and statement series

### Web Frontend (SvelteKit)
- Static site adapter with prerendering
- Tailwind CSS for styling
- PortableText for rendering Sanity content
- Firebase deployment configured

## Development Commands

### CMS Commands
```bash
cd cms
npm install          # Install dependencies
npm run dev          # Start Sanity Studio dev server
npm run build        # Build Sanity Studio
npm run deploy       # Deploy Sanity Studio
```

### Web Commands
```bash
cd web
npm install          # Install dependencies
npm run dev          # Start dev server with host binding
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run Prettier and ESLint checks
npm run format       # Auto-format with Prettier
npm run test         # Run Playwright tests
npm run ship         # Build and deploy to Firebase
```

## Key Files and Directories

### CMS Structure
- `/cms/schemaTypes/` - Content model definitions
- `/cms/plugins/` - Custom Sanity plugins (Word import, multi-image upload)
- `/cms/sanity.config.js` - Main Sanity configuration

### Web Structure
- `/web/src/routes/` - SvelteKit page routes (blog, members, photos, statements, etc.)
- `/web/src/lib/sanity.js` - Sanity client configuration
- `/web/src/lib/components/` - Reusable Svelte components
- `/web/svelte.config.js` - SvelteKit configuration with static adapter

## Important Configuration

### Sanity Connection
The web app connects to Sanity using:
- Project ID: `opgd2bhj`
- Dataset: `production`
- API Version: `2024-03-28`

This is configured in `/web/src/lib/sanity.js`

### Deployment
- Web frontend deploys to Firebase (configured in `/web/firebase.json`)
- Alternative Netlify deployment configuration available
- Static site generation with fallback to `index.html`

## Testing

The web application uses Playwright for testing. Run tests with `npm run test` in the `/web` directory.