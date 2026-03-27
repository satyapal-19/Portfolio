export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 2rem',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>&lt;</span>
          <span style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>SG</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>/&gt;</span>
        </div>

        {/* Copyright */}
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem',
          color: 'var(--text-secondary)',
          textAlign: 'center',
        }}>
          © {year} Satyapal Gaikwad — Designed & Built with ❤️
        </p>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/satyapal-19' },
            { label: 'LinkedIn', href: 'http://www.linkedin.com/in/satyapal-gaikwad' },
            { label: 'LeetCode', href: 'https://leetcode.com/u/SatyapalRGaikwad/' },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
