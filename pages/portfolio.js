import { useState } from 'react';
import useSWR from 'swr';
import { theme } from '../styles/theme';
import ProjectCard from '../components/ProjectCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'signage', label: 'Signage' },
  { id: 'large-format', label: 'Large Format Printing' },
  { id: 'acrylic', label: 'Acrylic' },
  { id: 'apparel', label: 'Apparel' },
  { id: 'gifts', label: 'Promotional Gifts' },
  { id: 'steel', label: 'Steel Fabrication' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: posts, error } = useSWR('/api/posts', fetcher);

  const filteredProjects = posts?.filter(post => {
    if (activeCategory === 'all') return true;
    return post.category?.toLowerCase() === activeCategory;
  }) || [];

  return (
    <main>
      {/* Hero Section */}
      <section style={{
        padding: '120px 0 80px',
        background: 'linear-gradient(180deg, rgba(0, 102, 255, 0.05) 0%, rgba(10, 10, 10, 0) 100%)',
      }}>
        <div className="container" style={{textAlign: 'center'}}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '16px',
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Our Portfolio
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#A0A0A0',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            Explore our gallery of custom signage, prints, and fabrication work.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{padding: '0 0 60px', position: 'sticky', top: '80px', background: '#0A0A0A', zIndex: 10, paddingTop: '20px'}}>
        <div className="container">
          <div className="filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <style jsx>{`
          .filter-tabs {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0 20px;
          }

          .filter-tab {
            padding: 12px 24px;
            border: 1px solid #2A2A2A;
            background: #1A1A1A;
            color: #A0A0A0;
            border-radius: 50px;
            font-size: 0.9375rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
          }

          .filter-tab:hover {
            border-color: ${theme.colors.primary};
            color: #FFFFFF;
          }

          .filter-tab.active {
            background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
            border-color: transparent;
            color: #FFFFFF;
            box-shadow: 0 4px 16px rgba(0, 102, 255, 0.3);
          }

          @media (max-width: 768px) {
            .filter-tabs {
              overflow-x: auto;
              justify-content: flex-start;
              padding-bottom: 8px;
              scrollbar-width: thin;
              scrollbar-color: ${theme.colors.primary} #1A1A1A;
            }

            .filter-tabs::-webkit-scrollbar {
              height: 6px;
            }

            .filter-tabs::-webkit-scrollbar-track {
              background: #1A1A1A;
              border-radius: 3px;
            }

            .filter-tabs::-webkit-scrollbar-thumb {
              background: ${theme.colors.primary};
              border-radius: 3px;
            }
          }
        `}</style>
      </section>

      {/* Projects Grid */}
      <section style={{padding: '0 0 100px'}}>
        <div className="container">
          {error && (
            <div style={{textAlign: 'center', color: '#FF4444', padding: '40px 0'}}>
              <p>Failed to load projects. Please try again later.</p>
            </div>
          )}

          {!posts && !error && (
            <div style={{textAlign: 'center', color: '#666', padding: '60px 0'}}>
              <div className="loading-spinner" />
              <p style={{marginTop: '20px'}}>Loading projects...</p>
              
              <style jsx>{`
                .loading-spinner {
                  width: 48px;
                  height: 48px;
                  border: 4px solid #2A2A2A;
                  border-top-color: ${theme.colors.primary};
                  border-radius: 50%;
                  animation: spin 0.8s linear infinite;
                  margin: 0 auto;
                }

                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {posts && filteredProjects.length === 0 && (
            <div style={{textAlign: 'center', color: '#A0A0A0', padding: '60px 20px'}}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{margin: '0 auto 20px', opacity: 0.3}}>
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2"/>
              </svg>
              <h3 style={{fontSize: '1.5rem', marginBottom: '8px', color: '#FFFFFF'}}>No Projects Found</h3>
              <p>No projects available in this category yet.</p>
            </div>
          )}

          {filteredProjects.length > 0 && (
            <>
              <div className="projects-grid">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>

              <div style={{textAlign: 'center', marginTop: '60px', color: '#666'}}>
                <p>Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</p>
              </div>
            </>
          )}
        </div>

        <style jsx>{`
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 32px;
            margin-top: 40px;
          }

          @media (max-width: 768px) {
            .projects-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }
          }

          @media (min-width: 1400px) {
            .projects-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}</style>
      </section>
    </main>
  );
}
