// Color-coded push notification anatomy: phone mockup (left) + numbered legend (right)

const ZONES = [
  {
    color: '#7F77DD',
    badges: [
      { num: '2', color: '#7F77DD' },
      { num: '3', color: '#7F77DD' },
      { num: '1', color: '#A1A1AA' },
    ],
    content: (
      <div className="flex items-center gap-1.5">
        {/* icon */}
        <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center"
          style={{ background: '#232f3e' }}>
          <span style={{ color: '#ff9900', fontWeight: 800, fontSize: '11px' }}>a</span>
        </div>
        <span className="font-sans font-semibold" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em' }}>
          SHOPMUCH APP
        </span>
        <span className="font-mono ml-auto" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>now</span>
      </div>
    ),
  },
  {
    color: '#A78BFA',
    badges: [{ num: '4', color: '#A78BFA' }],
    content: (
      <p className="font-sans font-bold leading-snug" style={{ fontSize: '13px', color: '#fff' }}>
        BOSS Sale — Electronics ends midnight
      </p>
    ),
  },
  {
    color: '#22C55E',
    badges: [{ num: '5', color: '#22C55E' }],
    content: (
      <p className="font-sans leading-relaxed" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>
        Up to 60% off on laptops, phones &amp; more. 8 hours left.
      </p>
    ),
  },
  {
    color: '#22C55E',
    badges: [{ num: '6', color: '#22C55E' }],
    content: (
      <div
        className="w-full rounded-md flex items-center justify-center font-sans uppercase"
        style={{
          height: '36px',
          background: 'rgba(34,197,94,0.08)',
          border: '0.5px solid rgba(34,197,94,0.25)',
          fontSize: '9px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.05em',
        }}
      >
        media attachment
      </div>
    ),
  },
  {
    color: '#F97316',
    badges: [{ num: '7', color: '#F97316' }],
    content: (
      <div className="flex gap-1.5">
        <span className="font-sans font-semibold rounded-md px-2.5 py-1"
          style={{ fontSize: '11px', border: '0.5px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}>
          Share
        </span>
        <span className="font-sans font-semibold rounded-md px-2.5 py-1"
          style={{ fontSize: '11px', border: '0.5px solid rgba(249,115,22,0.42)', background: 'rgba(249,115,22,0.18)', color: '#fb923c' }}>
          Shop Now
        </span>
      </div>
    ),
  },
];

const LEGEND = [
  { num: '1', color: '#A1A1AA', name: 'Timestamp',   desc: "Recency signal — users judge 'still relevant?' in under 0.5s" },
  { num: '2', color: '#7F77DD', name: 'App icon',    desc: 'First visual processed. Must match your splash screen exactly.' },
  { num: '3', color: '#7F77DD', name: 'App name',    desc: 'Trust anchor before the user reads a single word' },
  { num: '4', color: '#A78BFA', name: 'Title',       desc: '40-char limit. Lead with value, never with brand name.' },
  { num: '5', color: '#22C55E', name: 'Body text',   desc: '73% of users stop here — make it count.' },
  { num: '6', color: '#22C55E', name: 'Rich media',  desc: '+25% open rate on average. Product shots beat stock always.' },
  { num: '7', color: '#F97316', name: 'CTA buttons', desc: 'Max 2. One primary action, one secondary or dismiss.' },
];

export default function AnatomyBlock() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-7 rounded-xl p-6 my-5"
      style={{ background: '#141417', border: '0.5px solid rgba(255,255,255,0.08)', alignItems: 'start' }}
    >
      {/* Left: phone mockup */}
      <div>
        <div
          className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(160deg,#1c1c28,#0d0d14)', boxShadow: '0 16px 40px rgba(0,0,0,0.55)' }}
        >
          {/* Notification mock */}
          <div
            className="rounded-xl flex flex-col gap-1"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '0.5px solid rgba(255,255,255,0.18)', padding: '11px 13px' }}
          >
            {ZONES.map(({ color, badges, content }, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
                style={{ borderLeft: `2px solid ${color}`, paddingLeft: '8px', paddingTop: '3px', paddingBottom: '3px' }}
              >
                <div className="flex-1 min-w-0">{content}</div>
                <div className="flex gap-1 flex-shrink-0">
                  {badges.map(({ num, color: bc }) => (
                    <div
                      key={num}
                      className="flex items-center justify-center rounded-full font-mono font-bold"
                      style={{ width: '17px', height: '17px', background: bc, color: '#fff', fontSize: '9px' }}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color key */}
        <div className="flex flex-wrap gap-3 mt-3 px-1">
          {[
            { color: '#7F77DD', label: 'App meta' },
            { color: '#A78BFA', label: 'Title' },
            { color: '#22C55E', label: 'Content' },
            { color: '#F97316', label: 'Action' },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1 font-mono" style={{ fontSize: '10px', color }}>
              <span className="rounded-full inline-block" style={{ width: '8px', height: '8px', background: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Right: legend */}
      <div className="flex flex-col gap-1">
        {LEGEND.map(({ num, color, name, desc }) => (
          <div
            key={num}
            className="flex items-start gap-2.5 rounded-lg p-2 transition-colors"
            style={{ cursor: 'default' }}
          >
            <div
              className="flex items-center justify-center rounded-full font-mono font-bold flex-shrink-0 mt-0.5"
              style={{ width: '20px', height: '20px', background: color, color: '#fff', fontSize: '10px' }}
            >
              {num}
            </div>
            <div>
              <p className="font-mono uppercase tracking-[0.06em] text-muted-light mb-0.5" style={{ fontSize: '10px' }}>
                {name}
              </p>
              <p className="font-sans text-muted-light leading-snug" style={{ fontSize: '11px' }}>
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
