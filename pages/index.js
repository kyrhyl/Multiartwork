import Link from 'next/link';
import Button from '../components/ui/Button';
import { theme } from '../styles/theme';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const EXPERTISE_CARDS = [
  {
    icon: '💡',
    title: 'Custom Signage',
    description: 'High-impact indoor and outdoor signage. From lighted acrylic boxes to 3D channel letters that define your brand.',
    features: ['3D Built-up Letters', 'Lightbox Signage', 'Wayfinding Systems'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80' // Neon signage
  },
  {
    icon: '🔧',
    title: 'Steel Fabrication',
    description: 'Heavy-duty metalworks for structural and aesthetic purposes. Precision welding for gates, railings, and frames.',
    features: ['Gates & Railings', 'Structural Welding', 'Custom Metal Furniture'],
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80' // Welding sparks
  },
  {
    icon: '🖨️',
    title: 'Professional Printing',
    description: 'Large format printing solutions for advertising and decor. High-res colors and weather-resistant materials.',
    features: ['Tarpaulins & Banners', 'Vinyl Stickers', 'Vehicle Wraps'],
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80' // Large format printer
  },
];

const PORTFOLIO_PROJECTS = [
  {
    title: 'Corporate Headquarters',
    category: 'Signage',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80' // Modern building signage
  },
  {
    title: 'Custom Gates',
    category: 'Fabrication',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' // Ornate metal gates
  },
  {
    title: 'Retail Glow',
    category: 'Signage',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80' // Neon retail sign
  },
  {
    title: 'Fleet Branding',
    category: 'Printing',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80' // Van with branding
  },
  {
    title: 'Warehouse Beams',
    category: 'Fabrication',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80' // Industrial steel structure
  },
];

const TRUSTED_BY = [
  'ADVERTISERS INC',
  'BLACK MESA',
  'CYBERSYSTM',
  'UMBRELLA CORP',
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image">
          <div className="hero-overlay">
            <div className="container hero-content">
              <h1 className="hero-title">
                Built to Last.<br />
                Designed to Stand Out.
              </h1>
              <p className="hero-subtitle">
                Premium signage solutions, large-format printing, and expert steel fabrication for businesses that demand visibility and durability.
              </p>
              <div className="hero-buttons">
                <Link href="/portfolio">
                  <Button variant="primary" size="large">View Our Work</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="large">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="expertise">
        <div className="container">
          <div className="section-header">
            <h2>Our Expertise</h2>
            <p>We combine industrial precision with creative design to deliver comprehensive branding solutions.</p>
            <Link href="/services" className="view-all">
              View all Services →
            </Link>
          </div>

          <div className="expertise-grid">
            {EXPERTISE_CARDS.map((card, idx) => (
              <div key={idx} className="expertise-card">
                <div className="card-image">
                  <img src={card.image} alt={card.title} />
                  <div className="card-icon-overlay">{card.icon}</div>
                </div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul className="features-list">
                    {card.features.map((feature, i) => (
                      <li key={i}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="portfolio-showcase">
        <div className="container">
          <div className="section-header centered">
            <span className="eyebrow">OUR PORTFOLIO</span>
            <h2>Craftsmanship in Every Detail</h2>
            <p>Browse our latest projects showcasing our capability in complex installations and creative designs.</p>
          </div>

          <div className="portfolio-grid">
            {PORTFOLIO_PROJECTS.map((project, idx) => (
              <div key={idx} className={`portfolio-item ${idx === 0 ? 'large' : ''}`}>
                <img src={project.image} alt={project.title} />
                <div className="portfolio-overlay">
                  <h3>{project.title}</h3>
                  <span className="category">{project.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="portfolio-cta">
            <Link href="/portfolio">
              <Button variant="primary" size="large">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-content">
              <h2>Why Choose Multi-Artworks?</h2>
              
              <div className="benefit">
                <div className="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3>Premium Materials</h3>
                  <p>We never compromise on quality. We use industry-grade steel, weather-resistant vinyl, and long-lasting LEDs.</p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3>Expert Craftsmanship</h3>
                  <p>Our team consists of certified welders and experienced graphic installers dedicated to perfection.</p>
                </div>
              </div>
            </div>

            <div className="trusted-by">
              <h3>Trusted By</h3>
              <div className="trusted-logos">
                {TRUSTED_BY.map((name, idx) => (
                  <div key={idx} className="logo-box">{name}</div>
                ))}
              </div>
              <div className="cta-box">
                <p>Ready to start your project?</p>
                <Link href="/contact">
                  <Button variant="light" size="large">Request Consultation</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          min-height: 600px;
          overflow: hidden;
        }

        .hero-image {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 600px;
          background: url('https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=80') center center/cover;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.5) 100%);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 120px 20px 80px;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          color: #FFFFFF;
          margin: 0 0 24px 0;
          max-width: 700px;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #E5E7EB;
          margin: 0 0 40px 0;
          max-width: 600px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .expertise {
          padding: 100px 0;
          background: #F9FAFB;
        }

        .section-header {
          margin-bottom: 60px;
        }

        .section-header.centered {
          text-align: center;
        }

        .section-header h2 {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #111827;
          margin: 0 0 16px 0;
        }

        .section-header p {
          font-size: 1.125rem;
          color: #6B7280;
          max-width: 600px;
        }

        .section-header.centered p {
          margin: 0 auto;
        }

        .view-all {
          display: inline-block;
          margin-top: 16px;
          color: #2563EB;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .view-all:hover {
          color: #1D4ED8;
        }

        .eyebrow {
          display: block;
          color: #2563EB;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        .expertise-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .expertise-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(37, 99, 235, 0.15);
        }

        .card-image {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .expertise-card:hover .card-image img {
          transform: scale(1.05);
        }

        .card-icon-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          width: 56px;
          height: 56px;
          background: #2563EB;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
        }

        .card-content {
          padding: 32px;
        }

        .card-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 12px 0;
        }

        .card-content p {
          color: #6B7280;
          line-height: 1.6;
          margin: 0 0 24px 0;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #374151;
          font-size: 0.9375rem;
          margin-bottom: 12px;
        }

        .features-list li svg {
          flex-shrink: 0;
        }

        .portfolio-showcase {
          padding: 100px 0;
          background: #F9FAFB;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 60px;
        }

        .portfolio-item {
          position: relative;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .portfolio-item.large {
          grid-row: span 2;
          grid-column: span 2;
        }

        .portfolio-item:hover {
          transform: scale(1.02);
        }

        .portfolio-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .portfolio-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
          color: white;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .portfolio-item:hover .portfolio-overlay {
          opacity: 1;
        }

        .portfolio-overlay h3 {
          margin: 0 0 4px 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .portfolio-overlay .category {
          font-size: 0.875rem;
          color: #D1D5DB;
        }

        .portfolio-cta {
          text-align: center;
        }

        .why-choose {
          padding: 100px 0;
          background: linear-gradient(135deg, #1E40AF 0%, #2563EB 100%);
        }

        .why-choose-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .why-content h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 40px 0;
        }

        .benefit {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
        }

        .benefit-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .benefit h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 8px 0;
        }

        .benefit p {
          color: #E5E7EB;
          line-height: 1.6;
          margin: 0;
        }

        .trusted-by {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
        }

        .trusted-by h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 24px 0;
          text-align: center;
        }

        .trusted-logos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }

        .logo-box {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 24px 16px;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: #E5E7EB;
          letter-spacing: 0.5px;
        }

        .cta-box {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
        }

        .cta-box p {
          color: #FFFFFF;
          font-size: 1rem;
          margin: 0 0 16px 0;
        }

        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .why-choose-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .expertise-grid {
            grid-template-columns: 1fr;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
          }

          .portfolio-item.large {
            grid-row: span 1;
            grid-column: span 1;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .hero-buttons :global(button) {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
