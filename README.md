# Multiartwork Portfolio (Next.js + MongoDB)

This is a lightweight starter implementing a portfolio site with admin/editor accounts that can post content.

Features
- Next.js frontend and API routes
- MongoDB via Mongoose
- Simple JWT cookie auth (admin & editor)
- API endpoints to create/read/update/delete posts

Quick start
1. Copy `.env.example` to `.env` and update `MONGODB_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
npm install
```

3. Seed example users (or POST to `/api/auth/seed`):

```bash
npm run seed
```

4. Run dev server:

```bash
npm run dev
```

5. Sign in at `/login` using seeded accounts:
- admin@multiartwork.local / AdminPass123 (admin)
- editor@multiartwork.local / EditorPass123 (editor)

Notes
- This starter uses a minimal auth approach. For production, use HTTPS, secure cookies, CSRF protection, rate-limiting, strong JWT_SECRET, and input validation.
- You can extend upload handling, rich text editors, and image management as needed.
