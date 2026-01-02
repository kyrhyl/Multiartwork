import Button from '../ui/Button';

export default function CTASection() {
  return (
    <section style={{
      padding: '100px 0',
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, #0066FF 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          background: '#1F1F1F',
          padding: '60px 40px',
          borderRadius: '16px',
          border: '1px solid #333',
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '24px',
          }}>
            💡
          </div>
          
          <h2 style={{
            fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '16px',
          }}>
            Have a Custom Idea?
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#A0A0A0',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            We love unique challenges. Let's discuss your custom printing project and bring it to life.
          </p>
          
          <Button variant="primary" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
