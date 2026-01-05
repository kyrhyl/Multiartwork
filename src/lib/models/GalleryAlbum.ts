import mongoose, { Schema, model, models } from 'mongoose';

export interface IGalleryAlbum {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryAlbumSchema = new Schema<IGalleryAlbum>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, default: '' },
  coverImageUrl: { type: String },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

GalleryAlbumSchema.pre('save', function() {
  this.updatedAt = new Date();
});

export const GalleryAlbumModel = models.GalleryAlbum || model<IGalleryAlbum>('GalleryAlbum', GalleryAlbumSchema);
