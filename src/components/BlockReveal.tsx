import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface BlockRevealProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  stagger?: number;
  duration?: number;
  className?: string;
}

type Injected = { wrapper: HTMLElement; block: HTMLElement };

export default function BlockReveal({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = '#F97316',
  stagger = 0.12,
  duration = 0.5,
  className,
}: BlockRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injectedRef = useRef<Injected[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const target = container.firstElementChild as HTMLElement | null;
    if (!target) return;

    // Unwrap any prior wrapper/block elements we injected (before SplitText reverts).
    // Only our divs are tracked here; SplitText's own nodes are its responsibility.
    function cleanupInjected() {
      injectedRef.current.forEach(({ wrapper, block }) => {
        const parent = wrapper.parentNode;
        if (!parent) return;
        // Move SplitText's line node(s) back to parent before removing wrapper
        const nodes: Node[] = [];
        wrapper.childNodes.forEach((n) => { if (n !== block) nodes.push(n); });
        nodes.forEach((n) => parent.insertBefore(n, wrapper));
        wrapper.remove();
      });
      injectedRef.current = [];
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Full animation only for users without reduced-motion preference.
      // Reduced-motion users get an untouched DOM — no split, no hidden lines.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        let currentST: ScrollTrigger | null = null;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function handleSplit(self: any) {
          // Kill stale ScrollTrigger from the previous split (resize-safe)
          currentST?.kill();
          currentST = null;

          // Clean up our injected wrappers/blocks before re-wrapping new lines
          cleanupInjected();

          const injected: Injected[] = [];

          (self.lines as HTMLElement[]).forEach((line) => {
            // Wrap each SplitText line in an overflow:hidden container
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;overflow:hidden;display:block;';
            line.parentNode!.insertBefore(wrapper, line);
            wrapper.appendChild(line);

            // Decorative block overlay — covers/uncovers the line
            const block = document.createElement('div');
            block.setAttribute('aria-hidden', 'true');
            block.style.cssText = `position:absolute;top:0;left:0;right:0;bottom:0;background:${blockColor};will-change:transform;`;
            gsap.set(block, { scaleX: 0, transformOrigin: 'left center' });
            wrapper.appendChild(block);

            injected.push({ wrapper, block });
          });

          injectedRef.current = injected;

          // Build master timeline — one sub-timeline per line, staggered
          const masterTl = gsap.timeline({ paused: true });

          (self.lines as HTMLElement[]).forEach((line, i) => {
            const { block } = injected[i];
            const lineTl = gsap.timeline();

            lineTl
              // Line starts invisible (only inside this animation branch)
              .set(line, { autoAlpha: 0 })
              // Block sweeps left→right to cover the line
              .to(block, {
                scaleX: 1,
                transformOrigin: 'left center',
                duration,
                ease: 'power2.inOut',
              })
              // Line is now readable under the block
              .set(line, { autoAlpha: 1 })
              // Flip origin so block collapses rightward
              .set(block, { transformOrigin: 'right center' })
              // Block collapses right→left to reveal finished text
              .to(block, {
                scaleX: 0,
                duration,
                ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              });

            masterTl.add(lineTl, i * stagger);
          });

          if (animateOnScroll) {
            currentST = ScrollTrigger.create({
              trigger: container,
              start: 'top 90%',
              once: true,
              onEnter: () => masterTl.delay(delay).play(),
            });
          } else {
            masterTl.delay(delay).play();
          }
        }

        const splitInstance = SplitText.create(target, {
          type: 'lines',
          autoSplit: true,
          onSplit: handleSplit,
        });

        return () => {
          currentST?.kill();
          cleanupInjected();
          splitInstance.revert();
        };
      });

      return () => mm.revert();
    }, container);

    return () => ctx.revert();
  }, [animateOnScroll, blockColor, delay, duration, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
