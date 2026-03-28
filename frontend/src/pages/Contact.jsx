import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { contactSubmitUrl } from '../api/contactEndpoint';

const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/satyapal-gaikwad';

const contactInfo = [
  { icon: '✉', label: 'Email', value: 'satypalgaikwad1234@gmail.com', href: 'mailto:satypalgaikwad1234@gmail.com' },
  { icon: 'in', label: 'LinkedIn', value: 'satyapal-gaikwad', href: LINKEDIN_PROFILE },
  { icon: '⌥', label: 'GitHub', value: 'satyapal-19', href: 'https://github.com/satyapal-19' },
  { icon: '{ }', label: 'LeetCode', value: 'SatyapalRGaikwad', href: 'https://leetcode.com/u/SatyapalRGaikwad/' },
  { icon: '📍', label: 'Location', value: 'Pandharpur, Maharashtra, India', href: null },
];

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message too short (min 20 chars)';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fix the errors below');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(contactSubmitUrl, form);
      if (res.data.success) {
        setSent(true);
        setForm(initialForm);
        toast.success(res.data.message || 'Message sent! I\'ll get back to you soon 🚀');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'var(--bg-secondary)',
    border: `1px solid ${errors[field] ? '#FF5F57' : 'var(--border)'}`,
    borderRadius: 8,
    color: 'var(--text-primary)',
    fontFamily: 'Cabinet Grotesk, sans-serif',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  });

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-secondary)',
        padding: '6rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 1100, width: '100%' }}>
        {/* Header */}
        <div style={{
          marginBottom: '4rem',
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.8s ease',
        }}>
          <p className="section-label">// let's connect</p>
          <h2 className="section-title">Get In <span className="text-accent">Touch</span></h2>
          <p style={{
            fontFamily: 'Cabinet Grotesk, sans-serif',
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: 500,
            margin: '1rem auto 0',
            lineHeight: 1.7,
          }}>
            I'm currently open to internships, full-time roles, and interesting collaborations.
            Drop me a message — I respond within 24 hours.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
        }}>
          {/* Left: Contact Info */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            <h3 style={{
              fontFamily: 'Clash Display, sans-serif',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
            }}>
              Contact Info
            </h3>

            <a
              href={LINKEDIN_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                textDecoration: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', opacity: 0.9 }}>in</span>
              Connect me
            </a>

            {contactInfo.map(c => (
              <div key={c.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: 10,
                marginBottom: '0.75rem',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,148,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 8,
                  background: 'rgba(0,255,148,0.08)',
                  border: '1px solid rgba(0,255,148,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.85rem',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                    {c.label.toUpperCase()}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '0.9rem', color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{c.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              borderRadius: 12,
              background: 'rgba(0,255,148,0.05)',
              border: '1px solid rgba(0,255,148,0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', display: 'inline-block', animation: 'ping-slow 2s infinite' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--accent)' }}>
                  AVAILABLE FOR OPPORTUNITIES
                </span>
              </div>
              <p style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Open to SDE internships, backend roles, and collaborative projects starting 2025.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.4s',
          }}>
            {sent ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                borderRadius: 16,
                border: '1px solid rgba(0,255,148,0.3)',
                background: 'rgba(0,255,148,0.03)',
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
                <h3 style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '0.75rem' }}>
                  Message Sent!
                </h3>
                <p style={{ fontFamily: 'Cabinet Grotesk, sans-serif', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Thanks for reaching out! I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-outline"
                  style={{ marginTop: '2rem', cursor: 'pointer' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="glass-card" style={{ borderRadius: 16, padding: '2rem' }}>
                  <h3 style={{
                    fontFamily: 'Clash Display, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '1.5rem',
                  }}>
                    Send a Message
                  </h3>

                  {/* Name + Email row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    {['name', 'email'].map(field => (
                      <div key={field}>
                        <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>
                          {field.toUpperCase()} *
                        </label>
                        <input
                          name={field}
                          type={field === 'email' ? 'email' : 'text'}
                          value={form[field]}
                          onChange={handleChange}
                          placeholder={field === 'name' ? 'Your Name' : 'your@email.com'}
                          style={inputStyle(field)}
                          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,255,148,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = errors[field] ? '#FF5F57' : 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                        />
                        {errors[field] && <p style={{ color: '#FF5F57', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', marginTop: '0.25rem' }}>{errors[field]}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Subject */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>
                      SUBJECT *
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      style={inputStyle('subject')}
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,255,148,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = errors.subject ? '#FF5F57' : 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                    {errors.subject && <p style={{ color: '#FF5F57', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', marginTop: '0.25rem' }}>{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>
                      MESSAGE *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the opportunity, project, or just say hi!"
                      rows={6}
                      style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,255,148,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = errors.message ? '#FF5F57' : 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                      {errors.message
                        ? <p style={{ color: '#FF5F57', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem' }}>{errors.message}</p>
                        : <span />
                      }
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                        {form.message.length}/2000
                      </span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-accent"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      fontSize: '0.95rem',
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{
                          width: 16, height: 16,
                          border: '2px solid #05050844',
                          borderTopColor: '#050508',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                          display: 'inline-block',
                        }} />
                        Sending...
                      </>
                    ) : (
                      <>Send Message →</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ping-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}
