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

  const filteredProjects = Array.isArray(posts) 
    ? posts.filter(post => {
        if (activeCategory === 'all') return true;
        return post.category?.toLowerCase() === activeCategory;
      }) 
    : [];

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">
            Our Portfolio
          </h1>
          <p className="hero-subtitle">
            Explore our gallery of custom signage, prints, and fabrication work.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="filter-section">
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
      </section>

      {/* Projects Grid */}
      <section className="projects-section">
        <div className="container">
          {error && (
            <div className="error-state">
              <p>Failed to load projects. Please try again later.</p>
            </div>
          )}

          {!posts && !error && (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p className="loading-text">Loading projects...</p>
            </div>
          )}

          {posts && filteredProjects.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="empty-icon">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2"/>
              </svg>
              <h3 className="empty-title">No Projects Found</h3>
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

              <div className="projects-count">
                <p>Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</p>
              </div>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        .hero-section {
          padding: 120px 0 80px;
          background: linear-gradient(180deg, rgba(0, 102, 255, 0.05) 0%, rgba(10, 10, 10, 0) 100%);
        }

        .hero-content {
          text-align: center;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 16px;
          background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #A0A0A0;
          max-width: 700px;
          margin: 0 auto;
        }

        .filter-section {
          padding: 0 0 60px;
          position: sticky;
          top: 80px;
          background: #0A0A0A;
          z-index: 10;
          padding-top: 20px;
        }

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

        .projects-section {
          padding: 0 0 100px;
        }

        .error-state {
          text-align: center;
          color: #FF4444;
          padding: 40px 0;
        }

        .loading-state {
          text-align: center;
          color: #666;
          padding: 60px 0;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #2A2A2A;
          border-top-color: ${theme.colors.primary};
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }

        .loading-text {
          margin-top: 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          color: #A0A0A0;
          padding: 60px 20px;
        }

        .empty-icon {
          margin: 0 auto 20px;
          opacity: 0.3;
        }

        .empty-title {
          font-size: 1.5rem;
          margin-bottom: 8px;
          color: #FFFFFF;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }

        .projects-count {
          text-align: center;
          margin-top: 60px;
          color: #666;
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
    </main>
  );
}
