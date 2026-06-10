import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Item = { title: string; image: string; accent: string };

const items: Item[] = [
  { title: 'Photography',     image: '/My_image.png', accent: '#14B8A6' },
  { title: 'Travel',          image: '/My_image.png', accent: '#F97316' },
  { title: 'Writing',         image: '/My_image.png', accent: '#7F77DD' },
  { title: 'Music',           image: '/My_image.png', accent: '#E8517F' },
  { title: 'Building Things', image: '/My_image.png', accent: '#FFD11A' },
  { title: 'Side Projects',   image: '/My_image.png', accent: '#6C7BF5' },
];

const CONFIG = {
  gap: 0.13,
  speed: 0.18,
  arcRadius: 260,
  totalScrollMultiplier: 10,
  introEnd: 0.20,
  activeStart: 0.25,
  activeEnd: 0.95,
};

export default function BeyondResume() {
  const sectionRef         = useRef<HTMLElement>(null);
  const introWrapperRef    = useRef<HTMLDivElement>(null);
  const introLeftRef       = useRef<HTMLDivElement>(null);
  const introRightRef      = useRef<HTMLDivElement>(null);
  const bgWrapperRef       = useRef<HTMLDivElement>(null);
  const bgItemRefs         = useRef<(HTMLDivElement | null)[]>([]);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const titlesWrapperRef   = useRef<HTMLDivElement>(null);
  const thumbnailRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef          = useRef<HTMLDivElement>(null);
  const currentActiveRef   = useRef<number>(-1);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const computeBezier = () => {
      const w = window.innerWidth * 0.5;
      const h = window.innerHeight;
      return {
        start:   { x: w / 2,                    y: -200 },
        end:     { x: w / 2,                    y: h + 200 },
        control: { x: w / 2 + CONFIG.arcRadius, y: h / 2 },
      };
    };
    type Geo = ReturnType<typeof computeBezier>;
    const bezierAt = (t: number, g: Geo) => {
      const mt = 1 - t;
      return {
        x: mt * mt * g.start.x + 2 * mt * t * g.control.x + t * t * g.end.x,
        y: mt * mt * g.start.y + 2 * mt * t * g.control.y + t * t * g.end.y,
      };
    };
    const imageState = (i: number, p: number) => {
      const s = i * CONFIG.gap;
      const e = s + CONFIG.speed;
      if (p < s) return -1;
      if (p > e) return 2;
      return (p - s) / (e - s);
    };
    const setLineVars = (v: number) => {
      const el = titlesContainerRef.current;
      if (!el) return;
      el.style.setProperty('--line-opacity-top', String(v));
      el.style.setProperty('--line-opacity-bottom', String(v));
    };

    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      let bezier = computeBezier();
      const titleEls = gsap.utils.toArray<HTMLElement>('h2', titlesWrapperRef.current);
      const setTitlesY = gsap.quickSetter(titlesWrapperRef.current, 'y', 'px') as (v: number) => void;
      const thumb = thumbnailRefs.current.map((el) => ({
        x: gsap.quickSetter(el!, 'x', 'px') as (v: number) => void,
        y: gsap.quickSetter(el!, 'y', 'px') as (v: number) => void,
        o: gsap.quickSetter(el!, 'opacity') as (v: number) => void,
      }));

      gsap.set(bgWrapperRef.current, { scale: 0, transformOrigin: 'center center' });
      gsap.set(titlesWrapperRef.current, { y: window.innerHeight });
      gsap.set(headerRef.current, { opacity: 0 });
      thumb.forEach((t) => t.o(0));
      currentActiveRef.current = -1;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * CONFIG.totalScrollMultiplier}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onRefreshInit: () => { bezier = computeBezier(); },
        onUpdate: (self) => {
          const p = self.progress;
          const vh = window.innerHeight;
          const vw = window.innerWidth;

          if (p < CONFIG.introEnd) {
            const a = p / CONFIG.introEnd;
            gsap.set(introLeftRef.current,  { x: -a * vw * 0.6, opacity: 1 });
            gsap.set(introRightRef.current, { x:  a * vw * 0.6, opacity: 1 });
            gsap.set(bgWrapperRef.current,  { scale: a });
            setTitlesY(vh);
            thumb.forEach((t) => t.o(0));
            gsap.set(headerRef.current, { opacity: 0 });
            setLineVars(0);
          } else if (p < CONFIG.activeStart) {
            const a = (p - CONFIG.introEnd) / (CONFIG.activeStart - CONFIG.introEnd);
            gsap.set([introLeftRef.current, introRightRef.current], { opacity: 1 - a });
            gsap.set(bgWrapperRef.current, { scale: 1 });
            setTitlesY(vh);
            thumb.forEach((t) => t.o(0));
            gsap.set(headerRef.current, { opacity: a });
            setLineVars(a);
          } else if (p <= CONFIG.activeEnd) {
            gsap.set([introLeftRef.current, introRightRef.current], { opacity: 0 });
            gsap.set(bgWrapperRef.current, { scale: 1 });
            gsap.set(headerRef.current, { opacity: 1 });
            setLineVars(1);

            const sp = (p - CONFIG.activeStart) / (CONFIG.activeEnd - CONFIG.activeStart);

            const totalH = titlesWrapperRef.current!.offsetHeight;
            setTitlesY(vh - (vh + totalH) * sp);

            items.forEach((_, i) => {
              const s = imageState(i, sp);
              if (s < 0 || s > 1) { thumb[i].o(0); return; }
              const pos = bezierAt(s, bezier);
              thumb[i].x(pos.x - 100);
              thumb[i].y(pos.y - 75);
              thumb[i].o(1);
            });

            const centerY = vh / 2;
            let closest = 0, min = Infinity;
            titleEls.forEach((el, i) => {
              const r = el.getBoundingClientRect();
              const d = Math.abs(r.top + r.height / 2 - centerY);
              if (d < min) { min = d; closest = i; }
            });
            if (closest !== currentActiveRef.current) {
              const prev = currentActiveRef.current;
              if (prev >= 0) {
                gsap.set(titleEls[prev], { opacity: 0.25 });
                gsap.set(bgItemRefs.current[prev], { opacity: 0 });
              }
              gsap.set(titleEls[closest], { opacity: 1 });
              gsap.set(bgItemRefs.current[closest], { opacity: 1 });
              currentActiveRef.current = closest;
            }
          } else {
            gsap.set(headerRef.current, { opacity: 0 });
            setLineVars(0);
          }
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === 'complete') requestAnimationFrame(refresh);
      else window.addEventListener('load', refresh);
      if (document.fonts?.ready) document.fonts.ready.then(refresh);

      return () => {
        window.removeEventListener('load', refresh);
        st.kill();
      };
    });

    mm.add('(max-width: 768px), (prefers-reduced-motion: reduce)', () => {
      const titleEls = gsap.utils.toArray<HTMLElement>('h2', titlesWrapperRef.current);
      gsap.set(sectionRef.current, { height: 'auto', overflow: 'visible' });
      gsap.set(titlesContainerRef.current, { position: 'static', clipPath: 'none' });
      gsap.set(titlesWrapperRef.current, { y: 0, paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '6vw' });
      titleEls.forEach((el) => gsap.set(el, { opacity: 1 }));
      gsap.set(bgItemRefs.current[0], { opacity: 1 });
      thumbnailRefs.current.forEach((el) => gsap.set(el, { display: 'none' }));
      gsap.set([headerRef.current, introWrapperRef.current], { display: 'none' });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="beyond" aria-label="Beyond the Resume" className="beyond-resume">
      <div ref={introWrapperRef} className="beyond-intro-wrapper">
        <div ref={introLeftRef}  className="beyond-intro-text beyond-intro-right">BEYOND THE RESUME</div>
        <div ref={introRightRef} className="beyond-intro-text beyond-intro-left">SCROLL TO EXPLORE</div>
      </div>

      <div ref={bgWrapperRef} className="beyond-bg" aria-hidden="true">
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { bgItemRefs.current[i] = el; }}
            className="beyond-bg-item"
            style={{ backgroundImage: `url(${item.image})`, opacity: i === 0 ? 1 : 0 }}
          />
        ))}
        <div className="beyond-bg-scrim" />
      </div>

      <div ref={titlesContainerRef} className="beyond-titles-container">
        <div ref={titlesWrapperRef} className="beyond-titles-wrapper">
          {items.map((item, i) => (
            <h2 key={i} style={{ opacity: i === 0 ? 1 : 0.25 }}>{item.title}</h2>
          ))}
        </div>
      </div>

      <div className="beyond-images" aria-hidden="true">
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { thumbnailRefs.current[i] = el; }}
            className="beyond-img"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        ))}
      </div>

      <div ref={headerRef} className="beyond-header" aria-hidden="true">
        <p>Beyond the resume</p>
      </div>
    </section>
  );
}
