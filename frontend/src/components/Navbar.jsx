import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: ' home', href: '#home' },
  { label: ' about', href: '#about' },
  { label: ' skills', href: '#skills' },
  { label: ' projects', href: '#projects' },
  { label: ' experience', href: '#experience' },
  { label: ' contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
        background: scrolled ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <a
        onClick={() => handleNav('#home')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
        }}>
          &lt;
        </span>
        <span style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--accent)',
        }}>
          SG
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
        }}>
          /&gt;
        </span>
      </a>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
        {navItems.map(item => (
          <a
            key={item.href}
            onClick={() => handleNav(item.href)}
            className={`nav-link ${active === item.href ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            {item.label}
          </a>
        ))}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          data-hover
          style={{
            width: 44,
            height: 24,
            borderRadius: 999,
            background: theme === 'dark' ? 'rgba(0,255,148,0.15)' : 'rgba(0,0,0,0.1)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ position: 'absolute', left: 6, fontSize: 12 }}>🌙</span>
          <span style={{ position: 'absolute', right: 6, fontSize: 12 }}>☀️</span>
          <div style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--accent)',
            position: 'absolute',
            transition: 'left 0.3s cubic-bezier(0.22,1,0.36,1)',
            left: theme === 'dark' ? 2 : 22,
            boxShadow: '0 0 8px rgba(0,255,148,0.6)',
          }} />
        </button>

        {/* Resume Button */}
        <a
          href="https://drive.google.com/file/d/your-resume-link"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
          style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem' }}
        >
          Resume ↗
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          padding: '0.5rem',
        }}
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 24,
            height: 2,
            background: 'var(--accent)',
            borderRadius: 1,
            display: 'block',
            transition: 'all 0.3s',
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
              : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
              : 'scaleX(0)'
              : 'none',
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '1rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backdropFilter: 'blur(20px)',
        }}>
          {navItems.map(item => (
            <a
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="nav-link"
              style={{ cursor: 'pointer', fontSize: '0.9rem' }}
            >
              {item.label}
            </a>
          ))}
          <button onClick={toggleTheme} style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            padding: '0.4rem 1rem',
            borderRadius: 4,
            cursor: 'pointer',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
          }}>
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </nav>
  );
}
