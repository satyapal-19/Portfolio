import { useEffect, useRef, useState } from 'react';

const experiences = [
  {
    role: 'Cybersecurity Intern',
    company: 'CDAC — Centre for Development of Advanced Computing',
    location: 'Noida, India',
    duration: 'June 2025 – July 2025',
    type: 'Internship',
    color: '#00FF94',
    icon: '🛡️',
    description: 'Worked on network security monitoring and threat detection at one of India\'s premier government R&D institutions.',
    responsibilities: [
      'Monitored network traffic and identified threats using Security Onion',
      'Performed log analysis through Elastic Agent, Zeek, and Suricata',
      'Analyzed suspicious traffic patterns in simulated attack scenarios',
      'Gained hands-on experience with SIEM dashboards via Kibana',
      'Documented findings and prepared threat assessment reports',
    ],
    tools: ['Security Onion', 'Elastic Agent', 'Zeek', 'Suricata', 'Kibana', 'Wireshark'],
  },
];

const hackathons = [
  {
    name: 'WCE Hackathon',
    project: 'TrustVault',
    description: 'Built a secure escrow-based payment system for safe buyer-seller transactions in a time-constrained team hackathon.',
    color: '#00D4FF',
    icon: '⚡',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('work');

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: '6rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 900, width: '100%' }}>
        {/* Header */}
        <div style={{
          marginBottom: '3rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.8s ease',
        }}>
          <p className="section-label">// journey so far</p>
          <h2 className="section-title">Experience & <span className="text-accent">Achievements</span></h2>
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2.5rem',
          padding: '0.25rem',
          background: 'var(--bg-secondary)',
          borderRadius: 8,
          width: 'fit-content',
          border: '1px solid var(--border)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s',
        }}>
          {[
            { id: 'work', label: 'Work' },
            { id: 'hackathons', label: 'Hackathons' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-hover
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 6,
                border: 'none',
                background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                color: activeTab === tab.id ? '#050508' : 'var(--text-secondary)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 700 : 400,
                transition: 'all 0.3s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Work Experience */}
        {activeTab === 'work' && (
          <div>
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  borderRadius: 16,
                  padding: '2rem',
                  borderLeft: `3px solid ${exp.color}`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `all 0.8s ease ${i * 0.2}s`,
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: 12,
                      background: `${exp.color}15`,
                      border: `1px solid ${exp.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}>
                      {exp.icon}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        {exp.role}
                      </h3>
                      <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1rem', color: exp.color, fontWeight: 600 }}>
                        {exp.company}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      {exp.duration}
                    </div>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.5rem',
                      background: `${exp.color}15`,
                      border: `1px solid ${exp.color}33`,
                      borderRadius: 999,
                      color: exp.color,
                    }}>
                      {exp.type}
                    </div>
                  </div>
                </div>

                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  📍 {exp.location}
                </div>

                <p style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: '1.5rem' }}>
                  {exp.responsibilities.map(r => (
                    <li key={r} style={{
                      fontFamily: 'Cabinet Grotesk, sans-serif',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      padding: '0.3rem 0',
                      paddingLeft: '1.25rem',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: exp.color,
                        fontWeight: 700,
                      }}>→</span>
                      {r}
                    </li>
                  ))}
                </ul>

                {/* Tools */}
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                    TOOLS USED
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {exp.tools.map(t => (
                      <span key={t} style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.6rem',
                        border: `1px solid ${exp.color}33`,
                        borderRadius: 4,
                        color: exp.color,
                        background: `${exp.color}08`,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hackathons */}
        {activeTab === 'hackathons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {hackathons.map((h, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  borderRadius: 16,
                  padding: '2rem',
                  borderLeft: `3px solid ${h.color}`,
                  opacity: visible ? 1 : 0,
                  transition: `all 0.8s ease ${i * 0.2}s`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 12,
                    background: `${h.color}15`, border: `1px solid ${h.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                  }}>
                    {h.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{h.name}</h3>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: h.color }}>Project: {h.project}</div>
                  </div>
                </div>
                <p style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {h.description}
                </p>
              </div>
            ))}

            {/* More coming */}
            <div style={{
              padding: '1.5rem',
              borderRadius: 12,
              border: '1px dashed var(--border)',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
            }}>
              More achievements coming soon...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
