interface Persona {
  avatar: string;
  name: string;
  age: number;
  meta: string[];
  bio: string;
  painpointsLabel: string;
  painpoints: string[];
}

interface PersonaGridProps {
  personas: Persona[];
}

export default function PersonaGrid({ personas }: PersonaGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
      {personas.map(({ avatar, name, age, meta, bio, painpointsLabel, painpoints }) => (
        <div
          key={name}
          className="bg-surface-raised border border-surface-border rounded-xl p-6 relative overflow-hidden"
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, var(--case-accent), transparent)` }}
            aria-hidden="true"
          />

          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-surface-DEFAULT border border-surface-border flex items-center justify-center text-2xl mb-4">
            {avatar}
          </div>

          {/* Name + age */}
          <h4
            className="font-display font-medium text-off-white mb-1"
            style={{ fontSize: 'var(--step-1)' }}
          >
            {name}, {age}
          </h4>

          {/* Meta tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {meta.map((tag) => (
              <span
                key={tag}
                className="text-muted-light bg-surface-DEFAULT border border-surface-border rounded px-2 py-0.5 font-sans"
                style={{ fontSize: 'var(--step--1)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p
            className="text-muted-light leading-relaxed mb-4"
            style={{ fontSize: 'var(--step--1)' }}
          >
            {bio}
          </p>

          {/* Painpoints */}
          <p
            className="font-mono uppercase tracking-[0.1em] mb-3"
            style={{ fontSize: 'var(--step--1)', color: 'var(--case-accent)' }}
          >
            {painpointsLabel}
          </p>
          <ul className="flex flex-col gap-2">
            {painpoints.map((point, i) => (
              <li
                key={i}
                className="text-muted-light pl-4 relative leading-snug"
                style={{ fontSize: 'var(--step--1)' }}
              >
                <span
                  className="absolute left-0 top-1.5 w-1 h-1 rounded-full"
                  style={{ background: 'var(--case-accent)' }}
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
