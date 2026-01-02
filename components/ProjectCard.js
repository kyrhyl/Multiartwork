import { theme } from '../styles/theme';

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-image">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <div className="project-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        <div className="project-overlay">
          <h3>{project.title}</h3>
          {project.category && (
            <span className="project-category">{project.category}</span>
          )}
        </div>
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        {project.excerpt && (
          <p className="project-excerpt">{project.excerpt}</p>
        )}
      </div>

      <style jsx>{`
        .project-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #1A1A1A;
          border: 1px solid #2A2A2A;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .project-card:hover {
          transform: translateY(-4px);
          border-color: ${theme.colors.primary};
          box-shadow: 0 12px 40px rgba(0, 102, 255, 0.15);
        }

        .project-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #0F0F0F;
        }

        .project-image :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-image :global(img) {
          transform: scale(1.05);
        }

        .project-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #404040;
          background: linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%);
        }

        .project-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-overlay h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .project-category {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(0, 102, 255, 0.2);
          border: 1px solid ${theme.colors.primary};
          border-radius: 20px;
          font-size: 0.875rem;
          color: ${theme.colors.accent};
        }

        .project-info {
          padding: 20px;
        }

        .project-info h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 8px 0;
        }

        .project-excerpt {
          font-size: 0.9375rem;
          color: #A0A0A0;
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
