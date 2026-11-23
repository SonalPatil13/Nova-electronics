# NOVA — Electronics Store

A responsive, frontend-only e-commerce demo built with React + Vite. Ready to deploy on Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this project folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel should detect **Vite** automatically.
4. Keep the defaults:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click **Deploy**.

No environment variables or backend are required. Product imagery is loaded from Unsplash, and the cart is a demo cart stored in browser state (not connected to payments or inventory).
