import { useState, useEffect } from 'react';

const stats = [
  { label: 'Quality Guaranteed', value: '100', suffix: '%', icon: '✓' },
  { label: 'Fast Turnaround', value: '24', suffix: 'hrs', icon: '⚡' },
  { label: 'CMYK Experts', value: '15', suffix: '+', icon: '🎨' },
  { label: 'Nationwide Delivery', value: '500', suffix: '+', icon: '🚚' },
];

function StatCard({ stat, index }) {
  const [count, setCount] = useState(0);
  const target = parseInt(stat.value);
  
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return (
    <div style={{
      textAlign: 'center',
      padding: '32px 24px',
      background: '#1A1A1A',
      borderRadius: '12px',
      border: '1px solid #333',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#0066FF';
      e.currentTarget.style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#333';
      e.currentTarget.style.transform = 'translateY(0)';
    }}>
      <div style={{fontSize: '2rem', marginBottom: '8px'}}>{stat.icon}</div>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#0066FF',
        marginBottom: '8px'
      }}>
        {count}{stat.suffix}
      </div>
      <div style={{
        fontSize: '0.9375rem',
        color: '#A0A0A0',
        fontWeight: 500
      }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section style={{padding: '80px 0', background: '#0A0A0A'}}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
