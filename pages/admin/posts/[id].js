import Router from 'next/router';
import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';
import { getUserFromRequest } from '../../../lib/auth';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditPost({ post, user }){
  const [title,setTitle]=useState(post.title||'');
  const [slug,setSlug]=useState(post.slug||'');
  const [excerpt,setExcerpt]=useState(post.excerpt||'');
  const [content,setContent]=useState(post.content||'');
  const [images,setImages]=useState((post.images||[]).join(', '));
  const [status,setStatus]=useState(post.status||'draft');

  async function save(e){
    e.preventDefault();
    const body = { title, slug, excerpt, content, images: images.split(',').map(s=>s.trim()).filter(Boolean), status };
    const res = await fetch(`/api/posts/${post._id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
    if(res.ok) Router.push('/admin/dashboard'); else alert('Error saving');
  }

  async function remove(){
    if(!confirm('Delete this post?')) return;
    const res = await fetch(`/api/posts/${post._id}`, { method: 'DELETE' });
    if(res.ok) Router.push('/admin/dashboard'); else alert('Delete failed');
  }

  return (
    <main className="form-page">
      <div className="post-form">
        <h3>Edit Post</h3>
        <form onSubmit={save}>
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
          <input type="file" accept="image/*" onChange={async (e)=>{
            const file = e.target.files?.[0];
            if(!file) return;
            const reader = new FileReader();
            reader.onload = async ()=>{
              const dataUrl = reader.result;
              const r = await fetch('/api/uploads/image',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({dataUrl})});
              const j = await r.json();
              if(r.ok) setImages(prev => prev ? prev + ', ' + j.url : j.url); else alert('Upload failed');
            };
            reader.readAsDataURL(file);
          }} />
          <label>Status</label>
          <select value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
            <div style={{marginTop:12}}>
            <button type="submit">Save</button>
            {user?.role === 'admin' && (
              <button type="button" onClick={remove} style={{marginLeft:8,background:'#c0392b',color:'#fff'}}>Delete</button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export async function getServerSideProps(ctx){
  const user = await getUserFromRequest(ctx.req);
  if(!user) return { redirect: { destination: '/login', permanent: false } };
  await dbConnect();
  const { id } = ctx.params;
  const p = await Post.findById(id).lean();
  if(!p) return { notFound: true };
  const post = { _id: p._id.toString(), title: p.title||'', slug: p.slug||'', excerpt: p.excerpt||'', content: p.content||'', images: p.images||[], status: p.status||'draft' };
  const safeUser = { id: user._id.toString(), name: user.name, role: user.role };
  return { props: { post, user: safeUser } };
}
