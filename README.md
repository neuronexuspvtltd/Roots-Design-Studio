# Roots Design Studio

A production-ready luxury interior design and architecture website engineered with Next.js 15, TypeScript, Tailwind CSS, and Firebase.

Designed with an editorial, minimal aesthetic inspired by high-end architectural studios, emphasizing natural materials, tactile materiality, generous whitespace, and restrained typography.

---

## 1. Brand Identity & Design System

### A. Wordmark
Original text-based vector brand identity:
```
ROOTS
DESIGN STUDIO
```
Incorporates a delicate architectural axis with organic root lines and grounding geometry.

### B. Luxury Minimal Colour Palette
* **Primary Background:** `#F7F4EE` (Warm Ivory)
* **Secondary Background:** `#E9E0D3` (Limestone Beige)
* **Primary Text:** `#292A25` (Charcoal Stone)
* **Secondary Text:** `#77756E` (Warm Slate)
* **Accent Olive:** `#68745A` (Organic Olive)
* **White:** `#FFFFFF`
* **Borders:** `#DDD7CC` (Linen Stone)

### C. Editorial Typography
* **Headings & Serif Accents:** Cormorant Garamond (`--font-cormorant`)
* **Body, UI & Navigation:** Manrope (`--font-manrope`)

---

## 2. Website Architecture

### Public Routes
* `/` — Editorial Landing Page (Hero with architectural photo, Studio Introduction, Selected Works, Capabilities, Design Philosophy, How We Work, Visual Diary, Consultation CTA, Footer).
* `/projects` — Portfolio gallery with real-time category filtering (Residential, Living Room, Modular Kitchen, Bedroom, Commercial, Renovation) and keyword search.
* `/projects/[slug]` — Dedicated project case studies with spatial narrative, design concept, materials & finishes specification, interactive multi-image gallery, and full-screen lightbox.
* `/services` — Detailed breakdown of interior architecture disciplines, deliverables, 4-step methodology, and scope inquiry triggers.
* `/about` — Studio philosophy, material library, and craftsmanship principles.
* `/contact` — Comprehensive validated client inquiry form and instant WhatsApp consultation trigger.
* `/sitemap.xml` & `/robots.txt` — Search engine optimization routes.

### Protected Administration Routes
* `/admin/login` — Secure director login with password reset and demo credentials autofill.
* `/admin` — Studio overview with real-time statistics (published projects, draft projects, new inquiries, total submissions) and recent activity logs.
* `/admin/projects` — Project manager with publication status toggles, homepage featured highlights, search, and confirmation-protected deletion.
* `/admin/projects/new` — Project creation with image uploads, auto-slug generation, category assignments, and material specifications.
* `/admin/projects/[id]/edit` — Full project editor.
* `/admin/enquiries` — Client inquiry management with status workflow (`New`, `Contacted`, `Consultation Scheduled`, `Converted`, `Closed`), internal notes, and detail inspection drawers.
* `/admin/settings` — Live website content manager (hero texts & photo, studio copy, contact coordinates, WhatsApp number, Instagram gallery). Updates appear instantly without re-deploying.

---

## 3. Technology Stack

* **Framework:** Next.js 15 (App Router, Server & Client Components)
* **Language:** TypeScript 5
* **Styling:** Tailwind CSS 3 with custom luxury typography and color extensions
* **Icons:** Lucide React + Custom SVG Brand Wordmark
* **Database & Auth:** Cloud Firestore & Firebase Authentication (with automatic graceful fallback to local persistence and curated demonstration data during initial setup)
* **Storage:** Firebase Storage (with client preview and validation)
* **Security Rules:** `firestore.rules` & `storage.rules`

---

## 4. Getting Started

### Prerequisites
* Node.js v18.17+ or v20+
* npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd "Roots Studio"

# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Admin Dashboard Access

1. Navigate to `/admin/login` or click the discreet **Admin Portal** link in the footer.
2. For initial testing, click **"Fill Demonstration Credentials (Admin Mode)"** or enter:
   * **Email:** `admin@rootsdesignstudio.com`
   * **Password:** `RootsAdmin2024!`
3. Once logged in, you can add projects, upload photographs, review incoming inquiries, and update site settings.

---

## 6. Firebase Configuration (When Going Live)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Authentication** (Email/Password provider).
3. Create a **Cloud Firestore** database.
4. Enable **Firebase Storage**.
5. Copy `.env.example` to `.env.local` and add your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
6. Deploy the included security rules:
   ```bash
   firebase deploy --only firestore:rules,storage
   ```

---

## 7. Deployment Instructions

### Option 1: Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set any optional environment variables from `.env.example`.
4. Deploy with one click.

### Option 2: Hostinger / VPS Node.js
* Requires a VPS or Cloud plan supporting Node.js v18+.
* Run `npm run build && npm start`.

---

## 8. Demonstration Content Disclosure
As mandated by ethical brand standards, all initial photography is clearly marked as demonstration concepts and never represented as completed client commissions by Roots Design Studio. All sample projects can be edited, replaced, or deleted through the Admin Dashboard.
