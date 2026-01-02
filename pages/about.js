import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import Link from 'next/link';

const TEAM = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    image: null,
    bio: 'With 15+ years in the printing industry, John leads Multiartwork with a vision for innovation.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Design Director',
    image: null,
    bio: 'Sarah brings creative excellence to every project with her award-winning design expertise.',
  },
  {
    name: 'Mike Chen',
    role: 'Production Manager',
    image: null,
    bio: 'Mike ensures quality and timely delivery with precision production management.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Customer Success',
    image: null,
    bio: 'Emily ensures every client experience exceeds expectations from start to finish.',
  },
];

const VALUES = [
  {
    icon: '⚡',
    title: 'Speed',
    description: 'Fast turnaround without compromising quality.',
  },
  {
    icon: '✨',
    title: 'Quality',
    description: 'Premium materials and meticulous craftsmanship.',
  },
  {
    icon: '🎯',
    title: 'Precision',
    description: 'Attention to detail in every project we deliver.',
  },
  {
    icon: '🤝',
    title: 'Partnership',
    description: 'Building lasting relationships with our clients.',
  },
];

export default function About() {
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
            About Multiartwork
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#A0A0A0',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            Bringing your creative visions to life with cutting-edge printing and fabrication.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section style={{padding: '80px 0'}}>
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '24px',
                color: '#FFFFFF',
              }}>
                Our Story
              </h2>
              <div className="story-text">
                <p>
                  Founded in 2010, Multiartwork started with a simple mission: to provide businesses 
                  with exceptional printing and fabrication services that bring their brands to life.
                </p>
                <p>
                  Over the years, we've grown from a small local print shop to a full-service 
                  creative production house, serving hundreds of clients across various industries.
                </p>
                <p>
                  Today, we combine traditional craftsmanship with cutting-edge technology to 
                  deliver outstanding results. From large format printing to custom steel fabrication, 
                  our team is dedicated to excellence in every project.
                </p>
                <p>
                  We believe in building lasting partnerships with our clients, understanding their 
                  unique needs, and exceeding expectations with quality, speed, and innovation.
                </p>
              </div>
            </div>

            <div className="stats-showcase">
              <div className="stat-box">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">100%</div>
                <div className="stat-label">Quality Guarantee</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">24hr</div>
                <div className="stat-label">Rush Available</div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .story-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
          }

          .story-text p {
            color: #C0C0C0;
            font-size: 1.0625rem;
            line-height: 1.8;
            margin: 0 0 20px 0;
          }

          .story-text p:last-child {
            margin-bottom: 0;
          }

          .stats-showcase {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          .stat-box {
            background: linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%);
            border: 1px solid #2A2A2A;
            border-radius: 16px;
            padding: 32px 24px;
            text-align: center;
            transition: all 0.3s ease;
          }

          .stat-box:hover {
            border-color: ${theme.colors.primary};
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 102, 255, 0.15);
          }

          .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
          }

          .stat-label {
            color: #A0A0A0;
            font-size: 0.9375rem;
            font-weight: 500;
          }

          @media (max-width: 968px) {
            .story-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }
          }

          @media (max-width: 640px) {
            .stats-showcase {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </section>

      {/* Values Section */}
      <section style={{padding: '80px 0', background: '#0F0F0F'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#FFFFFF',
            }}>
              Our Values
            </h2>
            <p style={{fontSize: '1.125rem', color: '#A0A0A0', maxWidth: '600px', margin: '0 auto'}}>
              The principles that guide everything we do.
            </p>
          </div>

          <div className="values-grid">
            {VALUES.map((value, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .values-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 32px;
          }

          .value-card {
            text-align: center;
            padding: 32px 24px;
          }

          .value-icon {
            font-size: 3rem;
            margin-bottom: 20px;
          }

          .value-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #FFFFFF;
            margin: 0 0 12px 0;
          }

          .value-card p {
            color: #A0A0A0;
            line-height: 1.6;
            margin: 0;
          }
        `}</style>
      </section>

      {/* Team Section */}
      <section style={{padding: '80px 0'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#FFFFFF',
            }}>
              Meet Our Team
            </h2>
            <p style={{fontSize: '1.125rem', color: '#A0A0A0', maxWidth: '600px', margin: '0 auto'}}>
              Talented professionals dedicated to bringing your vision to life.
            </p>
          </div>

          <div className="team-grid">
            {TEAM.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-avatar">
                  {member.image ? (
                    <img src={member.image} alt={member.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 32px;
          }

          .team-card {
            background: #1A1A1A;
            border: 1px solid #2A2A2A;
            border-radius: 16px;
            padding: 32px;
            text-align: center;
            transition: all 0.3s ease;
          }

          .team-card:hover {
            transform: translateY(-4px);
            border-color: ${theme.colors.primary};
            box-shadow: 0 12px 40px rgba(0, 102, 255, 0.15);
          }

          .team-avatar {
            width: 120px;
            height: 120px;
            margin: 0 auto 24px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid ${theme.colors.primary};
          }

          .team-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .avatar-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 700;
            color: #FFFFFF;
          }

          .team-card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #FFFFFF;
            margin: 0 0 8px 0;
          }

          .team-role {
            color: ${theme.colors.accent};
            font-size: 0.9375rem;
            font-weight: 500;
            margin: 0 0 16px 0;
          }

          .team-bio {
            color: #A0A0A0;
            font-size: 0.9375rem;
            line-height: 1.6;
            margin: 0;
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section style={{padding: '80px 0', background: '#0F0F0F'}}>
        <div className="container">
          <div className="cta-card">
            <h2>Let's Work Together</h2>
            <p>Ready to bring your project to life? Get in touch with our team today.</p>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <Link href="/contact">
                <Button variant="primary" size="large">Contact Us</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="large">View Services</Button>
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          .cta-card {
            background: linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%);
            border: 1px solid rgba(0, 102, 255, 0.3);
            border-radius: 20px;
            padding: 60px 40px;
            text-align: center;
          }

          .cta-card h2 {
            font-size: clamp(1.75rem, 3vw, 2.25rem);
            font-weight: 700;
            color: #FFFFFF;
            margin: 0 0 16px 0;
          }

          .cta-card p {
            font-size: 1.125rem;
            color: #A0A0A0;
            margin: 0 0 32px 0;
          }

          @media (max-width: 768px) {
            .cta-card {
              padding: 40px 24px;
            }
          }
        `}</style>
      </section>
    </main>
  );
}
