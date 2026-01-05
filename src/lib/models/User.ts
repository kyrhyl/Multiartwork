import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  _id: string;
  email: string;
  passwordHash: string;
  role: 'admin';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = models.User || model<IUser>('User', UserSchema);
