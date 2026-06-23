import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PerspectiveGrid from './PerspectiveGrid';

// Marker for a slot position in the headline token array.
// Each SLOT corresponds to one icon landing target.
export const SLOT = Symbol('slot');
export type HeadlineToken = string | typeof SLOT;

export interface IconDef {
  glyph: string; // path to a white-able SVG glyph, centred on the colour square
  color: string; // square background colour
  alt: string;
}

interface ScrollHeroProps {
  icons?: IconDef[];
  headline?: HeadlineToken[];
}

// ---------------------------------------------------------------------------
// Icon set — one coloured square + white glyph per domain. Order matches the
// SLOT order in the headline below. The glyphs are forced white via CSS filter
// so any source SVG (fill- or stroke-based) reads cleanly on the colour.
// ---------------------------------------------------------------------------
const DEFAULT_ICONS: IconDef[] = [
  { glyph: '/assets/scrollhero/motorcycle.svg',  color: '#14B8A6', alt: 'Mobility'   }, // 🛵 bike-taxi
  { glyph: '/assets/scrollhero/ear.svg',         color: '#22C55E', alt: 'Empathy'    }, // 👂 listening
  { glyph: '/assets/scrollhero/heart-pulse.svg', color: '#7F77DD', alt: 'Healthcare' }, // ❤️ health
  { glyph: '/assets/scrollhero/suitcase.svg',    color: '#F97316', alt: 'Employment' }, // 💼 jobs & HR-tech
  { glyph: '/assets/scrollhero/chip-ai.svg',     color: '#3B82F6', alt: 'AI'         }, // ✦ AI products
];

// Headline — verbatim statement copy. Icons (slots) land where the emojis sat.
// A leading space is baked into segments that need to breathe after an icon;
// each slot carries a small marginLeft so the word before it doesn’t crowd it.
// Line breaks (\n) are preserved via white-space: pre-wrap on the headline container.
const PLACEHOLDER_HEADLINE: HeadlineToken[] = [
  "The sharpest product insight I ever got was on the back of a bike-taxi",
  SLOT, // 🛵 Mobility
  ".\nEmpathy",
  SLOT, // 👂 Empathy
  " is my research method — I listen for what users would never put in a survey.\nI’ve solved problems across healthcare",
  SLOT, // ❤️ Healthcare
  ", employment",
  SLOT, // 💼 Employment
  ", and AI",
  SLOT, // ✦ AI
  " — for users in 40+ countries.\n\n",
  "Lately, I’m vibe-coding my idea notes into live AI products.",
];

const FINAL_ICON_DESKTOP  = 40;  // px — also the .slot reserved size; sized to sit inline with paragraph text
const FINAL_ICON_MOBILE   = 24;
const INITIAL_ICON_DESKTOP = 80; // px — icon size before scaling
const INITIAL_ICON_MOBILE  = 48;
const MOBILE_BP = 1000;

// Shared type scale for the statement paragraph (animated + static must match)
const HEADLINE_FONT = 'clamp(1.125rem, 0.78rem + 1.45vw, 1.75rem)';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const localP  = (progress: number, start: number, end: number) =>
  clamp01((progress - start) / (end - start));

// ---------------------------------------------------------------------------
// IconSquare — coloured rounded square with a white glyph centred on it.
// Used by the bottom icon row and the static fallback; the fly-in clones
// deep-copy this node, so they inherit the same look for free.
// ---------------------------------------------------------------------------
function IconSquare({ icon }: { icon: IconDef }) {
  return (
    <div
      role="img"
      aria-label={icon.alt}
      style={{
        width: '100%',
        height: '100%',
        background: icon.color,
        borderRadius: '24%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={icon.glyph}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          width: '56%',
          height: '56%',
          objectFit: 'contain',
          // Force any source SVG to render solid white on the colour square.
          filter: 'brightness(0) invert(1)',
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static final-state render (prefers-reduced-motion)
// ---------------------------------------------------------------------------
function StaticHero({ icons, headline }: Required<ScrollHeroProps>) {
  const isMobile  = typeof window !== 'undefined' && window.innerWidth <= MOBILE_BP;
  const finalSize = isMobile ? FINAL_ICON_MOBILE : FINAL_ICON_DESKTOP;
  let slotsSeen   = 0;

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'var(--sh-bg-b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <h1
        className="font-display font-medium"
        style={{
          fontSize: HEADLINE_FONT,
          color: 'var(--sh-headline-color)',
          lineHeight: 1.5,
          letterSpacing: '-0.01em',
          textAlign: 'left',
          maxWidth: 'min(90vw, 680px)',
          whiteSpace: 'pre-wrap',
        }}
      >
        {headline.map((token, i) => {
          if (token === SLOT) {
            const idx = slotsSeen++;
            return (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: finalSize,
                  height: finalSize,
                  marginLeft: '0.2em',
                  verticalAlign: 'middle',
                }}
              >
                {icons[idx] && <IconSquare icon={icons[idx]} />}
              </span>
            );
          }
          return <span key={i}>{token}</span>;
        })}
      </h1>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function ScrollHero({
  icons    = DEFAULT_ICONS,
  headline = PLACEHOLDER_HEADLINE,
}: ScrollHeroProps) {
  // All refs first — hooks must not appear after conditional returns
  const heroRef          = useRef<HTMLElement>(null);
  const gridRef          = useRef<HTMLDivElement>(null);
  const headerRef        = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef      = useRef<HTMLHeadingElement>(null);
  // Clone nodes appended to document.body during Phase 3; removed on unmount / scroll-back
  const clonesRef        = useRef<HTMLDivElement[]>([]);

  const [reducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // -------------------------------------------------------------------------
  // GSAP / ScrollTrigger — wired BEFORE the early reducedMotion return so
  // hook call order is unconditional (React rules). Guards internally.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (reducedMotion) return;

    const hero          = heroRef.current;
    const header        = headerRef.current;
    const iconContainer = iconContainerRef.current;
    if (!hero || !header || !iconContainer) return;

    const isMobile   = window.innerWidth <= MOBILE_BP;
    const finalSize  = isMobile ? FINAL_ICON_MOBILE  : FINAL_ICON_DESKTOP;
    const iconEls    = Array.from(
      iconContainer.querySelectorAll<HTMLElement>('.sh-icon')
    );

    // Mutable setup — updated by the resize handler so updateHero always reads current sizes.
    // Declared here (before updateHero) so the closure captures the reference, not the value.
    const setup = {
      finalSize,
      exactScale: finalSize / (isMobile ? INITIAL_ICON_MOBILE : INITIAL_ICON_DESKTOP),
      isMobile,
    };

    // ------------------------------------------------------------------
    // Measure container's natural (pre-scroll) centre once at setup.
    // Used to compute Phase 2 seam-free translation — see comments below.
    // ------------------------------------------------------------------
    const containerRect0 = iconContainer.getBoundingClientRect();
    const naturalCX = containerRect0.left + containerRect0.width / 2;
    const naturalCY = containerRect0.top  + containerRect0.height / 2;

    // ------------------------------------------------------------------
    // Single update function — all phases live here
    // ------------------------------------------------------------------
    const updateHero = (progress: number) => {
      const vh = window.innerHeight;

      // ── Phase 1 · 0 → 0.30 · lift-off ──────────────────────────────
      const p1          = localP(progress, 0, 0.30);
      const phase1LiftY = -vh * 0.30;            // container's final Y in Phase 1
      const containerY  = phase1LiftY * p1;      // current Y during Phase 1

      // Header: fade + slide up during first 15%
      const headerP = localP(progress, 0, 0.15);
      header.style.opacity   = String(1 - headerP);
      header.style.transform = `translateY(${-50 * headerP}px)`;

      // Interactive perspective grid: live at the top, fades out as the statement takes over
      if (gridRef.current) {
        gridRef.current.style.opacity = String(1 - localP(progress, 0, 0.25));
      }

      if (progress <= 0.30) {
        // Container rises as a unit
        iconContainer.style.transform = `translateY(${containerY}px)`;

        // Each icon peels off with a staggered sub-window
        iconEls.forEach((icon, i) => {
          const staggerStart = (i / iconEls.length) * 0.15;
          const staggerEnd   = staggerStart + 0.15;
          const iconP        = localP(progress, staggerStart, staggerEnd);
          icon.style.transform = `translateY(${-40 * iconP}px)`;
        });
      }

      // ── Phase 2 · 0.30 → 0.60 · scale + centre-travel + bg flip ─────
      if (progress > 0.30 && progress <= 0.60) {
        const scaleP  = localP(progress, 0.30, 0.60);
        const centreX = window.innerWidth / 2;
        const centreY = vh / 2;

        // Delta from Phase-1-final position to viewport centre.
        // Phase 1 leaves container at (naturalCX, naturalCY + phase1LiftY).
        // We interpolate FROM that position TO (centreX, centreY).
        const deltaX = centreX - naturalCX;
        const deltaY = centreY - (naturalCY + phase1LiftY);
        const scale  = 1 - (1 - setup.exactScale) * scaleP;

        // At scaleP=0: translate(0, phase1LiftY) scale(1) === Phase 1 final ✓
        // At scaleP=1: translate(deltaX, phase1LiftY+deltaY) scale(exactScale) === centred ✓
        iconContainer.style.transform = [
          `translate(${deltaX * scaleP}px, ${phase1LiftY + deltaY * scaleP}px)`,
          `scale(${scale})`,
        ].join(' ');

        // Reset individual icon stagger transforms (carried from Phase 1 max)
        iconEls.forEach(icon => { icon.style.transform = ''; });
      }

      // Background: A until 50% progress, then B. CSS transition smooths the flip.
      // CSS variables are resolved at paint time, so theme changes are reactive.
      hero.style.backgroundColor = progress > 0.50 ? 'var(--sh-bg-b)' : 'var(--sh-bg-a)';

      // ── Phase 3 · 0.60 → 0.75 · icon clones fly into headline slots ──
      if (progress > 0.60) {
        const moveP = localP(progress, 0.60, 0.75);

        // Lock container to its centred+scaled position and hide original icons
        {
          const centreX = window.innerWidth / 2;
          const centreY = vh / 2;
          const deltaX  = centreX - naturalCX;
          const deltaY  = centreY - (naturalCY + phase1LiftY);
          iconContainer.style.transform = [
            `translate(${deltaX}px, ${phase1LiftY + deltaY}px)`,
            `scale(${setup.exactScale})`,
          ].join(' ');
          iconContainer.style.opacity = '0';
        }

        // Create clones once; guard with clonesRef array length
        if (clonesRef.current.length === 0) {
          iconEls.forEach((origIcon, i) => {
            const origRect = origIcon.getBoundingClientRect();
            const clone = document.createElement('div');
            clone.className = `sh-clone sh-clone-${i}`;
            clone.style.cssText = [
              'position:fixed',
              `left:${origRect.left}px`,
              `top:${origRect.top}px`,
              `width:${setup.finalSize}px`,
              `height:${setup.finalSize}px`,
              'z-index:9999',
              'pointer-events:none',
              'will-change:transform',
              'display:flex',
              'align-items:center',
              'justify-content:center',
            ].join(';');

            // Mirror the original icon content
            const inner = origIcon.firstElementChild as HTMLElement | null;
            if (inner) {
              const cloneInner = inner.cloneNode(true) as HTMLElement;
              cloneInner.style.width  = '100%';
              cloneInner.style.height = '100%';
              clone.appendChild(cloneInner);
            }

            // Store start position; target slot is measured each frame from .sh-slot elements
            const startX = origRect.left + origRect.width  / 2 - setup.finalSize / 2;
            const startY = origRect.top  + origRect.height / 2 - setup.finalSize / 2;
            clone.dataset.startX = String(startX);
            clone.dataset.startY = String(startY);
            clone.dataset.targetSlotIndex = String(i);

            document.body.appendChild(clone);
            clonesRef.current.push(clone);
          });
        }

        // Animate clones each frame via translate3d (never top/left)
        const slots = Array.from(
          headlineRef.current?.querySelectorAll<HTMLElement>('.sh-slot') ?? []
        );
        const slotIcons = Array.from(
          headlineRef.current?.querySelectorAll<HTMLElement>('.sh-slot-icon') ?? []
        );

        // Handoff: as the icons land, the REAL inline slot icons take over from the flying
        // clones. Crossfaded over a small window (0.72→0.78) rather than a hard switch, so
        // there's no pop in either direction. The inline icons are part of the headline, so
        // they scroll away WITH the text when the pin releases — no empty slots at the end.
        const hand = localP(progress, 0.72, 0.78);
        slotIcons.forEach(el => { el.style.opacity = String(hand); });

        clonesRef.current.forEach((clone, i) => {
          const startX = Number(clone.dataset.startX);
          const startY = Number(clone.dataset.startY);
          const slot   = slots[i];
          if (!slot) return;
          const slotRect = slot.getBoundingClientRect();
          const endX = slotRect.left;
          const endY = slotRect.top;

          // Two-stage: first vertical (moveP 0→0.5), then horizontal (moveP 0.5→1)
          const vHalf = localP(moveP, 0, 0.5);
          const hHalf = localP(moveP, 0.5, 1);

          const tx = (endX - startX) * hHalf;
          const ty = (endY - startY) * vHalf;

          clone.style.transform = `translate3d(${tx}px,${ty}px,0)`;
          clone.style.opacity   = String(1 - hand);
        });
      } else {
        // Scrolled back into Phase 2 or earlier — destroy clones, hide inline slot icons
        if (clonesRef.current.length > 0) {
          clonesRef.current.forEach(c => c.remove());
          clonesRef.current = [];
          iconContainer.style.opacity = '1';
        }
        headlineRef.current?.querySelectorAll<HTMLElement>('.sh-slot-icon')
          .forEach(el => { (el as HTMLElement).style.opacity = '0'; });
      }

      // ── Phase 4 · 0.75 → 1.0 · headline text reveals ────────────────
      if (headlineRef.current) {
        const segEls = Array.from(
          headlineRef.current.querySelectorAll<HTMLElement>('.sh-seg')
        );
        const segCount = segEls.length;

        if (segCount > 0) {
          // First: reset all segs to 0 so nothing reveals early
          segEls.forEach(s => { s.style.opacity = '0'; });

          if (progress > 0.75) {
            // Compute offset so the last segment finishes exactly at progress=1
            const segWindow = 0.04;
            const offset    = segCount > 1
              ? (0.25 - segWindow) / (segCount - 1)
              : 0;

            // Sequential reveal — segments fade in DOM order (sentence start → end)
            segEls.forEach((seg, k) => {
              const segStart = 0.75 + k * offset;
              const segP     = localP(progress, segStart, segStart + segWindow);
              seg.style.opacity = String(segP);
            });
            // Icons are now the inline .sh-slot-icon elements (handed off at 0.75) —
            // they sit in the headline flow, so nothing to re-pin here.
          }
        }
      }
    };

    // Sync .sh-slot dimensions when setup changes
    const updateSlotSizes = (size: number) => {
      headlineRef.current?.querySelectorAll<HTMLElement>('.sh-slot').forEach(slot => {
        slot.style.width  = `${size}px`;
        slot.style.height = `${size}px`;
      });
    };

    // ------------------------------------------------------------------
    // Pinned ScrollTrigger — 8× viewport height, scrub 1
    // ------------------------------------------------------------------
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const st = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: `+=${3 * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1, // smooths the pin engage/disengage jump when scrolling back up
        invalidateOnRefresh: true,
        onUpdate: (self) => updateHero(self.progress),
        // No onLeave/onEnterBack needed: by progress 0.75 the icons hand off to the
        // inline .sh-slot-icon elements (part of the headline), so they scroll away with
        // the text on pin release and reappear correctly on scrub-back via updateHero.
      });

      // Resize: recompute sizes, update slots, refresh ScrollTrigger
      const onResize = () => {
        const newMobile    = window.innerWidth <= MOBILE_BP;
        const newFinalSize = newMobile ? FINAL_ICON_MOBILE  : FINAL_ICON_DESKTOP;
        setup.isMobile    = newMobile;
        setup.finalSize   = newFinalSize;
        setup.exactScale  = newFinalSize / (newMobile ? INITIAL_ICON_MOBILE : INITIAL_ICON_DESKTOP);
        updateSlotSizes(newFinalSize);
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', onResize);

      // Font-load: font swap can shift slot positions — refresh after fonts settle
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => {
        st.kill();
        window.removeEventListener('resize', onResize);
        // Remove any clones left in DOM when ST is killed
        clonesRef.current.forEach(c => c.remove());
        clonesRef.current = [];
      };
    });

    return () => {
      mm.revert();
      // Safety: also clean up clones if mm.revert() doesn't fire the inner cleanup
      clonesRef.current.forEach(c => c.remove());
      clonesRef.current = [];
    };
  }, [reducedMotion]);

  // -------------------------------------------------------------------------
  // Reduced-motion: render static final state — all icons in slots, text visible
  // -------------------------------------------------------------------------
  if (reducedMotion) {
    return <StaticHero icons={icons} headline={headline} />;
  }

  // -------------------------------------------------------------------------
  // Animated path
  // -------------------------------------------------------------------------
  const isMobile    = typeof window !== 'undefined' && window.innerWidth <= MOBILE_BP;
  const finalSize   = isMobile ? FINAL_ICON_MOBILE   : FINAL_ICON_DESKTOP;
  const initialSize = isMobile ? INITIAL_ICON_MOBILE  : INITIAL_ICON_DESKTOP;

  let slotsSeen = 0;

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Pinned hero — GSAP pins this for 8× viewport height                */}
      {/* ------------------------------------------------------------------ */}
      <section
        ref={heroRef}
        id="scroll-hero"
        style={{
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--sh-bg-a)',
          transition: 'background-color 600ms ease',
          position: 'relative',
        }}
      >
        {/* Interactive perspective grid background — tiles light up on mouse-move.
            Behind all content (z-0); fades out during Phase 1. The overlay content
            sets pointer-events:none so the grid is hoverable across the whole hero. */}
        <div
          ref={gridRef}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <PerspectiveGrid className="sh-grid" cols={42} edgeFade={false} />
        </div>

        {/* Header block — fades out during Phase 1 (progress 0→0.15).
            Top padding clears the fixed nav (~80px) so nothing is clipped. */}
        <div
          ref={headerRef}
          className="sh-header"
          style={{
            padding: `6.5rem clamp(1.5rem, 5vw, 4rem) 2.5rem`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.6rem',
            position: 'relative',
            zIndex: 1,
            pointerEvents: 'none', // let the perspective grid behind receive hover
            willChange: 'transform, opacity',
          }}
        >
          <h2
            className="font-display font-semibold"
            style={{
              fontSize: 'clamp(1.5rem, 1.15rem + 1.7vw, 2.25rem)',
              color: 'var(--color-off-white)',
              letterSpacing: '-0.01em',
              lineHeight: 1.12,
              maxWidth: '20ch',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '0.6em',
                fontWeight: 400,
                opacity: 0.75,
                letterSpacing: '0.01em',
                marginBottom: '0.25em',
              }}
            >
              Hey there, This is
            </span>
            Janu — Senior Product Manager
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: 'var(--step-0)',
              color: 'var(--sh-tagline-color)',
              letterSpacing: '0.01em',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.55rem',
              maxWidth: '34rem',
            }}
          >
            <span>Problems, interrogated</span>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: '#14B8A6', flexShrink: 0 }} />
            <span>Empathy, engineered</span>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: '#F97316', flexShrink: 0 }} />
            <span>Products, shipped.</span>
          </p>
        </div>

        {/* Headline — centred statement paragraph; .slot spans hold inline space
            for the landing icons. Inline flow (not flex) so the long copy wraps
            like real prose and the icons sit as inline punctuation. */}
        {/* Screen-reader note: .slot spans are aria-hidden; plain text is in .seg */}
        <h1
          ref={headlineRef}
          className="sh-headline font-display font-medium"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: HEADLINE_FONT,
            color: 'var(--sh-headline-color)',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            textAlign: 'left',
            maxWidth: 'min(90vw, 680px)',
            width: '100%',
            margin: 0,
            zIndex: 1,
            pointerEvents: 'none', // let the perspective grid behind receive hover
            whiteSpace: 'pre-wrap',
          }}
        >
          {headline.map((token, i) => {
            if (token === SLOT) {
              const idx = slotsSeen++;
              return (
                <span
                  key={i}
                  className={`sh-slot sh-slot-${idx}`}
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    width: finalSize,
                    height: finalSize,
                    marginLeft: '0.2em',
                    verticalAlign: 'middle',
                  }}
                >
                  {/* Real inline icon — hidden during fly-in, revealed on landing so it
                      scrolls away WITH the headline text when the pin releases. */}
                  <span
                    className="sh-slot-icon"
                    style={{ display: 'block', width: '100%', height: '100%', opacity: 0 }}
                  >
                    {icons[idx] && <IconSquare icon={icons[idx]} />}
                  </span>
                </span>
              );
            }
            return (
              <span
                key={i}
                className={`sh-seg ${i === headline.length - 1 ? 'sh-seg-final' : ''}`}
                style={{
                  opacity: 0, // GSAP reveals in Phase 4
                  ...(i === headline.length - 1 && { color: '#F97316' })
                }}
              >
                {token}
              </span>
            );
          })}
        </h1>

        {/* Icon container — pinned to bottom edge; peels off during Phase 1 */}
        <div
          ref={iconContainerRef}
          className="sh-icons"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            pointerEvents: 'none', // let the perspective grid behind receive hover
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            padding: `2rem clamp(1.5rem, 5vw, 4rem)`,
            willChange: 'transform',
          }}
        >
          {icons.map((icon, i) => (
            <div
              key={i}
              className={`sh-icon sh-icon-${i}`}
              style={{
                width: initialSize,
                height: initialSize,
                flexShrink: 0,
                willChange: 'transform',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconSquare icon={icon} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
