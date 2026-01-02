import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div style={{marginBottom: '12px'}}>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#0066FF',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            NOW ACCEPTING NEW PROJECTS
          </span>
        </div>
        
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1.5rem'
        }}>
          Bring Your Ideas to Life<br />
          with <span style={{
            background: 'linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Multiartwork</span>
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#A0A0A0',
          maxWidth: '700px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          Premium large format printing, custom signage, acrylic tokens, and personalized gifts. 
          We turn your vision into tangible, high-quality prints.
        </p>
        
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Button variant="primary" size="lg">
            Request a Quote
          </Button>
          <Button variant="secondary" size="lg">
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
