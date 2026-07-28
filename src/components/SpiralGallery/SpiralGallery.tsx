import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { lenis } from '../../App';
import { SPIRAL_IMAGES } from './spiralImages';

// Reuse warmed fetches: a browser-cache preload (below) primes these URLs so the
// WebGL TextureLoader resolves them instantly instead of rendering black tiles.
THREE.Cache.enabled = true;

// ---------------------------------------------------------------------------
// SpiralGallery — scroll-driven 3D spiral of personal-interest images.
// Trial replacement for <BeyondResume /> (toggle lives in App.tsx).
// WebGL on desktop only; static grid fallback on mobile / reduced motion /
// failed WebGL context. All tunables live in CONFIG.
// ---------------------------------------------------------------------------

const CONFIG = {
  // --- spiral structure ---
  tilesPerRevolution: 12,
  revolutions: 4,
  startRadius: 5.0, // wider at the top
  endRadius: 1.6, // narrower at the bottom
  tileHeightRatio: 1.2, // tile height relative to its arc width
  segments: 24, // horizontal segments per tile (curve smoothness)
  rowSpacing: 0.06, // vertical gap between rows
  tileOverlap: 0.012, // tiny angular overlap to hide seams (radians)

  // --- motion / camera ---
  // Side view: the spiral stands as a vertical tower; the camera is pulled
  // back so several revolutions fill the frame, and descends with scroll.
  cameraZ: 11.0, // distance from the tower (startRadius 5)
  cameraStartY: -2.0, // framing of the first revolutions
  cameraEndMargin: 3.6, // stop this far above the narrow end
  cameraLerp: 0.08, // camera follow smoothing (lower = softer)
  baseSpin: 0.0015, // constant idle rotation per frame (radians)
  scrollSpin: 0.00045, // scroll-velocity → spin multiplier
  gestureSpin: 0.045, // circular-mouse-gesture → spin multiplier
  spinDecay: 0.92, // momentum fade per frame
  mouseParallax: 0.8, // max sideways camera drift (world units)
  mouseTiltY: 0.6, // vertical look offset from cursor (world units)
  mouseLerp: 0.06, // parallax smoothing

  // --- drag / hover ---
  dragSensitivity: 0.005, // horizontal drag px → radians
  flickSpin: 0.0006, // release velocity (px per move event) → momentum spin
  hoverLerp: 0.12, // hover spotlight easing per frame
};


const VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// cameraPosition is a ShaderMaterial built-in — must NOT be redeclared as a uniform.
const FRAGMENT_SHADER = /* glsl */ `
uniform sampler2D map;
uniform float uHighlight; // 0..1 hover spotlight
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main() {
  vec4 tex = texture2D(map, vUv);
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float facing = abs(dot(normalize(vWorldNormal), viewDir));
  float shade = mix(0.55, 1.0, facing);
  shade = mix(shade, 1.0, uHighlight); // hovered tile lifts to full brightness

  // Thin white border along all four UV edges
  float b = 0.012;
  float inPhoto = step(b, vUv.x) * step(b, 1.0 - vUv.x)
                * step(b, vUv.y) * step(b, 1.0 - vUv.y);
  vec3 color = mix(vec3(1.0), tex.rgb * shade, inPhoto);
  // Full opacity always — brightness shading based on facing angle, but no transparency
  gl_FragColor = vec4(color, 1.0);
}
`;

const DESKTOP_QUERY = '(min-width: 769px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type Mode = 'webgl' | 'static';

function buildSpiral(textures: THREE.Texture[]): {
  group: THREE.Group;
  spiralHeight: number;
  disposables: { dispose: () => void }[];
  meshes: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>[];
} {
  const {
    tilesPerRevolution,
    revolutions,
    startRadius,
    endRadius,
    tileHeightRatio,
    rowSpacing,
    tileOverlap,
  } = CONFIG;
  const segments = Math.max(1, Math.floor(CONFIG.segments));
  const totalTiles = tilesPerRevolution * revolutions;
  const angleStep = (Math.PI * 2) / tilesPerRevolution;

  // Vertical edge pass — each REVOLUTION descends one row height (dense coil),
  // so per tile the helix drops (tileHeight + rowSpacing) / tilesPerRevolution.
  const tileTops: number[] = [0];
  const tileDrops: number[] = [];
  const tileHeights: number[] = [];
  for (let i = 0; i < totalTiles; i++) {
    const progress = i / totalTiles;
    const radius = Math.max(0.001, THREE.MathUtils.lerp(startRadius, endRadius, progress));
    const arcWidth = (Math.PI * 2 * radius) / tilesPerRevolution;
    const tileHeight = arcWidth * tileHeightRatio;
    const drop = (tileHeight + rowSpacing) / tilesPerRevolution;
    tileHeights.push(tileHeight);
    tileDrops.push(drop);
    tileTops.push(tileTops[i] - drop);
  }
  const spiralHeight = Math.abs(tileTops[totalTiles]) + tileHeights[totalTiles - 1];

  const group = new THREE.Group();
  const disposables: { dispose: () => void }[] = [];
  const meshes: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>[] = [];

  for (let i = 0; i < totalTiles; i++) {
    const progress = i / totalTiles;
    const radius = Math.max(0.001, THREE.MathUtils.lerp(startRadius, endRadius, progress));
    const arcWidth = (Math.PI * 2 * radius) / tilesPerRevolution;
    const tileHeight = tileHeights[i];
    const drop = tileDrops[i];
    const centerY = tileTops[i] - tileHeight / 2;
    const tileAngle = arcWidth / radius + tileOverlap;

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let r = 0; r < 2; r++) {
      for (let seg = 0; seg <= segments; seg++) {
        const t = seg / segments;
        const a = -tileAngle / 2 + t * tileAngle;
        // Tilt across the width so the tile follows the helix descent.
        const y = tileHeight / 2 - t * drop - r * tileHeight;
        positions.push(Math.sin(a) * radius, y, Math.cos(a) * radius);
        uvs.push(t, 1 - r);
      }
    }
    const rowLen = segments + 1;
    for (let seg = 0; seg < segments; seg++) {
      const tl = seg;
      const tr = seg + 1;
      const bl = rowLen + seg;
      const br = rowLen + seg + 1;
      indices.push(tl, bl, tr, tr, bl, br);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        map: { value: textures[i % textures.length] },
        uHighlight: { value: 0 },
      },
      side: THREE.DoubleSide,
      // Tiles are fully opaque — keep them in the opaque render queue so the
      // depth buffer resolves occlusion per-pixel (no centroid distance-sort,
      // no draw-order popping as the spiral rotates).
      transparent: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = centerY;
    const tileGroup = new THREE.Group();
    tileGroup.rotation.y = i * angleStep;
    tileGroup.add(mesh);
    group.add(tileGroup);

    disposables.push(geometry, material);
    meshes.push(mesh);
  }

  return { group, spiralHeight, disposables, meshes };
}

function HeadingOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div
        className="px-6 py-16 text-center"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(13,13,15,0.82) 0%, rgba(13,13,15,0.45) 55%, transparent 100%)',
        }}
      >
        <h2
          className="font-display text-off-white"
          style={{ fontSize: 'var(--step-4)', lineHeight: 1.1 }}
        >
          The human behind the product
          <br />
          Beyond the resume
        </h2>
      </div>
    </div>
  );
}

function StaticFallback() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16 lg:px-24 py-24">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {SPIRAL_IMAGES.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={800}
            height={1000}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default function SpiralGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('static');
  // "Drag to spin" affordance — fades out permanently after the first real drag.
  const [hintDismissed, setHintDismissed] = useState(false);

  // Decide WebGL vs static, and track media-query changes.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setMode(desktop.matches && !reduced.matches ? 'webgl' : 'static');
    update();
    desktop.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (mode !== 'webgl') return;
    const section = sectionRef.current;
    const container = canvasContainerRef.current;
    if (!section || !container) return;

    let initialized = false;
    let running = false;

    let cleanupScene: (() => void) | null = null;

    const initScene = () => {
      if (initialized) return;
      initialized = true;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setMode('static');
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Keep the canvas invisible until all textures have loaded, then fade in —
      // this is what prevents the "black tiles until you scroll" flash. Combined
      // with the mount preload above, the wait is usually imperceptible.
      renderer.domElement.style.opacity = '0';

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, CONFIG.cameraStartY, CONFIG.cameraZ);
      camera.lookAt(0, CONFIG.cameraStartY, 0);

      // LoadingManager.onLoad fires once every texture is decoded — only then do
      // we reveal the canvas, so the spiral never paints black, partially-loaded tiles.
      const manager = new THREE.LoadingManager();
      const revealCanvas = () => {
        gsap.to(renderer.domElement, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      };
      manager.onLoad = revealCanvas;
      // Safety: never leave the canvas hidden if a texture stalls or errors.
      const revealFallback = window.setTimeout(revealCanvas, 5000);
      const loader = new THREE.TextureLoader(manager);
      const textures = SPIRAL_IMAGES.map(({ src }) => {
        const tex = loader.load(
          src,
          undefined,
          undefined,
          () => { console.warn('SpiralGallery: failed to load', src); }
        );
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.generateMipmaps = true;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return tex;
      });

      const { group: spiralGroup, spiralHeight, disposables, meshes } = buildSpiral(textures);
      scene.add(spiralGroup);

      const raycaster = new THREE.Raycaster();
      const pointerNdc = new THREE.Vector2();
      let pointerInside = false;

      let spinVelocity = 0;
      let mouseX = 0;
      let mouseY = 0;
      let smoothMouseX = 0;
      let smoothMouseY = 0;
      // Circular gesture: angular travel of the cursor around the viewport
      // center this frame. Clockwise circling spins the tower clockwise,
      // counter-clockwise reverses it.
      let lastAngle: number | null = null;
      let gestureDelta = 0;
      // Drag-to-flick state
      let dragging = false;
      let lastDragX = 0;
      let dragPending = 0; // px accumulated since last frame
      let dragTravel = 0; // total px this drag (hint dismissal threshold)
      let flickVelocity = 0; // smoothed px/event, becomes momentum on release

      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;

        // Hover raycast coords (container-relative NDC)
        const b = container.getBoundingClientRect();
        pointerInside =
          e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom;
        if (pointerInside) {
          pointerNdc.set(
            ((e.clientX - b.left) / b.width) * 2 - 1,
            -(((e.clientY - b.top) / b.height) * 2 - 1)
          );
        }

        if (dragging) {
          // Dragging owns rotation; skip the ambient circular gesture.
          lastAngle = null;
          return;
        }
        const dx = e.clientX - window.innerWidth / 2;
        const dy = e.clientY - window.innerHeight / 2;
        const angle = Math.atan2(dy, dx); // screen-space: increases clockwise
        if (lastAngle !== null) {
          let d = angle - lastAngle;
          if (d > Math.PI) d -= Math.PI * 2;
          if (d < -Math.PI) d += Math.PI * 2;
          // Weight by distance from center so jitter near it doesn't whip.
          const radiusWeight = Math.min(Math.hypot(dx, dy) / (window.innerHeight * 0.25), 1);
          gestureDelta += d * radiusWeight;
        }
        lastAngle = angle;
      };

      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        dragging = true;
        lastDragX = e.clientX;
        dragPending = 0;
        dragTravel = 0;
        flickVelocity = 0;
        container.style.cursor = 'grabbing';
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lastDragX;
        lastDragX = e.clientX;
        dragPending += dx;
        dragTravel += Math.abs(dx);
        flickVelocity = flickVelocity * 0.6 + dx * 0.4;
      };
      const onPointerUp = () => {
        if (!dragging) return;
        dragging = false;
        container.style.cursor = 'grab';
        spinVelocity = flickVelocity * CONFIG.flickSpin; // freewheel on release
        if (dragTravel > 30) setHintDismissed(true);
      };
      const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('mousemove', onMouseMove);
      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      container.style.cursor = 'grab';
      container.style.touchAction = 'pan-y';
      // ResizeObserver (not window resize) — tracks the container itself, so
      // emulated viewports and layout-driven size changes are caught too.
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(container);

      const animate = () => {
        if (!running) return;

        // Section-scoped scroll progress (0 → 1) drives camera descent —
        // deliberately not global page scroll, and no ScrollTrigger so it
        // can't fight the page's existing pinned triggers.
        const rect = section.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        const progress = THREE.MathUtils.clamp(range > 0 ? -rect.top / range : 0, 0, 1);
        const targetCameraY = THREE.MathUtils.lerp(
          CONFIG.cameraStartY,
          -spiralHeight + CONFIG.cameraEndMargin,
          progress
        );
        camera.position.y += (targetCameraY - camera.position.y) * CONFIG.cameraLerp;

        // Rotation: while dragging the cursor owns it directly; otherwise
        // momentum spin from scroll velocity + circular mouse gesture.
        let appliedSpin: number;
        if (dragging) {
          appliedSpin = dragPending * CONFIG.dragSensitivity;
          dragPending = 0;
          spinVelocity = 0;
        } else {
          spinVelocity +=
            (lenis?.velocity ?? 0) * CONFIG.scrollSpin + gestureDelta * CONFIG.gestureSpin;
          gestureDelta = 0;
          appliedSpin = CONFIG.baseSpin + spinVelocity;
          spinVelocity *= CONFIG.spinDecay;
        }
        spiralGroup.rotation.y += appliedSpin;

        // Hover spotlight — raycast the pointer, lift the hit tile to full brightness.
        let hoveredMaterial: THREE.ShaderMaterial | null = null;
        if (pointerInside && !dragging) {
          raycaster.setFromCamera(pointerNdc, camera);
          const hit = raycaster.intersectObjects(meshes, false)[0];
          if (hit) hoveredMaterial = (hit.object as (typeof meshes)[number]).material;
        }
        for (const mesh of meshes) {
          const u = mesh.material.uniforms;
          const target = mesh.material === hoveredMaterial ? 1 : 0;
          u.uHighlight.value += (target - u.uHighlight.value) * CONFIG.hoverLerp;
        }

        // Parallax: slight sideways camera drift + vertical look offset;
        // lookAt keeps the tower centered so it reads as a gentle tilt.
        smoothMouseX += (mouseX - smoothMouseX) * CONFIG.mouseLerp;
        smoothMouseY += (mouseY - smoothMouseY) * CONFIG.mouseLerp;
        camera.position.x = smoothMouseX * CONFIG.mouseParallax;
        camera.lookAt(0, camera.position.y - smoothMouseY * CONFIG.mouseTiltY, 0);

        renderer.render(scene, camera);
      };

      const start = () => {
        if (running) return;
        running = true;
        gsap.ticker.add(animate);
      };
      const stop = () => {
        running = false;
        gsap.ticker.remove(animate);
      };
      start();

      cleanupScene = () => {
        stop();
        window.clearTimeout(revealFallback);
        window.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        container.style.cursor = '';
        resizeObserver.disconnect();
        disposables.forEach((d) => d.dispose());
        textures.forEach((t) => t.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };

      // Expose pause/resume to the visibility observer below.
      pauseRef.current = stop;
      resumeRef.current = start;
    };

    const pauseRef = { current: null as null | (() => void) };
    const resumeRef = { current: null as null | (() => void) };

    // Warm the browser cache the first time the gallery nears the viewport (not
    // on page mount) — by the time the visitor actually scrolls here, the WebGL
    // textures resolve from cache and never flash black, without competing with
    // hero-critical requests at initial load.
    let warmed = false;
    const warmImageCache = () => {
      if (warmed) return;
      warmed = true;
      SPIRAL_IMAGES.forEach(({ src }) => {
        const img = new Image();
        img.src = src;
        img.decode?.().catch(() => {});
      });
    };

    // Lazy init when near the viewport; pause the loop when fully off-screen.
    // Bounds check on scroll instead of IntersectionObserver — IO proved
    // unreliable in embedded/emulated browsers, and this costs one
    // getBoundingClientRect per scroll event.
    const checkVisibility = () => {
      const r = section.getBoundingClientRect();
      const near = r.top < window.innerHeight + 200 && r.bottom > -200;
      if (near) {
        warmImageCache();
        initScene();
        resumeRef.current?.();
      } else {
        pauseRef.current?.();
      }
    };
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    lenis?.on('scroll', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      lenis?.off('scroll', checkVisibility);
      cleanupScene?.();
    };
  }, [mode]);

  return (
    <section
      ref={sectionRef}
      className="bg-bg relative w-full flex flex-col"
      style={mode === 'webgl' ? { minHeight: '200vh' } : undefined}
      aria-label="Beyond the résumé — personal interests gallery"
    >
      {/* Section title — above the gallery */}
      <div className="w-full px-8 md:px-16 lg:px-24 py-24 flex-shrink-0">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-accent-purple mb-4 block">
            Personal
          </span>
          <h2
            className="font-display font-semibold text-off-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            The human behind the product
          </h2>
        </div>
      </div>

      {/* Gallery content */}
      {mode === 'webgl' ? (
        // Sticky stage: the section provides 200vh of scroll room while the
        // canvas stays pinned to a single screen-sized viewport.
        <div className="sticky top-0 h-screen w-full select-none flex-1">
          <div ref={canvasContainerRef} className="absolute inset-0" />
          <div
            aria-hidden
            className={`pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-700 ${
              hintDismissed ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-off-white/60">
              <svg width="34" height="8" viewBox="0 0 34 8" fill="none">
                <path
                  d="M4 1 1 4l3 3M30 1l3 3-3 3M1 4h32"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              drag to spin
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <StaticFallback />
        </div>
      )}
    </section>
  );
}
