import mongoose, { Schema, model, models } from 'mongoose';

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  tags: string[];
  coverImageUrl?: string;
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt: { type: String, default: '' },
  contentHtml: { type: String, required: true, default: '' },
  tags: [{ type: String }],
  coverImageUrl: { type: String },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

PostSchema.pre('save', function() {
  this.updatedAt = new Date();
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

export const PostModel = models.Post || model<IPost>('Post', PostSchema);
