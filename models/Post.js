const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  images: [{ type: String }],
  tags: [{ type: String }],
  status: { type: String, enum: ['draft','published'], default: 'draft' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);
