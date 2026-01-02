import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import Link from 'next/link';

const SERVICES = [
  {
    id: 'large-format',
    title: 'Large Format Printing',
    icon: '🖨️',
    description: 'High-quality large format printing for banners, posters, and outdoor advertising.',
    features: [
      'UV-resistant outdoor materials',
      'Up to 16 feet wide prints',
      'Vibrant color reproduction',
      'Same-day turnaround available',
    ],
    color: '#0066FF',
  },
  {
    id: 'signage',
    title: 'Custom Signage',
    icon: '🪧',
    description: 'Eye-catching business signs designed to attract customers and build your brand.',
    features: [
      'Channel letters & LED signage',
      'Monument & pylon signs',
      'Wayfinding systems',
      'Indoor & outdoor installations',
    ],
    color: '#00D4FF',
  },
  {
    id: 'acrylic',
    title: 'Acrylic Fabrication',
    icon: '💎',
    description: 'Premium acrylic products including displays, awards, and custom fabrications.',
    features: [
      'Laser cutting & engraving',
      'Custom shapes & sizes',
      'Multiple thickness options',
      'Clear, frosted, or colored',
    ],
    color: '#0066FF',
  },
  {
    id: 'apparel',
    title: 'Custom Apparel',
    icon: '👕',
    description: 'Screen printing and embroidery services for t-shirts, uniforms, and branded apparel.',
    features: [
      'Screen printing & DTG',
      'Embroidery services',
      'No minimum orders',
      'Bulk discounts available',
    ],
    color: '#00D4FF',
  },
  {
    id: 'gifts',
    title: 'Promotional Gifts',
    icon: '🎁',
    description: 'Branded promotional products to boost your marketing and corporate identity.',
    features: [
      'Wide product selection',
      'Custom branding options',
      'Quality corporate gifts',
      'Fast production times',
    ],
    color: '#0066FF',
  },
  {
    id: 'steel',
    title: 'Steel Fabrication',
    icon: '🔧',
    description: 'Custom steel and metal fabrication for durable, industrial-strength solutions.',
    features: [
      'Structural steel work',
      'Custom metal signage',
      'Powder coating available',
      'Welding & assembly',
    ],
    color: '#00D4FF',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We discuss your project requirements, budget, and timeline.',
  },
  {
    number: '02',
    title: 'Design & Quote',
    description: 'Our team creates mockups and provides detailed pricing.',
  },
  {
    number: '03',
    title: 'Production',
    description: 'Your project goes into production with quality checks.',
  },
  {
    number: '04',
    title: 'Delivery',
    description: 'We deliver and install your finished product on time.',
  },
];

export default function Services() {
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
            Our Services
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#A0A0A0',
            maxWidth: '700px',
            margin: '0 auto 32px',
          }}>
            Comprehensive printing and fabrication solutions tailored to your business needs.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="large">Get a Free Quote</Button>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{padding: '80px 0'}}>
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon" style={{background: `linear-gradient(135deg, ${service.color}22 0%, ${service.color}11 100%)`}}>
                  <span style={{fontSize: '2.5rem'}}>{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke={service.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button variant="outline" fullWidth>Learn More</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
          }

          .service-card {
            background: #1A1A1A;
            border: 1px solid #2A2A2A;
            border-radius: 16px;
            padding: 32px;
            transition: all 0.3s ease;
          }

          .service-card:hover {
            transform: translateY(-4px);
            border-color: ${theme.colors.primary};
            box-shadow: 0 12px 40px rgba(0, 102, 255, 0.15);
          }

          .service-icon {
            width: 80px;
            height: 80px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
          }

          .service-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #FFFFFF;
            margin: 0 0 12px 0;
          }

          .service-description {
            color: #A0A0A0;
            line-height: 1.6;
            margin: 0 0 24px 0;
          }

          .service-features {
            list-style: none;
            padding: 0;
            margin: 0 0 32px 0;
          }

          .service-features li {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #E0E0E0;
            font-size: 0.9375rem;
            margin-bottom: 12px;
          }

          .service-features li svg {
            flex-shrink: 0;
          }

          @media (max-width: 768px) {
            .services-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </section>

      {/* Process Section */}
      <section style={{padding: '80px 0', background: '#0F0F0F'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#FFFFFF',
            }}>
              Our Process
            </h2>
            <p style={{fontSize: '1.125rem', color: '#A0A0A0', maxWidth: '600px', margin: '0 auto'}}>
              From concept to completion, we handle every step of your project with care.
            </p>
          </div>

          <div className="process-timeline">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.number} className="process-step">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {idx < PROCESS_STEPS.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .process-timeline {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            position: relative;
          }

          .process-step {
            text-align: center;
            position: relative;
          }

          .step-number {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
            color: #FFFFFF;
            font-size: 1.5rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 8px 24px rgba(0, 102, 255, 0.3);
          }

          .process-step h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #FFFFFF;
            margin: 0 0 8px 0;
          }

          .process-step p {
            color: #A0A0A0;
            font-size: 0.9375rem;
            line-height: 1.6;
            margin: 0;
          }

          .step-connector {
            position: absolute;
            top: 32px;
            left: calc(50% + 32px);
            width: calc(100% - 64px);
            height: 2px;
            background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent});
            opacity: 0.3;
          }

          @media (max-width: 968px) {
            .process-timeline {
              grid-template-columns: 1fr;
              gap: 60px;
            }

            .step-connector {
              top: calc(100% - 30px);
              left: 50%;
              width: 2px;
              height: 60px;
              background: linear-gradient(180deg, ${theme.colors.primary}, ${theme.colors.accent});
            }

            .process-step:last-child .step-connector {
              display: none;
            }
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section style={{padding: '80px 0'}}>
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Start Your Project?</h2>
            <p>Contact us today for a free consultation and quote.</p>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <Link href="/contact">
                <Button variant="primary" size="large">Get a Quote</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="large">View Our Work</Button>
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
