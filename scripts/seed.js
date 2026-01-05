#!/usr/bin/env node

/**
 * Seed Script for Portfolio CMS
 * 
 * Creates:
 * - Admin user (email: admin@example.com, password: Admin123!)
 * - Default site settings
 * - Sample gallery albums and images
 * - Sample blog posts
 * 
 * Usage: node scripts/seed.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

// Define schemas directly (avoiding import issues in scripts)
const UserSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
});

const SiteSettingsSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroImageUrl: String,
  aboutText: String,
  services: [String],
  contactEmail: String,
  contactPhone: String,
  socialLinks: [{ platform: String, url: String }],
  updatedAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  contentHtml: String,
  tags: [String],
  coverImageUrl: String,
  status: String,
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const GalleryAlbumSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  coverImageUrl: String,
  sortOrder: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const GalleryImageSchema = new mongoose.Schema({
  albumId: String,
  imageUrl: String,
  thumbUrl: String,
  caption: String,
  altText: String,
  sortOrder: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
const GalleryAlbum = mongoose.models.GalleryAlbum || mongoose.model('GalleryAlbum', GalleryAlbumSchema);
const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema);

async function seed() {
  try {
    console.log('🌱 Starting seed process...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // 1. Create Admin User
    console.log('👤 Creating admin user...');
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
    } else {
      const hashedPassword = await bcrypt.hash('Admin123!', 12);
      await User.create({
        email: 'admin@example.com',
        passwordHash: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Admin user created');
      console.log('   Email: admin@example.com');
      console.log('   Password: Admin123!\n');
    }

    // 2. Create Site Settings
    console.log('⚙️  Creating site settings...');
    const existingSettings = await SiteSettings.findOne({});
    
    if (existingSettings) {
      console.log('⚠️  Site settings already exist\n');
    } else {
      await SiteSettings.create({
        heroTitle: 'Built to Last. Designed to Stand Out.',
        heroSubtitle: 'Premium signage solutions, large-format printing, and expert steel fabrication for businesses that demand visibility and durability.',
        heroImageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80',
        aboutText: 'We combine industrial precision with creative design to deliver comprehensive branding solutions. Our team specializes in signage, large-format printing, steel fabrication, and custom awards.',
        services: [
          'Signage Solutions',
          'Large Format Printing',
          'Steel Fabrication',
          'Awards & Recognition',
        ],
        contactEmail: 'info@multiartworks.com',
        contactPhone: '+1 234 567 8900',
        socialLinks: [],
      });
      console.log('✅ Site settings created\n');
    }

    // 3. Create Sample Gallery Albums
    console.log('🖼️  Creating gallery albums...');
    const albumCount = await GalleryAlbum.countDocuments();
    
    if (albumCount > 0) {
      console.log(`⚠️  ${albumCount} albums already exist\n`);
    } else {
      const albums = await GalleryAlbum.insertMany([
        {
          title: 'Signage Projects',
          slug: 'signage-projects',
          description: 'Modern lighted acrylic storefront signs and channel letters',
          coverImageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
          sortOrder: 1,
        },
        {
          title: 'Steel Fabrication',
          slug: 'steel-fabrication',
          description: 'Custom steel structures and architectural metalwork',
          coverImageUrl: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=800&q=80',
          sortOrder: 2,
        },
        {
          title: 'Large Format Printing',
          slug: 'large-format-printing',
          description: 'Banners, vehicle wraps, and building graphics',
          coverImageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80',
          sortOrder: 3,
        },
      ]);
      
      // Create sample images for first album
      await GalleryImage.insertMany([
        {
          albumId: albums[0]._id.toString(),
          imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
          thumbUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80',
          caption: 'Illuminated storefront signage',
          altText: 'Modern lighted acrylic storefront sign',
          sortOrder: 1,
        },
        {
          albumId: albums[0]._id.toString(),
          imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=80',
          thumbUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&q=80',
          caption: 'Custom neon signage installation',
          altText: 'Neon sign installation in modern office',
          sortOrder: 2,
        },
      ]);
      
      console.log('✅ Created 3 albums with sample images\n');
    }

    // 4. Create Sample Blog Posts
    console.log('📝 Creating blog posts...');
    const postCount = await Post.countDocuments();
    
    if (postCount > 0) {
      console.log(`⚠️  ${postCount} posts already exist\n`);
    } else {
      await Post.insertMany([
        {
          title: 'The Art of Modern Signage Design',
          slug: 'art-of-modern-signage-design',
          excerpt: 'Exploring the intersection of form and function in contemporary signage solutions.',
          contentHtml: '<p>Modern signage design combines aesthetics with functionality to create impactful brand experiences. In this post, we explore the latest trends and techniques in signage design.</p><p>From LED technology to sustainable materials, the industry is evolving rapidly to meet the demands of modern businesses.</p>',
          tags: ['Signage', 'Design', 'Branding'],
          coverImageUrl: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=1200&q=80',
          status: 'published',
          publishedAt: new Date('2026-01-01'),
        },
        {
          title: 'Steel Fabrication: Precision Meets Creativity',
          slug: 'steel-fabrication-precision-meets-creativity',
          excerpt: 'How advanced steel fabrication techniques are revolutionizing architectural design.',
          contentHtml: '<p>Steel fabrication is more than just cutting and welding metal. It\'s an art form that requires precision, creativity, and technical expertise.</p><p>Our team utilizes state-of-the-art equipment to deliver custom steel solutions for any project.</p>',
          tags: ['Steel', 'Fabrication', 'Architecture'],
          coverImageUrl: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=1200&q=80',
          status: 'published',
          publishedAt: new Date('2025-12-15'),
        },
        {
          title: 'Large Format Printing: Making a Big Impact',
          slug: 'large-format-printing-big-impact',
          excerpt: 'The power of large format printing in modern marketing and branding strategies.',
          contentHtml: '<p>Large format printing allows businesses to make bold statements and capture attention at scale. From building wraps to trade show displays, the possibilities are endless.</p>',
          tags: ['Printing', 'Marketing', 'Branding'],
          coverImageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=1200&q=80',
          status: 'draft',
        },
      ]);
      
      console.log('✅ Created 3 blog posts (2 published, 1 draft)\n');
    }

    console.log('✅ Seed completed successfully!\n');
    console.log('🔐 Admin Login Credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: Admin123!');
    console.log('\n📌 Next steps:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Visit: http://localhost:3000');
    console.log('   3. Admin: http://localhost:3000/admin/login\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
