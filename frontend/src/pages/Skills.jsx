import { useEffect, useRef, useState } from 'react';

const skillGroups = [
  {
    category: 'Languages',
    icon: '{ }',
    skills: [
      { name: 'C++', level: 85, color: '#00D4FF' },
      { name: 'JavaScript', level: 80, color: '#00FF94' },
      { name: 'HTML/CSS', level: 78, color: '#BD00FF' },
    ],
  },
  {
    category: 'Core CS',
    icon: '⚙',
    skills: [
      { name: 'Data Structures & Algorithms', level: 85, color: '#00FF94' },
      { name: 'Object Oriented Programming', level: 82, color: '#00D4FF' },
      { name: 'Operating Systems', level: 75, color: '#BD00FF' },
      { name: 'Database Management', level: 78, color: '#FF79C6' },
    ],
  },
  {
    category: 'Development',
    icon: '◈',
    skills: [
      { name: 'Node.js / Express', level: 80, color: '#00FF94' },
      { name: 'REST API Design', level: 78, color: '#00D4FF' },
      { name: 'Backend Architecture', level: 72, color: '#BD00FF' },
    ],
  },
  {
    category: 'Database & Tools',
    icon: '◉',
    skills: [
      { name: 'MySQL', level: 78, color: '#00D4FF' },
      { name: 'MongoDB', level: 75, color: '#00FF94' },
      { name: 'Git & GitHub', level: 82, color: '#BD00FF' },
      { name: 'VS Code / Linux', level: 80, color: '#FF79C6' },
    ],
  },
];

const techIcons = [
  { name: 'C++', bg: '#00D4FF22', color: '#00D4FF' },
  { name: 'JS', bg: '#F7DF1E22', color: '#F7DF1E' },
  { name: 'Node.js', bg: '#00FF9422', color: '#00FF94' },
  { name: 'Express', bg: '#ffffff11', color: '#cccccc' },
  { name: 'MySQL', bg: '#4479A122', color: '#4479A1' },
  { name: 'MongoDB', bg: '#47A24822', color: '#47A248' },
  { name: 'Git', bg: '#F0503122', color: '#F05031' },
  { name: 'Linux', bg: '#FCC62422', color: '#FCC624' },
  { name: 'Security Onion', bg: '#00FF9411', color: '#00FF94' },
  { name: 'Kibana', bg: '#BD00FF22', color: '#BD00FF' },
];

function SkillBar({ name, level, color, visible }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
          {name}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color }}>
          {level}%
        </span>
      </div>
      <div style={{
        height: 3,
        background: 'var(--border)',
        borderRadius: 999,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: visible ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: 999,
          boxShadow: `0 0 8px ${color}66`,
          transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
      <div style={{ maxWidth: 1100, width: '100%' }}>

        {/* Header */}
        <div style={{
          marginBottom: '4rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <p className="section-label">// what i know</p>
          <h2 className="section-title">Technical <span className="text-accent">Skills</span></h2>
        </div>

        {/* Skill Groups Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem',
        }}>
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className="glass-card"
              style={{
                borderRadius: 12,
                padding: '1.75rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s ease ${gi * 0.15}s`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(0,255,148,0.1)',
                  border: '1px solid rgba(0,255,148,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: 'var(--accent)',
                }}>
                  {group.icon}
                </div>
                <h3 style={{
                  fontFamily: 'Clash Display, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}>
                  {group.category}
                </h3>
              </div>
              {group.skills.map(skill => (
                <SkillBar key={skill.name} {...skill} visible={visible} />
              ))}
            </div>
          ))}
        </div>

        {/* Tech Cloud */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.6s',
        }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.25rem',
            letterSpacing: '0.15em',
          }}>
            // TOOLS & TECHNOLOGIES
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {techIcons.map(t => (
              <div
                key={t.name}
                data-hover
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: 6,
                  background: t.bg,
                  border: `1px solid ${t.color}33`,
                  color: t.color,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'default',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 4px 20px ${t.color}33`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {t.name}
              </div>
            ))}
          </div>
        </div>

        {/* Cybersecurity skills note */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          borderRadius: 12,
          border: '1px solid rgba(0,255,148,0.2)',
          background: 'rgba(0,255,148,0.03)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.8s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🛡️</span>
            <span style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Cybersecurity Toolkit
            </span>
          </div>
          <p style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Hands-on experience with <span style={{ color: 'var(--accent)' }}>Security Onion</span>, <span style={{ color: 'var(--accent)' }}>Elastic Agent</span>, <span style={{ color: 'var(--accent)' }}>Zeek</span>, <span style={{ color: 'var(--accent)' }}>Suricata</span>, and <span style={{ color: 'var(--accent)' }}>Kibana</span> for network monitoring, log analysis, and simulated attack scenario detection — gained during internship at CDAC Noida.
          </p>
        </div>
      </div>
    </div>
  );
}
