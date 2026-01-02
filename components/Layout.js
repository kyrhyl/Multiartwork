import Link from 'next/link';
import Router from 'next/router';

async function handleLogout() {
  await fetch('/api/auth/logout', { method: 'POST' });
  Router.push('/');
}

export default function Layout({ children }){
  return (
    <div>
      <nav className="nav">
        <Link href="/">
          <div className="logo">
            <span className="logo-icon">🎨</span>
            <span className="logo-text">Multi-Artworks & Signages</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/about">About</Link>
        </div>
        <Link href="/contact" className="cta-button">
          Get a Quote
        </Link>
        <div className="nav-links-secondary">
          <Link href="/login">
            <span style={{fontSize: '0.875rem', color: '#666'}}>Login</span>
          </Link>
          <a onClick={handleLogout} style={{cursor:'pointer', fontSize: '0.875rem', color: '#666'}}>Logout</a>
        </div>
      </nav>
      <div className="content">{children}</div>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-section">
            <h3 className="footer-logo">
              🎨 Multi-Artworks
            </h3>
            <p className="footer-description">
              Leading provider of premium signage, steel fabrication, and large-format printing services.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <div className="footer-links">
              <Link href="/services">Signage Fabrication</Link>
              <Link href="/services">Steel Works</Link>
              <Link href="/services">Vehicle Wraps</Link>
              <Link href="/services">Large Format Printing</Link>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <div className="footer-links">
              <Link href="/about">About Us</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/contact">Careers</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <div className="footer-contact">
              <p>📍 123 Industrial Ave, Enterprise City, ST 12345</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@multiartwork.com</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Multi-Artworks & Signages. All rights reserved.
          </p>
          <div className="social-links">
            <a href="#">FB</a>
            <a href="#">IG</a>
            <a href="#">LI</a>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .nav {
          position: sticky;
          top: 0;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E7EB;
          padding: 16px 0;
          z-index: 1000;
        }
        
        .nav :global(.logo) {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #1F2937;
          font-weight: 700;
          font-size: 1.125rem;
        }
        
        .nav-links {
          display: flex;
          gap: 32px;
        }
        
        .nav-links :global(a) {
          color: #4B5563;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .nav-links :global(a):hover {
          color: #2563EB;
        }
        
        .cta-button {
          background: #2563EB;
          color: white;
          padding: 10px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s;
        }
        
        .cta-button:hover {
          background: #1D4ED8;
        }
        
        .nav-links-secondary {
          display: none;
        }
        
        .footer {
          background: #111827;
          color: #D1D5DB;
          padding: 60px 0 0;
          margin-top: 80px;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #374151;
        }
        
        .footer-logo {
          color: #FFFFFF;
          font-size: 1.25rem;
          margin: 0 0 16px 0;
        }
        
        .footer-description {
          color: #9CA3AF;
          line-height: 1.8;
          font-size: 0.9375rem;
        }
        
        .footer-heading {
          color: #FFFFFF;
          font-size: 1rem;
          margin: 0 0 16px 0;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .footer-links :global(a) {
          color: #9CA3AF;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .footer-links :global(a):hover {
          color: #FFFFFF;
        }
        
        .footer-contact p {
          color: #9CA3AF;
          margin: 8px 0;
          font-size: 0.9375rem;
        }
        
        .footer-bottom {
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .copyright {
          color: #6B7280;
          margin: 0;
          font-size: 0.875rem;
        }
        
        .social-links {
          display: flex;
          gap: 16px;
        }
        
        .social-links a {
          width: 32px;
          height: 32px;
          background: #374151;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D1D5DB;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 600;
          transition: background 0.2s;
        }
        
        .social-links a:hover {
          background: #2563EB;
          color: #FFFFFF;
        }
        
        @media (max-width: 968px) {
          .nav-links {
            display: none;
          }
          
          .cta-button {
            display: none;
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
