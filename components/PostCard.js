export default function PostCard({post}){
  return (
    <div className="post-card">
      <img src={post.images?.[0]||'/placeholder.png'} alt="" />
      <h4>{post.title}</h4>
      <p>{post.excerpt}</p>
    </div>
  )
}
