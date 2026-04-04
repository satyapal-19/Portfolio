import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function StatCard({ value, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = value / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 20);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="glass-card" style={{
      padding: '1.5rem',
      borderRadius: 8,
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'Clash Display, sans-serif',
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'var(--accent)',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.72rem',
        color: 'var(--text-secondary)',
        letterSpacing: '0.1em',
        marginTop: '0.25rem',
      }}>
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const { theme } = useTheme();
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
          marginBottom: '4rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <p className="section-label">// who am i</p>
          <h2 className="section-title">About <span className="text-accent">Me</span></h2>
        </div>

        {/* Grid: Text + Code Block */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}>
          {/* Left: Text */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            <p style={{
              fontFamily: 'Cabinet Grotesk, sans-serif',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
            }}>
              I'm <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Satyapal Gaikwad</span>, a Computer Science undergraduate at{' '}
              <span style={{ color: 'var(--accent)' }}>Walchand College of Engineering, Sangli</span> (2024–2028), maintaining a CGPA of{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>8.54</span>.
            </p>
            <p style={{
              fontFamily: 'Cabinet Grotesk, sans-serif',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
            }}>
              My focus lies in <span style={{ color: 'var(--text-primary)' }}>backend engineering</span> and{' '}
              <span style={{ color: 'var(--text-primary)' }}>Data Structures & Algorithms</span>. I love building systems
              that are clean, efficient, and scalable — from REST APIs to full-stack applications.
            </p>
            <p style={{
              fontFamily: 'Cabinet Grotesk, sans-serif',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
            }}>
              I've had hands-on exposure to <span style={{ color: 'var(--text-primary)' }}>cybersecurity</span> through my internship at
              CDAC Noida, where I worked on network threat detection using Security Onion, Zeek, and Suricata.
              Outside tech, I'm an avid problem-solver with 400+ coding challenges conquered on LeetCode and CodeChef.
            </p>

            {/* Education Timeline */}
            <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
              <div className="timeline-line" />
              {[
                { year: '2024–2028', degree: 'B.Tech CSE', inst: 'WCE, Sangli', grade: 'CGPA: 8.54' },
                { year: '2024', degree: 'HSC', inst: 'Progress Junior College, Pandharpur', grade: '77.33%' },
                { year: '2022', degree: 'CBSE X', inst: 'Sinhgad Public School, Pandharpur', grade: '95%' },
              ].map((e, i) => (
                <div key={i} style={{ marginBottom: '1.5rem', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-1.75rem',
                    top: '0.25rem',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 8px var(--accent)',
                  }} />
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)', marginBottom: '0.2rem' }}>
                    {e.year}
                  </div>
                  <div style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {e.degree}
                  </div>
                  <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {e.inst} · <span style={{ color: 'var(--accent)' }}>{e.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code Block */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.4s',
          }}>
            <div className="glass-card" style={{
              borderRadius: 12,
              overflow: 'hidden',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.82rem',
            }}>
              {/* Terminal header */}
              <div style={{
                padding: '0.75rem 1rem',
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
                <span style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>satyapal.js</span>
              </div>
              {/* Code content */}
              <div style={{ padding: '1.5rem', lineHeight: 1.9 }}>
                <div><span style={{ color: '#BD00FF' }}>const</span> <span style={{ color: '#00D4FF' }}>satyapal</span> <span style={{ color: 'var(--text-secondary)' }}>=</span> <span style={{ color: 'var(--text-secondary)' }}>{'{'}</span></div>
                <div style={{ paddingLeft: '1.5rem' }}>
                  <div><span style={{ color: '#00FF94' }}>name</span><span style={{ color: 'var(--text-secondary)' }}>:</span> <span style={{ color: '#FFB86C' }}>"Satyapal Gaikwad"</span><span style={{ color: 'var(--text-secondary)' }}>,</span></div>
                  <div><span style={{ color: '#00FF94' }}>role</span><span style={{ color: 'var(--text-secondary)' }}>:</span> <span style={{ color: '#FFB86C' }}>"Backend Developer"</span><span style={{ color: 'var(--text-secondary)' }}>,</span></div>
                  <div><span style={{ color: '#00FF94' }}>location</span><span style={{ color: 'var(--text-secondary)' }}>:</span> <span style={{ color: '#FFB86C' }}>"Pandharpur, MH"</span><span style={{ color: 'var(--text-secondary)' }}>,</span></div>
                  <div><span style={{ color: '#00FF94' }}>college</span><span style={{ color: 'var(--text-secondary)' }}>:</span> <span style={{ color: '#FFB86C' }}>"WCE Sangli"</span><span style={{ color: 'var(--text-secondary)' }}>,</span></div>
                  <div><span style={{ color: '#00FF94' }}>cgpa</span><span style={{ color: 'var(--text-secondary)' }}>:</span> <span style={{ color: '#FF79C6' }}>8.54</span><span style={{ color: 'var(--text-secondary)' }}>,</span></div>
                  <div><span style={{ color: '#00FF94' }}>skills</span><span style={{ color: 'var(--text-secondary)' }}>: [</span></div>
                  <div style={{ paddingLeft: '1.5rem' }}>
                    {['"C++"', '"JavaScript"', '"Node.js"', '"DSA"', '"MongoDB"'].map((s, i, arr) => (
                      <div key={s}><span style={{ color: '#FFB86C' }}>{s}</span><span style={{ color: 'var(--text-secondary)' }}>{i < arr.length - 1 ? ',' : ''}</span></div>
                    ))}
                  </div>
                  <div><span style={{ color: 'var(--text-secondary)' }}>],</span></div>
                  <div><span style={{ color: '#00FF94' }}>leetcode</span><span style={{ color: 'var(--text-secondary)' }}>:</span> <span style={{ color: '#FF79C6' }}>400</span><span style={{ color: 'var(--text-secondary)' }}>{' + ' + '"problems solved"'}</span><span style={{ color: 'var(--text-secondary)' }}>,</span></div>
                  <div><span style={{ color: '#00FF94' }}>available</span><span style={{ color: 'var(--text-secondary)' }}>:</span> <span style={{ color: '#FF79C6' }}>true</span></div>
                </div>
                <div><span style={{ color: 'var(--text-secondary)' }}>{'}'}</span><span style={{ color: 'var(--text-secondary)' }}>;</span></div>
                <div style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: '#6272A4' }}>// Let's build something great!</span>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span style={{ color: '#00D4FF' }}>console</span>
                  <span style={{ color: 'var(--text-secondary)' }}>.</span>
                  <span style={{ color: '#50FA7B' }}>log</span>
                  <span style={{ color: 'var(--text-secondary)' }}>(</span>
                  <span style={{ color: '#FFB86C' }}>"Hire me 🚀"</span>
                  <span style={{ color: 'var(--text-secondary)' }}>);</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.6s',
        }}>
          <StatCard value={8} suffix=".54" label="CGPA" />
          <StatCard value={400} suffix="+" label="Problems Solved" />
          <StatCard value={2} label="Projects Built" />
          <StatCard value={1} label="Internship" />
          <StatCard value={95} suffix="%" label="CBSE X Score" />
        </div>
      </div>
    </div>
  );
}
