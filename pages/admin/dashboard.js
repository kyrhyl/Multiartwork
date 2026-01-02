import Link from 'next/link';
import dbConnect from '../../lib/mongodb';
import Post from '../../models/Post';
import { getUserFromRequest } from '../../lib/auth';

export default function Dashboard({ posts, user }){
  return (
    <div className="admin">
      <header className="admin-head">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
          <h2>Dashboard</h2>
          <div style={{fontSize:14,color:'#666'}}>Signed in as {user?.name} ({user?.role})</div>
        </div>
        <Link href="/admin/posts/new"><button>Create Post</button></Link>
      </header>
      <section>
        <h3>Published Works</h3>
        <div className="grid">
          {posts.map(p=> (
            <div key={p._id} className="card">
              <img src={p.images?.[0]||'/placeholder.png'} alt="" />
              <h4>{p.title}</h4>
              <p>{p.excerpt}</p>
              <div style={{marginTop:8}}>
                <Link href={`/admin/posts/${p._id}`}><button>Edit</button></Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(ctx){
  const user = await getUserFromRequest(ctx.req);
  if(!user) return { redirect: { destination: '/login', permanent: false } };
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
  const clean = posts.map(p=>({ _id: p._id.toString(), title: p.title, excerpt: p.excerpt, images: p.images||[] }));
  const safeUser = { id: user._id.toString(), name: user.name, role: user.role };
  return { props: { posts: clean, user: safeUser } };
}
