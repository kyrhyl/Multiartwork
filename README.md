# Multi-Artworks & Signages Portfolio CMS

A full-stack content management system built with Next.js 15, MongoDB, and TypeScript for managing a portfolio website with blog and gallery features.

## 🚀 Features

### Admin Panel
- **JWT Authentication** - Secure login with httpOnly cookies and Edge Runtime compatible JWT verification
- **Site Settings Management** - Configure company info, hero section, services, contact details, and social links
- **Blog CMS** - Rich text editor (TipTap) for creating and managing blog posts with featured images and tags
- **Gallery CMS** - Create albums and manage gallery images with Cloudinary integration
- **Database Status Indicator** - Real-time MongoDB connection status on login page

### Tech Stack
- **Framework**: Next.js 15.1.1 (App Router)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB Atlas with Mongoose
- **Authentication**: Custom JWT implementation (jose for Edge Runtime)
- **Image Uploads**: Cloudinary
- **Rich Text Editor**: TipTap (React 19 compatible)
- **Validation**: Zod schemas

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Cloudinary account

## 🛠️ Setup Instructions

### 1. Clone and Install

\`\`\`bash
cd portfolio-cms
npm install
\`\`\`

### 2. Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
\`\`\`

### 3. Seed Database

Run the seed script to create the initial admin user and sample content:

\`\`\`bash
node scripts/seed.js
\`\`\`

**Default Admin Credentials:**
- Email: \`admin@example.com\`
- Password: \`Admin123!\`

⚠️ **Change these credentials immediately after first login!**

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit:
- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

## 📁 Project Structure

\`\`\`
portfolio-cms/
├── app/                          # Next.js App Router
│   ├── (public)/                # Public-facing pages
│   ├── admin/                   # Admin panel pages
│   └── api/                     # API routes
├── src/
│   ├── features/               # Feature-based modules
│   │   ├── auth/              # Login, auth logic
│   │   ├── settings/          # Settings management
│   │   ├── blog/              # Blog post management
│   │   └── gallery/           # Gallery management
│   ├── shared/                # Shared components
│   └── lib/                   # Utilities and models
├── scripts/
│   └── seed.js                # Database seeding
└── middleware.ts              # Route protection
\`\`\`

## 🔐 Security Features

- **JWT Tokens**: Stored in httpOnly cookies
- **Edge Runtime Compatibility**: Uses \`jose\` library for JWT verification
- **Password Hashing**: bcrypt with 12 salt rounds
- **Input Validation**: Zod schemas on all API endpoints
- **Route Protection**: Middleware guards all admin routes

## 🎯 Usage Guide

### Managing Site Settings
1. Login to admin panel
2. Navigate to **Settings**
3. Update company info, hero section, services, contact details
4. Upload hero background image
5. Click **Save Settings**

### Creating Blog Posts
1. Navigate to **Posts** → **New Post**
2. Enter title (click "Generate Slug")
3. Use rich text editor for content
4. Add featured image and tags
5. Choose **Draft** or **Published**
6. Click **Create Post**

### Managing Gallery
1. Navigate to **Gallery** → **New Album**
2. Create album with title and cover image
3. Click **Manage Images**
4. Upload images via Cloudinary
5. Add titles and descriptions

## 🚀 Deployment

### Build
\`\`\`bash
npm run build
npm start
\`\`\`

**Recommended**: Vercel, Railway, or DigitalOcean

### Post-Deployment
1. Run seed script on production database
2. Login and change admin password immediately
3. Update site settings with production content

## 🐛 Troubleshooting

- **Login Issues**: Check MongoDB connection indicator, verify JWT_SECRET
- **Image Upload**: Verify Cloudinary credentials, check file size (max 5MB)
- **Build Errors**: Ensure Node.js 18+, run \`npm install\`

---

**Built with Next.js, MongoDB, and TypeScript**

