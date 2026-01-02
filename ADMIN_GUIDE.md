# Admin Guide — Multiartwork Portfolio

This file describes how to manage the portfolio site (admin/editor responsibilities), run the project locally, and use the API endpoints for creating and editing posts.

## Quick start

1. Copy `.env.example` to `.env` and set values:

   - `MONGODB_URI` — your MongoDB connection string
   - `JWT_SECRET` — a strong secret used to sign auth tokens

2. Install and seed example users:

```bash
npm install
npm run seed
```

Seeded accounts (for development):

- `admin@multiartwork.local` / `AdminPass123` (role: admin)
- `editor@multiartwork.local` / `EditorPass123` (role: editor)

3. Run the dev server:

```bash
npm run dev
```

4. Visit `http://localhost:3000/login` to sign in.

---

## Roles and capabilities

- Admin
  - Can create, edit, and delete posts.
  - Has full access to the admin dashboard and post management APIs.

- Editor
  - Can create and edit posts.
  - Cannot delete posts (deletion is restricted to admins).

---

## How to create posts (UI)

1. Login and go to the `Dashboard` link in the navigation.
2. Click `Create Post` to open the new post form.
3. Provide `Title`, `Slug`, `Excerpt`, and `Content` (HTML allowed). Add images as comma-separated public URLs.
4. Set `Status` to `published` to make the post visible on the public site.

## How to edit/delete posts (UI)

1. From the dashboard, click `Edit` on a post card to open the editor.
2. Modify fields and click `Save`.
3. If you are an admin, click `Delete` to remove the post.

---

## Relevant API endpoints

- `POST /api/auth/login` — login with `{ email, password }`. Sets an HttpOnly cookie `token`.
- `POST /api/auth/logout` — clears the `token` cookie.
- `GET /api/auth/me` — returns the current authenticated user.
- `POST /api/auth/seed` — creates example `admin` and `editor` users (development only).

- `GET /api/posts` — list published posts (public).
- `POST /api/posts` — create a post (requires auth).
- `GET /api/posts/:id` — get a single post.
- `PUT /api/posts/:id` — update a post (requires auth).
- `DELETE /api/posts/:id` — delete a post (admin only).

---

## Notes and next improvements

- Image uploads are not implemented; the admin UI expects public image URLs. Consider adding Cloudinary/S3 upload integration.
- For production: use HTTPS, set `Secure` and `SameSite` cookie attributes, harden `JWT_SECRET`, add input validation, rate limiting, and CSRF protection.
- Consider adding a WYSIWYG editor (e.g., TipTap/Quill) for richer content authoring.

---

If you'd like, I can add image upload (Cloudinary), a rich editor, or server-side role checks for more strict enforcement next. Let me know which feature to implement.