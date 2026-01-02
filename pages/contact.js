import { useState } from 'react';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';

const CONTACT_INFO = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2"/>
        <circle cx="12" cy="10" r="3" strokeWidth="2"/>
      </svg>
    ),
    title: 'Visit Us',
    details: ['123 Main Street', 'Your City, ST 12345'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeWidth="2"/>
      </svg>
    ),
    title: 'Call Us',
    details: ['(555) 123-4567', 'Mon-Fri, 8am-6pm'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
        <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
      </svg>
    ),
    title: 'Email Us',
    details: ['info@multiartwork.com', 'quotes@multiartwork.com'],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'Thank you! We\'ll get back to you within 24 hours.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

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
            Get In Touch
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#A0A0A0',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            Have a project in mind? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{padding: '80px 0'}}>
        <div className="container">
          <div className="contact-info-grid">
            {CONTACT_INFO.map((info, idx) => (
              <div key={idx} className="info-card">
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .contact-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 32px;
            margin-bottom: 80px;
          }

          .info-card {
            background: #1A1A1A;
            border: 1px solid #2A2A2A;
            border-radius: 16px;
            padding: 40px 32px;
            text-align: center;
            transition: all 0.3s ease;
          }

          .info-card:hover {
            transform: translateY(-4px);
            border-color: ${theme.colors.primary};
            box-shadow: 0 12px 40px rgba(0, 102, 255, 0.15);
          }

          .info-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(0, 102, 255, 0.2), rgba(0, 212, 255, 0.1));
            color: ${theme.colors.accent};
          }

          .info-card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #FFFFFF;
            margin: 0 0 12px 0;
          }

          .info-card p {
            color: #A0A0A0;
            font-size: 0.9375rem;
            margin: 4px 0;
          }
        `}</style>
      </section>

      {/* Contact Form */}
      <section style={{padding: '0 0 100px'}}>
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll respond as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project inquiry"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us about your project..."
                />
              </div>

              {status.message && (
                <div className={`status-message ${status.type}`}>
                  {status.message}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>

        <style jsx>{`
          .form-container {
            max-width: 800px;
            margin: 0 auto;
            background: #1A1A1A;
            border: 1px solid #2A2A2A;
            border-radius: 20px;
            padding: 48px;
          }

          .form-header {
            text-align: center;
            margin-bottom: 40px;
          }

          .form-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #FFFFFF;
            margin: 0 0 12px 0;
          }

          .form-header p {
            color: #A0A0A0;
            font-size: 1.0625rem;
            margin: 0;
          }

          .contact-form {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .form-group label {
            color: #E0E0E0;
            font-size: 0.9375rem;
            font-weight: 500;
          }

          .form-group input,
          .form-group textarea {
            background: #0F0F0F;
            border: 1px solid #2A2A2A;
            border-radius: 8px;
            padding: 14px 16px;
            color: #FFFFFF;
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.3s ease;
          }

          .form-group input:focus,
          .form-group textarea:focus {
            outline: none;
            border-color: ${theme.colors.primary};
            box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
          }

          .form-group input::placeholder,
          .form-group textarea::placeholder {
            color: #606060;
          }

          .form-group textarea {
            resize: vertical;
            min-height: 120px;
          }

          .status-message {
            padding: 16px;
            border-radius: 8px;
            font-size: 0.9375rem;
            text-align: center;
          }

          .status-message.success {
            background: rgba(0, 255, 102, 0.1);
            border: 1px solid rgba(0, 255, 102, 0.3);
            color: #00FF66;
          }

          .status-message.error {
            background: rgba(255, 68, 68, 0.1);
            border: 1px solid rgba(255, 68, 68, 0.3);
            color: #FF4444;
          }

          @media (max-width: 768px) {
            .form-container {
              padding: 32px 24px;
            }

            .form-row {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </section>

      {/* Map Section */}
      <section style={{padding: '0 0 100px'}}>
        <div className="container">
          <div className="map-placeholder">
            <div className="map-content">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" strokeWidth="2"/>
              </svg>
              <h3>Find Us Here</h3>
              <p>123 Main Street, Your City, ST 12345</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .map-placeholder {
            width: 100%;
            height: 400px;
            background: linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%);
            border: 1px solid #2A2A2A;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .map-content {
            text-align: center;
            color: #606060;
          }

          .map-content svg {
            margin-bottom: 16px;
            opacity: 0.5;
          }

          .map-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #A0A0A0;
            margin: 0 0 8px 0;
          }

          .map-content p {
            color: #808080;
            margin: 0;
          }

          @media (max-width: 768px) {
            .map-placeholder {
              height: 300px;
            }
          }
        `}</style>
      </section>
    </main>
  );
}
