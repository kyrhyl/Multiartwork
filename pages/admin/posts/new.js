import { useState } from 'react';
import Router from 'next/router';
import { getUserFromRequest } from '../../../lib/auth';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function NewPost(){
  const [title,setTitle]=useState('');
  const [slug,setSlug]=useState('');
  const [excerpt,setExcerpt]=useState('');
  const [content,setContent]=useState('');
  const [images,setImages]=useState('');
  const [status,setStatus]=useState('draft');

  async function submit(e){
    e.preventDefault();
    const body = { title, slug, excerpt, content, images: images.split(',').map(s=>s.trim()).filter(Boolean), status };
    const res = await fetch('/api/posts', { method:'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(body) });
    if(res.ok){
      Router.push('/admin/dashboard');
    } else {
      alert('Error creating post');
    }
  }

  async function handleFile(e){
    const file = e.target.files?.[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      const r = await fetch('/api/uploads/image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dataUrl }) });
      const j = await r.json();
      if(r.ok){
        setImages(prev => prev ? prev + ', ' + j.url : j.url);
      } else {
        alert('Upload failed');
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <main className="form-page">
      <div className="post-form">
        <h3>Create Post</h3>
        <form onSubmit={submit}>
          <label>Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} />
          <label>Slug</label>
          <input value={slug} onChange={e=>setSlug(e.target.value)} />
          <label>Excerpt</label>
          <textarea value={excerpt} onChange={e=>setExcerpt(e.target.value)} />
          <label>Content</label>
          <ReactQuill value={content} onChange={setContent} />
          <label>Images (comma separated URLs)</label>
          <input value={images} onChange={e=>setImages(e.target.value)} />
          <label>Or upload an image</label>
          <input type="file" accept="image/*" onChange={handleFile} />
          <label>Status</label>
          <select value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    </main>
  )
}

export async function getServerSideProps(ctx){
  const user = await getUserFromRequest(ctx.req);
  if(!user) return { redirect: { destination: '/login', permanent: false } };
  const safeUser = { id: user._id.toString(), name: user.name, role: user.role };
  return { props: { user: safeUser } };
}
