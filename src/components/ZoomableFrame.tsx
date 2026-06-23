import { useEffect, useRef, useState } from 'react';

interface ZoomableFrameProps {
  src: string;
  label: string;
  accent?: string;
  frameWidth?: number;
  frameHeight?: number;
  thumbWidth?: number;
}

export default function ZoomableFrame({
  src,
  label,
  accent = '#6C7BF5',
  frameWidth = 390,
  frameHeight = 844,
  thumbWidth = 160,
}: ZoomableFrameProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Mount iframe only when card scrolls near viewport
  useEffect(() => {
    if (isMounted) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsMounted(true); },
      { rootMargin: '500px' }
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [isMounted]);

  // Esc to close lightbox
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Show full frame at natural aspect ratio
  const scale = thumbWidth / frameWidth;
  const thumbH = Math.round(frameHeight * scale);

  return (
    <>
      <div
        ref={rootRef}
        style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={`View ${label}`}
          style={{
            position: 'relative',
            width: `${thumbWidth}px`,
            height: `${thumbH}px`,
            cursor: 'zoom-in',
            borderRadius: '18px',
            overflow: 'hidden',
            background: '#12121A',
            border: `1.5px solid ${hovered ? accent : 'rgba(255,255,255,0.08)'}`,
            boxShadow: hovered ? `0 12px 40px ${accent}44` : '0 4px 20px rgba(0,0,0,0.4)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            padding: 0,
          }}
        >
          {/* Actual iframe — only renders when near viewport */}
          {isMounted && (
            <iframe
              src={src}
              title={label}
              scrolling="no"
              tabIndex={-1}
              style={{
                width: `${frameWidth}px`,
                height: `${frameHeight}px`,
                border: 'none',
                display: 'block',
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Loading shimmer shown before iframe mounts */}
          {!isMounted && (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }} />
          )}

          {/* Click-capture overlay + hover badge */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: hovered ? 'rgba(0,0,0,0.3)' : 'transparent',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {hovered && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 11px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.75)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${accent}44`,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>zoom</span>
              </div>
            )}
          </div>
        </button>

        <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--color-text-muted, rgba(255,255,255,0.4))', letterSpacing: '0.04em', textAlign: 'center' }}>
          {label}
        </span>
      </div>

      {/* Lightbox — iframe only mounts when open */}
      {isOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — full view`}
        >
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              border: 'none', borderRadius: '8px', padding: '8px',
              cursor: 'pointer', color: 'white', lineHeight: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {(() => {
            const maxH = Math.min(frameHeight, window.innerHeight * 0.88);
            const maxW = Math.min(frameWidth, window.innerWidth * 0.92);
            const fitScale = Math.min(maxH / frameHeight, maxW / frameWidth);
            return (
              <div
                style={{
                  width: `${frameWidth * fitScale}px`,
                  height: `${frameHeight * fitScale}px`,
                  background: '#1C1C1E',
                  border: '6px solid #2C2C2E',
                  borderRadius: '40px',
                  overflow: 'hidden',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
                  position: 'relative',
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Notch */}
                <div style={{
                  position: 'absolute', top: '8px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '96px', height: '24px',
                  background: '#1C1C1E', borderRadius: '0 0 18px 18px',
                  zIndex: 10,
                }} />
                <iframe
                  src={src}
                  title={label}
                  scrolling="no"
                  style={{
                    width: `${frameWidth}px`,
                    height: `${frameHeight}px`,
                    border: 'none',
                    display: 'block',
                    transform: `scale(${fitScale})`,
                    transformOrigin: 'top left',
                  }}
                />
              </div>
            );
          })()}

          <div
            style={{
              position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
              borderRadius: '8px', padding: '6px 14px',
              display: 'flex', gap: '10px', alignItems: 'center',
              color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontFamily: 'monospace',
            }}
          >
            <span>{label}</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <span>Esc to close</span>
          </div>
        </div>
      )}
    </>
  );
}
