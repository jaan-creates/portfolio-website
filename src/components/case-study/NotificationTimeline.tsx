export type TimelineType = 'normal' | 'repeated' | 'odd';

interface TimelineEntry {
  time: string;
  message: string;
  type: TimelineType;
  tag?: string;
}

interface NotificationTimelineProps {
  title: string;
  warningLabel?: string;
  entries: TimelineEntry[];
}

const DOT_COLOR: Record<TimelineType, string> = {
  normal:   '#7F77DD',
  repeated: '#F97316',
  odd:      'rgba(239,68,68,0.8)',
};

const TIME_COLOR: Record<TimelineType, string> = {
  normal:   '#6B7280',
  repeated: '#6B7280',
  odd:      'rgba(239,68,68,0.7)',
};

export default function NotificationTimeline({
  title,
  warningLabel,
  entries,
}: NotificationTimelineProps) {
  return (
    <div
      className="rounded-xl p-5 my-4"
      style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <p
          className="font-mono uppercase tracking-[0.1em] text-muted-light"
          style={{ fontSize: '9px' }}
        >
          {title}
        </p>
        {warningLabel && (
          <span
            className="inline-flex items-center gap-1 font-mono rounded-full px-2 py-0.5"
            style={{
              fontSize: '9px',
              background: 'rgba(249,115,22,0.12)',
              border: '0.5px solid rgba(249,115,22,0.35)',
              color: '#F97316',
            }}
          >
            {warningLabel}
          </span>
        )}
      </div>

      {/* Entries */}
      <div className="flex flex-col gap-1.5">
        {entries.map(({ time, message, type, tag }, i) => (
          <div key={i} className="flex items-center gap-2.5">
            {/* Time */}
            <span
              className="font-mono text-right flex-shrink-0"
              style={{ fontSize: '10px', color: TIME_COLOR[type], width: '60px' }}
            >
              {time}
            </span>
            {/* Dot */}
            <span
              className="flex-shrink-0 rounded-full"
              style={{ width: '7px', height: '7px', background: DOT_COLOR[type], minWidth: '7px' }}
              aria-hidden="true"
            />
            {/* Message */}
            <p
              className="font-sans text-muted-light flex-1 leading-snug"
              style={{ fontSize: '12px' }}
            >
              {message}
            </p>
            {/* Tag */}
            {tag && (
              <span
                className="font-mono flex-shrink-0 rounded px-1.5 py-0.5"
                style={{
                  fontSize: '8px',
                  background:
                    type === 'odd'
                      ? 'rgba(239,68,68,0.12)'
                      : 'rgba(249,115,22,0.12)',
                  color:
                    type === 'odd' ? '#fca5a5' : '#F97316',
                }}
              >
                {tag}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
