# GrowthPilot — Google Ads Management & Lead Generation Agency
**Navigate Growth With Intelligence.**  
**Live Website:** (growthpilot-google-ads.agancy.workers.dev)

GrowthPilot is a full-stack Google Ads specialist and performance marketing consultancy specializing in **Google Ads Management Services**, **PPC Campaign Engineering**, **Conversion-Focused Website & Landing Page Design**, and **GA4 / Google Ads Conversion Tracking** for HVAC, solar, dental, roofing, epoxy flooring, plumbing, and other service businesses.

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
| `/contact` | **Contact & Project Audit** — Validated project inquiry form with EmailJS + `/api/contact` integration and WhatsApp quick contact |
| `/thank-you` | **Thank-You & Conversion Receipt** — Protected post-submission confirmation page with unique `GP-*` inquiry reference and conversion tracking |
| `/privacy-policy` | **Privacy Policy** — Data collection, GA4/cookie usage, and inquiry handling disclosures |
| `/terms-and-conditions` | **Terms & Conditions** — Service engagement and website usage terms |

---
## SEO, Schema & Google Ads Readiness
- **Dynamic Route-Level SEO (`src/lib/seo.ts`)**:
  - Unique `<title>`, `<meta name="description">`, canonical URLs, OpenGraph tags, and Twitter Card metadata per route
  - Automatic `<meta name="robots" content="noindex, nofollow">` on `/thank-you` and unknown `404` routes so conversion pages cannot be triggered by organic crawlers
- **Structured Data (Schema.org JSON-LD)**:
  - `Organization` & `ProfessionalService` schema
  - `WebSite` schema
  - `Service` catalog schema for Google Ads, Web Design, CRO, Analytics, and Strategy
  - `FAQPage` schema on `/faq`
  - Dynamic `BreadcrumbList` schema across internal pages
- **Crawl & Sitemap Endpoints**:
  - `/robots.txt` and `/sitemap.xml` served both as static files in `public/` and dynamically via `server.ts`

---
## Tech Stack & Architecture
- **Frontend**: React 19, TypeScript, Vite 6, React Router v7 (`BrowserRouter`), Tailwind CSS v4, Lucide Icons
- **Backend / API**:
  - **Local & Full-Stack Node Server (`server.ts`)**: Express server with Brotli/Gzip compression, rate limiting, `/api/health`, `/api/contact`, and Vite middleware
  - **Vercel Serverless Functions (`api/health.ts`, `api/contact.ts`)**: Zero-config serverless endpoints for Vercel production deployments
- **Email & Lead Delivery**:
  - Connected to **EmailJS SDK (`@emailjs/browser`)** and **EmailJS REST API (`https://api.emailjs.com/api/v1.0/email/send`)**
  - Direct WhatsApp follow-up link generator (`https://wa.me/...`) with pre-filled inquiry summary

---
## Environment Variables (`.env`)
Copy `.env.example` to `.env` in the project root:

```env
# Application Origin & API Endpoints
PORT=3000
APP_URL="https://growthpilotagency-ten.vercel.app/"
VITE_APP_URL="https://growthpilotagency-ten.vercel.app/"
VITE_INQUIRY_API_ENDPOINT="/api/contact"
VITE_HEALTH_API_ENDPOINT="/api/health"

# EmailJS API Connection (Keep EMAILJS_PRIVATE_KEY server-side only)
VITE_EMAILJS_SERVICE_ID="YOUR_EMAILJS_SERVICE_ID"
VITE_EMAILJS_TEMPLATE_ID="YOUR_EMAILJS_TEMPLATE_ID"
VITE_EMAILJS_PUBLIC_KEY="YOUR_EMAILJS_PUBLIC_KEY"

EMAILJS_SERVICE_ID="YOUR_EMAILJS_SERVICE_ID"
EMAILJS_TEMPLATE_ID="YOUR_EMAILJS_TEMPLATE_ID"
EMAILJS_PUBLIC_KEY="YOUR_EMAILJS_PUBLIC_KEY"
EMAILJS_PRIVATE_KEY="YOUR_EMAILJS_PRIVATE_KEY"

# Verified Agency Contact & WhatsApp Routing
VITE_CONTACT_EMAIL="abhijitroy40311@gmail.com"
VITE_CONTACT_PHONE="8777202487"
VITE_WHATSAPP_NUMBER="8777202487"
VITE_CONTACT_LOCATION="Kolkata, India"

# Verified Social Profiles
VITE_SOCIAL_LINKEDIN="https://www.linkedin.com/in/abhijit-roy-7b27a242b/"
VITE_SOCIAL_INSTAGRAM="https://www.instagram.com/the.growthpilot.agency/"
VITE_SOCIAL_FACEBOOK="https://www.facebook.com/GrowthPilot.Global"

# Optional Analytics & Conversion Tracking IDs
VITE_GA4_MEASUREMENT_ID=""
VITE_GTM_CONTAINER_ID=""
VITE_GOOGLE_ADS_CONVERSION_ID=""
```

---

## Local Development, Testing & Deployment

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server (Port 3000)
```bash
npm run dev
```

### 3. Run Unit Tests & Type Check
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
- API requests under `/api/*` route directly to `/api/health.ts` and `/api/contact.ts`.
- All SPA routes (`/services`, `/about`, `/projects`, `/contact`, `/faq`, `/privacy-policy`, `/terms-and-conditions`, `/thank-you`) rewrite cleanly to `/index.html` so direct URL access and page refreshes never return a 404. (`/dental-implant-marketing` permanently redirects `301` to `/services`.)
