import useSWR from 'swr';
import { useState } from 'react';
import Button from '../ui/Button';

const fetcher = (url) => fetch(url).then((r) => r.json());

const categories = ['All', 'Signage', 'Large Format Print', 'Steel Fabrication', 'Acrylic Awards'];

function ProjectCard({ project }) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      background: '#1F1F1F',
      border: '1px solid #333',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      const overlay = e.currentTarget.querySelector('.project-overlay');
      if (overlay) overlay.style.opacity = '1';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      const overlay = e.currentTarget.querySelector('.project-overlay');
      if (overlay) overlay.style.opacity = '0';
    }}>
      <img 
        src={project.images?.[0] || '/placeholder.png'} 
        alt={project.title}
        style={{
          width: '100%',
          height: '280px',
          objectFit: 'cover',
        }}
      />
      <div 
        className="project-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,102,255,0.9) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '24px',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#00D4FF',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {project.tags?.[0] || 'PROJECT'}
        </div>
        <h4 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '8px',
        }}>
          {project.title}
        </h4>
        <p style={{
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.4,
        }}>
          {project.excerpt}
        </p>
      </div>
    </div>
  );
}

export default function ProjectsGallery() {
  const { data } = useSWR('/api/posts', fetcher);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const posts = data?.posts || [];

  return (
    <section style={{padding: '100px 0', background: '#0A0A0A'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '16px',
          }}>
            Recent Works
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#A0A0A0',
            maxWidth: '700px',
            margin: '0 auto 32px',
          }}>
            Check out some of our latest projects and happy clients.
          </p>
          
          {/* Category Filters */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: activeCategory === cat ? '2px solid #0066FF' : '2px solid #333',
                  background: activeCategory === cat ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
                  color: activeCategory === cat ? '#0066FF' : '#A0A0A0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = '#0066FF';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = '#333';
                    e.currentTarget.style.color = '#A0A0A0';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}>
          {posts.slice(0, 6).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
        
        <div style={{textAlign: 'center'}}>
          <Button variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
