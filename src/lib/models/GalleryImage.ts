import mongoose, { Schema, model, models } from 'mongoose';

export interface IGalleryImage {
  _id: string;
  albumId: string;
  imageUrl: string;
  thumbUrl: string;
  caption: string;
  altText: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  albumId: { type: String, required: true, index: true },
  imageUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  caption: { type: String, default: '' },
  altText: { type: String, default: '' },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

GalleryImageSchema.pre('save', function() {
  this.updatedAt = new Date();
});

export const GalleryImageModel = models.GalleryImage || model<IGalleryImage>('GalleryImage', GalleryImageSchema);
