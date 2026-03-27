import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ROLES = [
  'Backend Developer',
  'Problem Solver',
  'CS Undergrad @ WCE',
  'Cybersecurity Enthusiast',
  'DSA Practitioner',
  'Full Stack Builder',
];

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x -= dx * 0.02;
          p.y -= dy * 0.02;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,148,${p.opacity})`;
        ctx.fill();

        particles.slice(i + 1).forEach(p2 => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,255,148,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: 'none',
      }}
    />
  );
}

function TypewriterText({ words }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex(i => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  return (
    <span>
      <span style={{ color: 'var(--accent)' }}>{displayed}</span>
      <span className="cursor-blink" style={{ color: 'var(--accent)', marginLeft: 2 }}>|</span>
    </span>
  );
}

function FloatingOrb({ size, color, top, left, delay, duration = '6s' }) {
  return (
    <div style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      top,
      left,
      filter: 'blur(80px)',
      opacity: 0.15,
      animation: `float ${duration} ease-in-out ${delay} infinite`,
      pointerEvents: 'none',
    }} />
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--bg-primary)',
    }} className={theme === 'dark' ? 'grid-bg-dark' : 'grid-bg-light'}>

      <Particles />

      {/* Ambient Orbs */}
      <FloatingOrb size="600px" color="#00FF94" top="-10%" left="-15%" delay="0s" duration="8s" />
      <FloatingOrb size="500px" color="#00D4FF" top="30%" left="70%" delay="2s" duration="10s" />
      <FloatingOrb size="400px" color="#BD00FF" top="60%" left="20%" delay="4s" duration="7s" />

      {/* Center Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: 900,
        padding: '0 2rem',
        marginTop: '4rem',
      }}>

        {/* Greeting tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          border: '1px solid rgba(0,255,148,0.3)',
          borderRadius: '999px',
          marginBottom: '1.5rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.1s',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent)',
            animation: 'ping 1.5s ease infinite',
            display: 'inline-block',
          }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--accent)' }}>
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: '0.25rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <span className="shimmer-text">Satyapal</span>
        </h1>
        <h1 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: '1.5rem',
          color: 'var(--text-primary)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.3s',
        }}>
          Gaikwad
        </h1>

        {/* Role Typewriter */}
        <div style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: 500,
          marginBottom: '1.5rem',
          minHeight: '2.4rem',
          color: 'var(--text-secondary)',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s ease 0.5s',
        }}>
          I'm a{' '}<TypewriterText words={ROLES} />
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Cabinet Grotesk, sans-serif',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          maxWidth: 600,
          margin: '0 auto 2.5rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.6s',
        }}>
          B.Tech CSE student at <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>WCE Sangli</span>, passionate about
          building scalable backends, solving algorithmic challenges, and learning at the intersection of
          security & software engineering.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.7s',
        }}>
          <a
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-accent"
            style={{ cursor: 'pointer' }}
          >
            View Projects →
          </a>
          <a
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
            style={{ cursor: 'pointer' }}
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s ease 0.9s',
        }}>
          {[
            { label: 'GitHub', href: 'https://github.com/satyapal-19', icon: '⌥' },
            { label: 'LinkedIn', href: 'http://www.linkedin.com/in/satyapal-gaikwad', icon: 'in' },
            { label: 'LeetCode', href: 'https://leetcode.com/u/SatyapalRGaikwad/', icon: '{ }' },
            { label: 'Email', href: 'mailto:satypalgaikwad1234@gmail.com', icon: '✉' },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.3s',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <span style={{ fontSize: '1rem', fontWeight: 700 }}>{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>

        {/* Tech Stack badges */}
        <div style={{
          marginTop: '3rem',
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s ease 1s',
        }}>
          {['C++', 'JavaScript', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'Git', 'Linux'].map(tech => (
            <span key={tech} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              padding: '0.2rem 0.75rem',
              border: '1px solid var(--border)',
              borderRadius: 4,
              color: 'var(--text-secondary)',
              background: 'var(--bg-card)',
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        onClick={scrollToAbout}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          opacity: mounted ? 0.6 : 0,
          transition: 'opacity 1s ease 1.2s',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.15em' }}>SCROLL</span>
        <div style={{
          width: 24,
          height: 38,
          border: '1px solid var(--border)',
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 6,
        }}>
          <div style={{
            width: 4,
            height: 8,
            borderRadius: 2,
            background: 'var(--accent)',
            animation: 'float 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
