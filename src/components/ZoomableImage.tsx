import { useEffect, useState } from 'react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

export default function ZoomableImage({
  src,
  alt,
  className = 'w-full h-full object-contain',
  containerClassName = 'rounded-xl overflow-hidden',
  containerStyle,
  imgStyle,
}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(false);

  const handleClose = () => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!isZoomed) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isZoomed]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !isZoomed) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    e.preventDefault();
    const newZoom = Math.max(1, Math.min(4, zoomLevel * (e.deltaY > 0 ? 0.9 : 1.1)));
    setZoomLevel(newZoom);
  };

  if (isZoomed) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.88)' }}
        onClick={handleClose}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="dialog"
        aria-modal="true"
        aria-label="Zoomed image viewer"
      >
        {/* Zoom controls */}
        <div className="absolute top-5 left-5 flex gap-2 z-10" onClick={e => e.stopPropagation()}>
          {[
            { label: '+', title: 'Zoom in', action: () => setZoomLevel(z => Math.min(4, z + 0.5)), icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
            { label: '−', title: 'Zoom out', action: () => setZoomLevel(z => Math.max(1, z - 0.5)), icon: 'M20 12H4' },
            { label: '↺', title: 'Reset', action: () => { setZoomLevel(1); setPosition({ x: 0, y: 0 }); }, icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
          ].map(({ title, action, icon }) => (
            <button
              key={title}
              onClick={action}
              title={title}
              aria-label={title}
              className="p-2 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
            </button>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-lg z-10 transition-colors"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
          title="Close (Esc)"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ width: '90vw', height: '88vh', cursor: isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'default' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onClick={e => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
              transformOrigin: 'center',
              transition: isDragging ? 'none' : 'transform 0.2s',
            }}
            draggable={false}
          />
        </div>

        {/* Zoom % */}
        <div
          className="absolute bottom-5 left-5 px-3 py-1.5 rounded-lg text-xs font-mono"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.7)' }}
        >
          {Math.round(zoomLevel * 100)}%
        </div>

        {/* ESC hint */}
        <div
          className="absolute bottom-5 right-5 px-3 py-1.5 rounded-lg text-xs font-mono"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.5)' }}
        >
          Esc to close
        </div>
      </div>
    );
  }

  return (
    <div
      className={containerClassName}
      onClick={() => setIsZoomed(true)}
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
      style={{
        position: 'relative',
        cursor: 'zoom-in',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.15s',
        ...containerStyle,
      }}
    >
      <img src={src} alt={alt} className={className} style={imgStyle} loading="lazy" />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{ background: 'rgba(0,0,0,0.18)', opacity: showHint ? 1 : 0 }}
      />

      {/* Zoom hint badge */}
      <div
        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg pointer-events-none transition-opacity duration-200"
        style={{
          background: 'rgba(13,13,15,0.8)',
          backdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(255,255,255,0.12)',
          opacity: showHint ? 1 : 0,
        }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>zoom</span>
      </div>
    </div>
  );
}
