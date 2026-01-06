import mongoose, { Schema, model, models } from 'mongoose';

export interface ISiteSettings {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  aboutText: string;
  services: {
    title: string;
    description: string;
    icon?: string;
  }[];
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  navigationItems: {
    label: string;
    href: string;
  }[];
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  heroTitle: { type: String, required: true, default: 'Built to Last. Designed to Stand Out.' },
  heroSubtitle: { type: String, required: true, default: 'Premium signage solutions and expert fabrication.' },
  heroImageUrl: { type: String },
  aboutText: { type: String, required: true, default: 'We are a full-service creative studio.' },
  services: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
  }],
  contactEmail: { type: String, required: true, default: 'info@example.com' },
  contactPhone: { type: String, required: true, default: '+1 234 567 8900' },
  socialLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true },
  }],
  navigationItems: [{
    label: { type: String, required: true },
    href: { type: String, required: true },
  }],
  updatedAt: { type: Date, default: Date.now },
});

export const SiteSettingsModel = models.SiteSettings || model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
