import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function RobotPath() {
  const robotRef = useRef<HTMLImageElement>(null);
  const pathRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!robotRef.current || !pathRef.current) return;

    const setupAnimation = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      gsap.to(robotRef.current, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0,
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress;

            gsap.set(robotRef.current, {
              rotation: progress * 720,
              opacity: 0.7 + progress * 0.3,
            });
          },
        },
        motionPath: {
          path: '#robot-path',
          align: '#robot-path',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 1,
      });
    };

    setTimeout(setupAnimation, 50);
  }, []);

  return (
    <>
      {/* Invisible SVG path for motion tracking */}
      <svg
        ref={pathRef}
        width="100%"
        height="100%"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          display: 'none',
        }}
        viewBox="0 0 400 3000"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="robot-path"
            d="M 368 0 Q 368 150 350 300 Q 340 450 365 600 Q 375 750 355 900 Q 345 1050 360 1200 Q 370 1350 350 1500 Q 340 1650 365 1800 Q 375 1950 355 2100 Q 345 2250 360 2400 Q 368 2550 368 2800 L 368 3000"
            fill="none"
          />
        </defs>
      </svg>

      {/* Robot Image */}
      <img
        ref={robotRef}
        src="/Friendly_Robot_Head-Photoroom.png"
        alt="robot mascot"
        style={{
          position: 'fixed',
          top: 0,
          right: '32px',
          width: '120px',
          height: 'auto',
          transform: 'translateY(160px)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 40,
          objectFit: 'contain',
          willChange: 'transform',
        }}
      />
    </>
  );
}
