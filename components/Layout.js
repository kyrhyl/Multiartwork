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
          <div className="logo" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{fontSize: '1.5rem'}}>🎨</span>
            <span>Multiartwork</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">
            <span style={{fontSize: '0.875rem', color: '#666'}}>Login</span>
          </Link>
          <a onClick={handleLogout} style={{cursor:'pointer', fontSize: '0.875rem', color: '#666'}}>Logout</a>
        </div>
      </nav>
      <div className="content">{children}</div>
      <footer className="footer">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
            textAlign: 'left',
          }}>
            <div>
              <h3 style={{fontSize: '1.25rem', marginBottom: '16px', color: '#FFFFFF'}}>
                🎨 Multiartwork
              </h3>
              <p style={{color: '#666', fontSize: '0.9375rem', lineHeight: 1.6}}>
                Premium large format printing and custom signage solutions for businesses that demand quality.
              </p>
            </div>
            
            <div>
              <h4 style={{fontSize: '1rem', marginBottom: '16px', color: '#FFFFFF'}}>Quick Links</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <Link href="/services" style={{color: '#666', fontSize: '0.9375rem'}}>Services</Link>
                <Link href="/portfolio" style={{color: '#666', fontSize: '0.9375rem'}}>Portfolio</Link>
                <Link href="/about" style={{color: '#666', fontSize: '0.9375rem'}}>About</Link>
                <Link href="/contact" style={{color: '#666', fontSize: '0.9375rem'}}>Contact</Link>
              </div>
            </div>
            
            <div>
              <h4 style={{fontSize: '1rem', marginBottom: '16px', color: '#FFFFFF'}}>Contact Info</h4>
              <div style={{color: '#666', fontSize: '0.9375rem', lineHeight: 1.8}}>
                <p>📍 Yacapin, Corrales Ave, Cagayan De Oro City</p>
                <p>📞 836-1334</p>
                <p>📱 0917 716 1517</p>
              </div>
            </div>
          </div>
          
          <div style={{
            paddingTop: '24px',
            borderTop: '1px solid #333',
            textAlign: 'center',
            color: '#666',
            fontSize: '0.875rem',
          }}>
            © {new Date().getFullYear()} Multiartwork Printing Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
