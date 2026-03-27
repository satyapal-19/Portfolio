import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'YouTube Clone',
    status: 'In Progress',
    statusColor: '#FFB86C',
    description: 'A full-featured video platform inspired by YouTube. Includes video upload, playback, user authentication, subscriptions, and content management system built with a robust Node.js/Express backend.',
    longDesc: 'Building a production-grade video streaming platform with complete user management, JWT-based auth, Cloudinary integration for media storage, and a RESTful API architecture following MVC patterns.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Cloudinary', 'JWT', 'REST API'],
    features: [
      'Video upload & streaming with Cloudinary',
      'User authentication (JWT + Refresh tokens)',
      'Content management & user interactions',
      'Channel subscriptions system',
    ],
    github: 'https://github.com/satyapal-19',
    live: null,
    gradient: 'linear-gradient(135deg, #FF0000 0%, #FF6B6B 100%)',
    icon: '▶',
    featured: true,
  },
  {
    id: 2,
    title: 'TrustVault',
    status: 'Completed',
    statusColor: '#00FF94',
    description: 'Secure escrow-based payment system developed for WCE Hackathon. Enables safe transactions between buyers and sellers with funds held in escrow until conditions are met.',
    longDesc: 'Team project showcasing collaborative development with Git version control. Built a backend-focused escrow payment architecture with clear transaction state management.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Git', 'REST API'],
    features: [
      'Escrow payment logic with state machine',
      'Secure transaction workflows',
      'Team collaboration via Git branching',
      'RESTful API for payment operations',
    ],
    github: 'https://github.com/satyapal-19',
    live: null,
    gradient: 'linear-gradient(135deg, #00FF94 0%, #00D4FF 100%)',
    icon: '🔒',
    featured: true,
  },
];

function ProjectCard({ project, index, visible }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass-card"
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s ease ${index * 0.2}s`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Card Top Banner */}
      <div style={{
        height: 6,
        background: project.gradient,
      }} />

      <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              {project.icon}
            </div>
            <div>
              <h3 style={{
                fontFamily: 'Clash Display, sans-serif',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}>
                {project.title}
              </h3>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                padding: '0.15rem 0.5rem',
                borderRadius: 999,
                background: `${project.statusColor}22`,
                color: project.statusColor,
                border: `1px solid ${project.statusColor}44`,
              }}>
                ● {project.status}
              </span>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              style={{
                width: 36, height: 36,
                borderRadius: 8,
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'all 0.3s',
                background: 'var(--bg-secondary)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              title="GitHub"
            >
              ⌥
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" data-hover style={{
                width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem',
                transition: 'all 0.3s', background: 'var(--bg-secondary)',
              }}>↗</a>
            )}
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Cabinet Grotesk, sans-serif',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          marginBottom: '1.25rem',
          flex: 1,
        }}>
          {expanded ? project.longDesc : project.description}
        </p>

        {/* Features */}
        {expanded && (
          <ul style={{ marginBottom: '1.25rem', paddingLeft: 0, listStyle: 'none' }}>
            {project.features.map(f => (
              <li key={f} style={{
                fontFamily: 'Cabinet Grotesk, sans-serif',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                padding: '0.25rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>→</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              padding: '0.2rem 0.6rem',
              border: '1px solid var(--border)',
              borderRadius: 4,
              color: 'var(--text-secondary)',
              background: 'var(--bg-secondary)',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          data-hover
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            color: 'var(--accent)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            padding: '0.4rem 0.8rem',
            borderRadius: 4,
            cursor: 'pointer',
            alignSelf: 'flex-start',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,148,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
        >
          {expanded ? '− Show less' : '+ Show more'}
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
          flexWrap: 'wrap',
          gap: '1rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.8s ease',
        }}>
          <div>
            <p className="section-label">// what i've built</p>
            <h2 className="section-title">Featured <span className="text-accent">Projects</span></h2>
          </div>
          <a
            href="https://github.com/satyapal-19"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
          >
            All Repos ↗
          </a>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* LeetCode Stats */}
        <div style={{
          padding: '2rem',
          borderRadius: 16,
          border: '1px solid rgba(255,184,108,0.2)',
          background: 'rgba(255,184,108,0.03)',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.6s',
        }}>
          <div style={{ fontSize: '2rem' }}>🧩</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Problem Solving — LeetCode & CodeChef
            </div>
            <p style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              300+ problems solved covering Arrays, Strings, Binary Search, Recursion, Greedy algorithms, and more.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { label: 'LeetCode', href: 'https://leetcode.com/u/SatyapalRGaikwad/' },
              { label: 'CodeChef', href: '#' },
            ].map(p => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
              >
                {p.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
