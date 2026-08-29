export function Origin() {
  return (
    <section
      id="origin"
      className="relative mx-auto max-w-5xl px-6 py-32 md:py-48"
      aria-labelledby="origin-heading"
    >
      <p className="reveal mono-label mb-6 text-ember-400/80">01 — Origin</p>

      <h2
        id="origin-heading"
        className="reveal reveal-delay-1 font-display text-3xl font-light leading-tight text-white/90 sm:text-4xl md:text-5xl text-balance"
      >
        Who is Aavash Regmi?
      </h2>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div className="space-y-6 text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
          <p className="reveal reveal-delay-1">
            <span className="text-white/90">Aavash Regmi</span> is an eighteen-year-old
            student from Nepal who completed Higher Secondary Education (+2) in{' '}
            <span className="text-white/80">Science — Computer Science</span> at{' '}
            <span className="text-white/80">Xavier International College</span>, graduating
            with a GPA of <span className="text-aurora-300">3.92</span>.
          </p>
          <p className="reveal reveal-delay-2">
            Alongside the classroom, he has pursued learning on his own terms — including
            JavaScript Algorithms and Data Structures through freeCodeCamp — not to collect
            titles, but to understand how things work beneath the surface.
          </p>
          <p className="reveal reveal-delay-3 serif-italic text-lg leading-relaxed text-white/70">
            He is not yet what he will become. He is the space between curiosity and
            direction — a mind gathering the materials of a future it hasn&apos;t chosen yet.
          </p>
        </div>

        <aside className="reveal reveal-delay-2 border-l border-white/10 pl-6 md:pl-8">
          <dl className="space-y-7">
            <div>
              <dt className="mono-label mb-1 text-white/35">Name</dt>
              <dd className="font-display text-lg text-white/90">Aavash Regmi</dd>
            </div>
            <div>
              <dt className="mono-label mb-1 text-white/35">Based in</dt>
              <dd className="font-display text-lg text-white/90">Nepal</dd>
            </div>
            <div>
              <dt className="mono-label mb-1 text-white/35">Status</dt>
              <dd className="font-display text-lg text-aurora-300">Student</dd>
            </div>
            <div>
              <dt className="mono-label mb-1 text-white/35">Focus</dt>
              <dd className="font-display text-lg text-white/80">Computer Science</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
