import mongoose, { Schema, model, models } from 'mongoose';

export interface ISiteSettings {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  aboutText: string;
  services: string[];
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  heroTitle: { type: String, required: true, default: 'Built to Last. Designed to Stand Out.' },
  heroSubtitle: { type: String, required: true, default: 'Premium signage solutions and expert fabrication.' },
  heroImageUrl: { type: String },
  aboutText: { type: String, required: true, default: 'We are a full-service creative studio.' },
  services: [{ type: String }],
  contactEmail: { type: String, required: true, default: 'info@example.com' },
  contactPhone: { type: String, required: true, default: '+1 234 567 8900' },
  socialLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true },
  }],
  updatedAt: { type: Date, default: Date.now },
});

export const SiteSettingsModel = models.SiteSettings || model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
