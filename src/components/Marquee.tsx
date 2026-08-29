const phrases = [
  'A student becoming',
  'Nepal',
  'Computer Science',
  'Curiosity over certainty',
  'A draft, not a definition',
  'Xavier International College',
  'The future is unwritten',
  'JavaScript · Algorithms · Data Structures',
  'GPA 3.92',
  'Aavash Regmi',
];

export function Marquee() {
  const doubled = [...phrases, ...phrases];
  return (
    <div
      className="relative overflow-hidden border-y border-white/10 py-6 select-none"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {doubled.map((p, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8">
            <span className="font-display text-sm font-light tracking-2xl text-white/30 uppercase">
              {p}
            </span>
            <span className="text-aurora-400/40">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
