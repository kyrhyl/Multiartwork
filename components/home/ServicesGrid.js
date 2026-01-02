const services = [
  {
    icon: '🖨️',
    title: 'Large Format Printing',
    description: 'High-quality banners, tarpaulins, stickers, and wall canvas designed for maximum impact and outdoor use.',
  },
  {
    icon: '🪧',
    title: 'Signages & Cladding',
    description: 'Durable aluminum cladding, 3D built-up letters, and lighted storefront signs that withstand the elements.',
  },
  {
    icon: '🏆',
    title: 'Acrylic Base Tokens',
    description: 'Premium acrylic awards, plaques, and corporate giveaways. Ideal for precision for your special events.',
  },
  {
    icon: '👕',
    title: 'Shirt Printing',
    description: 'Custom apparel printing (full-colors, sublimation, DTG) and embroidery for company uniforms, teams, and events.',
  },
  {
    icon: '🎁',
    title: 'Customized Gifts',
    description: 'Personalized mugs, pens, umbrellas, keychains, and other memorable items perfect for corporate gifting.',
  },
  {
    icon: '🛠️',
    title: 'Steel Fabrication',
    description: 'Industrial-grade steel structures, frames, and custom metalwork built to last with precision craftsmanship.',
  },
];

function ServiceCard({ service }) {
  return (
    <div style={{
      background: '#1F1F1F',
      padding: '32px',
      borderRadius: '12px',
      border: '1px solid #333',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#0066FF';
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 102, 255, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#333';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{
        fontSize: '3rem',
        marginBottom: '16px',
      }}>
        {service.icon}
      </div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '12px',
        color: '#FFFFFF',
      }}>
        {service.title}
      </h3>
      <p style={{
        fontSize: '0.9375rem',
        color: '#A0A0A0',
        lineHeight: 1.6,
      }}>
        {service.description}
      </p>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <section style={{padding: '100px 0', background: '#0A0A0A'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '60px'}}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '16px',
          }}>
            Our Services
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#A0A0A0',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            Explore our wide range of professional printing and customization solutions tailored to your business needs.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
