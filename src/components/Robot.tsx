import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Robot() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;

    const animate = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      gsap.to(img, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 0,
          onUpdate: (self) => {
            const progress = self.progress;
            const y = progress * totalScroll;
            const rotation = progress * 720;
            gsap.set(img, { y, rotation });
          },
        },
      });
    };

    setTimeout(animate, 200);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src="/Friendly_Robot_Head-Photoroom.png"
      alt="robot"
      style={{
        position: 'fixed',
        top: '200px',
        right: '32px',
        width: '140px',
        height: 'auto',
        zIndex: 40,
        pointerEvents: 'none',
        userSelect: 'none',
        willChange: 'transform',
      }}
    />
  );
}
