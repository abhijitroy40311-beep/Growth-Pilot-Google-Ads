# GrowthPilot — Google Ads Management & Lead Generation Agency

**Navigate Growth With Intelligence.**  
**Live Website:** `https://growthpilot-google-ads.agancy.workers.dev/` <!-- Replace with your canonical production URL (e.g., custom domain or Vercel URL) -->

GrowthPilot is a full-stack Google Ads specialist and performance marketing consultancy specializing in **Google Ads Management Services**, **PPC Campaign Engineering**, **Conversion-Focused Website & Landing Page Design**, and **GA4 / Google Ads Conversion Tracking** for HVAC, solar, dental, roofing, epoxy flooring, plumbing, and other local service businesses.

---

## Core Services & Value Proposition

1. **Google Ads Management & PPC Advertising**
   - High-intent commercial search campaign architecture (Exact & Phrase match focus)
   - Proactive negative keyword filtering to eliminate wasted ad spend
   - Ad copy and extension engineering for higher click-through rates (CTR) and Quality Scores
   - Bidding strategy optimization focused on qualified leads and booked consultations

2. **Multi-Industry Local Service Search & Conversion Funnels**
   - Tailored Google Search campaigns for HVAC, solar, dental, roofing, epoxy flooring, plumbing, and allied local service trades
   - Procedure- and service-specific landing pages with click-to-call, WhatsApp, and structured inquiry capture
   - Verified call and form conversion tracking across US, UK, Australia, Canada, Ireland, New Zealand, and India

3. **Conversion-Focused Website & Landing Page Development**
   - Mobile-first, high-speed React + TypeScript pages engineered to pass Google Ads landing page experience standards
   - Above-the-fold value propositions, clear trust signals, and frictionless inquiry flows

4. **Conversion Rate Optimization (CRO) & Lead Funnel Engineering**
   - Headline, CTA, and form friction optimization to increase visitor-to-inquiry conversion rates

5. **Google Analytics 4 (GA4), GTM & Lead Attribution Setup**
   - End-to-end event tracking (`generate_lead`, `contact_click`, `whatsapp_click`, `phone_click`, `email_click`)
   - Deduplicated conversion firing on the `/thank-you` confirmation route

---

## Website Routes & Page Architecture

| Route | Page Purpose & Primary SEO / Google Ads Focus |
| :--- | :--- |
| `/` | **Homepage** — Google Ads management services & lead generation agency overview, 7-stage interactive growth journey, services, and process |
| `/services` | **Services** — Detailed breakdown of Google Ads management, PPC advertising, conversion-focused web design, CRO, and GA4 tracking |
| `/projects` | **Projects & Blueprints** — Filterable showcase of reference architectures and lead generation blueprints |
| `/about` | **About GrowthPilot** — Agency methodology, performance principles, and accountable growth standards |
| `/faq` | **FAQ** — Searchable answers covering Google Ads budgets, management timelines, landing pages, and tracking |
| `/contact` | **Contact & Project Audit** — Validated project inquiry form with `/api/contact` + EmailJS integration and WhatsApp quick contact |
| `/thank-you` | **Thank-You & Conversion Receipt** — Protected post-submission confirmation page with unique `GP-*` inquiry reference and conversion tracking |
| `/privacy-policy` | **Privacy Policy** — Data collection, GA4/cookie usage, and inquiry handling disclosures |
| `/terms-and-conditions` | **Terms & Conditions** — Service engagement and website usage terms |

**Legacy Redirects:**
- `/dental-implant-marketing` → `301` permanent redirect to `/services` (configured in `vercel.json`).

---

## SEO, Schema & Google Ads Readiness

- **Dynamic Route-Level SEO (`src/lib/seo.ts`):**
  - Unique `<title>`, `<meta name="description">`, canonical URLs, OpenGraph tags, and Twitter Card metadata per route.
  - Automatic `<meta name="robots" content="noindex, nofollow">` on `/thank-you` and `404` routes so conversion pages cannot be indexed or triggered by organic crawlers.
- **Structured Data (Schema.org JSON-LD):**
  - `Organization` & `ProfessionalService` schema
  - `WebSite` schema
  - `Service` catalog schema for Google Ads, Web Design, CRO, Analytics, and Strategy
  - `FAQPage` schema on `/faq`
  - Dynamic `BreadcrumbList` schema across internal pages
- **Crawl & Sitemap Endpoints:**
  - Served statically from `public/robots.txt` and `public/sitemap.xml` on Vercel production deployments, with dynamic fallback routes available in `server.ts` for standalone Node hosting.

---

## Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Vite 6, React Router v7 (`BrowserRouter`), Tailwind CSS v4, Lucide Icons
- **Backend / API (Dual-Runtime Support):**
  - **Vercel Production (`api/health.ts`, `api/contact.ts`):** Zero-config serverless endpoints used in Vercel deployments.
  - **Local / Standalone Node (`server.ts`):** Express server with Brotli/Gzip compression, rate limiting, `/api/health`, `/api/contact`, and Vite middleware.
- **Email & Lead Delivery:**
  - Server-side lead dispatch via `/api/contact` using the **EmailJS REST API** (`https://api.emailjs.com/api/v1.0/email/send`) with private-key auth, plus optional client-side **EmailJS SDK (`@emailjs/browser`)** support.
  - Direct WhatsApp follow-up link generator (`https://wa.me/<countrycode><number>`) with pre-filled inquiry summary.

### Project Structure

```text
├── api/                  # Vercel serverless functions (health.ts, contact.ts)
├── public/               # Static assets, robots.txt, sitemap.xml
├── src/
│   └── lib/              # Route SEO helpers (seo.ts) and unit tests (logic.test.ts)
├── server.ts             # Standalone Express + Vite development/production server
├── vercel.json           # Vercel caching headers, redirects, and SPA rewrites
└── .env.example          # Environment variable template
```

---

## Environment Variables (`.env`)

Copy `.env.example` to `.env` in the project root and populate with your credentials. **Never commit `.env` or expose `EMAILJS_PRIVATE_KEY` with a `VITE_` prefix.**

```env
# Application Origin & API Endpoints
PORT=3000
APP_URL="https://YOUR_PRODUCTION_DOMAIN"
VITE_APP_URL="https://YOUR_PRODUCTION_DOMAIN"
VITE_INQUIRY_API_ENDPOINT="/api/contact"
VITE_HEALTH_API_ENDPOINT="/api/health"

# EmailJS — Client SDK (Public keys exposed to browser)
VITE_EMAILJS_SERVICE_ID="YOUR_EMAILJS_SERVICE_ID"
VITE_EMAILJS_TEMPLATE_ID="YOUR_EMAILJS_TEMPLATE_ID"
VITE_EMAILJS_PUBLIC_KEY="YOUR_EMAILJS_PUBLIC_KEY"

# EmailJS — Server API (/api/contact — keep EMAILJS_PRIVATE_KEY server-side only)
EMAILJS_SERVICE_ID="YOUR_EMAILJS_SERVICE_ID"
EMAILJS_TEMPLATE_ID="YOUR_EMAILJS_TEMPLATE_ID"
EMAILJS_PUBLIC_KEY="YOUR_EMAILJS_PUBLIC_KEY"
EMAILJS_PRIVATE_KEY="YOUR_EMAILJS_PRIVATE_KEY"

# Agency Contact & WhatsApp Routing
# Use full international format without '+' for WhatsApp (e.g., 91XXXXXXXXXX) so wa.me works globally
VITE_CONTACT_EMAIL="contact@YOUR_PRODUCTION_DOMAIN"
VITE_CONTACT_PHONE="+91-XXXXXXXXXX"
VITE_WHATSAPP_NUMBER="91XXXXXXXXXX"
VITE_CONTACT_LOCATION="Kolkata, India"

# Social Profiles
VITE_SOCIAL_LINKEDIN="[https://www.linkedin.com/in/your-profile/](https://www.linkedin.com/in/your-profile/)"
VITE_SOCIAL_INSTAGRAM="[https://www.instagram.com/the.growthpilot.agency/](https://www.instagram.com/the.growthpilot.agency/)"
VITE_SOCIAL_FACEBOOK="[https://www.facebook.com/GrowthPilot.Global](https://www.facebook.com/GrowthPilot.Global)"

# Optional Analytics & Conversion Tracking IDs
VITE_GA4_MEASUREMENT_ID=""
VITE_GTM_CONTAINER_ID=""
VITE_GOOGLE_ADS_CONVERSION_ID=""
```

---

## Local Development, Testing & Deployment

### Prerequisites
- **Node.js:** v20+ recommended
- **npm:** v10+

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server (Port 3000)
```bash
npm run dev
```

### 3. Run Unit Tests & Type Check / Lint
```bash
npx tsx --test src/lib/logic.test.ts
npm run lint
```

### 4. Production Build
```bash
npm run build
```

### 5. Vercel Deployment (`vercel.json`)
- Static assets under `/assets/*` are served with `Cache-Control: public, max-age=31536000, immutable`.
- API requests under `/api/*` route directly to `api/health.ts` and `api/contact.ts`.
- All SPA routes (`/services`, `/about`, `/projects`, `/contact`, `/faq`, `/privacy-policy`, `/terms-and-conditions`, `/thank-you`) rewrite cleanly to `/index.html` so direct URL access and refreshes never return `404`.
- `/dental-implant-marketing` permanently redirects (`301`) to `/services`.

---

## License

Proprietary — All rights reserved by **GrowthPilot**. Unauthorized copying, redistribution, or commercial reuse of this codebase or brand assets is prohibited.
