import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let frame;
    let currentTrail = { x: -100, y: -100 };

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      setTrail(prev => {
        const next = {
          x: prev.x + (pos.x - prev.x) * 0.1,
          y: prev.y + (pos.y - prev.y) * 0.1,
        };
        currentTrail = next;
        return next;
      });
      frame = requestAnimationFrame(animate);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onHover = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(true);
      else setHovering(false);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', onHover);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', onHover);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(frame);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: pos.x - 6,
          top: pos.y - 6,
          width: clicking ? 8 : 12,
          height: clicking ? 8 : 12,
          background: '#00FF94',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.1s, height 0.1s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: trail.x - (hovering ? 20 : 16),
          top: trail.y - (hovering ? 20 : 16),
          width: hovering ? 40 : 32,
          height: hovering ? 40 : 32,
          border: '1px solid rgba(0,255,148,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </>
  );
}
