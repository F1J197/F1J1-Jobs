# FijiJobs - Mobile-First Job Platform for Fiji

A modern, mobile-first job board platform built specifically for the Fiji employment market. Fast, lightweight, and optimized for smartphone users with limited data plans.

## 🎯 Project Vision

FijiJobs aims to become Fiji's dominant job platform by addressing critical gaps in the current market:
- **Mobile-First Design**: 98% smartphone penetration, only 15% laptop ownership
- **Low-Bandwidth Optimization**: Under 1MB initial load, respecting data costs
- **WhatsApp Integration**: Native notifications via WhatsApp (73.5% adult usage in Fiji)
- **Freemium Model**: Free job posting to build market share, premium features for revenue
- **One-Click Apply**: Frictionless application process

## 📊 Market Opportunity

- **Target Market**: ~920,000 employed people in Fiji
- **Current Leader**: MyJobsFiji.com (70,000+ seekers, 2,000+ employers)
- **Key Gap**: No modern, mobile-optimized, WhatsApp-integrated platform
- **Revenue Target**: FJD 200,000-300,000/year by Year 3

## 🏗️ Technical Stack

### Frontend & Backend
- **Framework**: Next.js 16.1 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with class-variance-authority

### Database & ORM
- **Database**: PostgreSQL
- **ORM**: Prisma Client
- **Schema**: Users, Companies, Jobs, Applications, Notifications

### Authentication (Planned)
- **Provider**: NextAuth.js v5
- **Methods**:
  - Facebook Login (primary - 60% Fiji population penetration)
  - Google Login
  - Email/Password

### Integrations (Planned)
- **WhatsApp**: Meta Business API for notifications
- **Email**: SendGrid or AWS SES
- **File Storage**: Cloudinary for CV uploads
- **Payments**: Stripe (supports FJD)

### Deployment
- **Platform**: Vercel (recommended) or AWS
- **CDN**: Built-in with Vercel Edge Network
- **Region**: Australia/Sydney for lowest latency to Fiji

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (when ready for backend)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
F1J1-Jobs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with SEO metadata
│   └── page.tsx           # Landing page
├── components/
│   └── ui/                # Reusable UI components (Button, Input, Card)
├── lib/
│   └── utils.ts           # Utility functions (cn, formatting)
├── prisma/
│   └── schema.prisma      # Database schema (ready for migration)
└── public/                # Static assets
    └── manifest.json      # PWA manifest
```

## 🎨 Features

### MVP (Phase 1) - In Progress
- [x] Mobile-first landing page
- [x] Database schema design
- [x] Project structure and utilities
- [x] SEO optimization (metadata, Open Graph)
- [x] PWA manifest configuration
- [ ] Authentication system
- [ ] Job seeker registration
- [ ] Job listing and search
- [ ] One-click apply
- [ ] Employer dashboard
- [ ] CV upload

### Phase 2 (Months 7-18)
- [ ] AI job recommendations
- [ ] Resume builder
- [ ] WhatsApp notifications
- [ ] Sponsored job listings
- [ ] Company reviews
- [ ] Analytics dashboard

## 🎯 Key Differentiators

1. **Mobile-First**: 44px tap targets, single-column layouts, thumb-zone optimized
2. **Low-Bandwidth**: < 1MB initial load, WebP images, aggressive caching
3. **WhatsApp Native**: Job alerts and updates via WhatsApp (95% open rate vs 21% email)
4. **Freemium**: Free basic posting to achieve market dominance
5. **Local Focus**: Optimized for Fiji market (FJD currency, Fiji locations, local employers)

## 📈 Revenue Model

### Freemium Pricing (FJD)
- **Basic Job Posting (30 days)**: FREE
- **Featured Listing Upgrade**: $49 (~$22 USD)
- **Urgent Hiring Badge**: $29 (~$13 USD)
- **Extended Duration (60 days)**: $39 (~$17 USD)
- **Resume Database Access**: $99/month (~$44 USD)
- **Premium Subscription**: $149/month (~$67 USD)

### Revenue Targets
- Year 1: FJD $30,000
- Year 2: FJD $100,000
- Year 3: FJD $200,000+

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Schema

The Prisma schema is defined in `prisma/schema.prisma` with:
- User management (job seekers + employers)
- Company profiles
- Job postings with status tracking
- Application system
- Saved jobs (bookmarks)
- Notification system

To use the database:
1. Set up PostgreSQL
2. Configure `DATABASE_URL` in `.env`
3. Run `npx prisma migrate dev`
4. Run `npx prisma generate`

## 📱 PWA Configuration

The app is configured as a Progressive Web App (PWA) for:
- **Add to Home Screen**: Install like a native app
- **Offline Support**: Service worker caching (to be implemented)
- **Push Notifications**: Job alerts even when browser is closed
- **Fast Loading**: Optimized for mobile networks

## 🌐 SEO Optimization

- Proper metadata configuration (title, description, keywords)
- Open Graph tags for social sharing
- Mobile-friendly viewport settings
- Structured data for Google Jobs (to be implemented)
- Semantic HTML structure

## 🔒 Security Considerations

- NextAuth.js for secure authentication (ready to configure)
- Bcrypt password hashing
- CSRF protection (built-in with Next.js)
- Environment variable validation
- SQL injection protection via Prisma

## 📄 License

Proprietary - All rights reserved

---

**Built for the Fiji employment market**
