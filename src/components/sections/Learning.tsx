import { GraduationCap, BookOpen, Award } from 'lucide-react';

export function Learning() {
  return (
    <section
      id="learning"
      className="relative mx-auto max-w-6xl px-6 py-32 md:py-48"
      aria-labelledby="learning-heading"
    >
      <p className="reveal mono-label mb-6 text-aurora-300/80">03 — Learning</p>

      <h2
        id="learning-heading"
        className="reveal reveal-delay-1 font-display text-3xl font-light text-white/90 sm:text-4xl text-balance"
      >
        What has shaped the draft so far
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {/* Education */}
        <article className="reveal reveal-delay-1 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 hover:border-aurora-400/30 hover:bg-white/[0.04] md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-aurora-300" />
            <span className="mono-label text-white/40">Education</span>
          </div>
          <h3 className="font-display text-2xl font-medium text-white md:text-3xl">
            Xavier International College
          </h3>
          <p className="mt-3 text-white/55">Higher Secondary Education (+2)</p>
          <p className="mt-1 text-white/70">Science — Computer Science</p>

          <div className="mt-8 flex items-baseline gap-3 border-t border-white/10 pt-6">
            <span className="mono-label text-white/35">GPA</span>
            <span className="font-display text-4xl font-light text-aurora-300">3.92</span>
          </div>

          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-aurora-400/5 blur-3xl transition-opacity duration-500 group-hover:bg-aurora-400/10"
            aria-hidden="true"
          />
        </article>

        {/* Certification / independent learning */}
        <article className="reveal reveal-delay-2 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 hover:border-ember-400/30 hover:bg-white/[0.04] md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-ember-400" />
            <span className="mono-label text-white/40">Independent Learning</span>
          </div>
          <h3 className="font-display text-2xl font-medium text-white md:text-3xl">
            JavaScript Algorithms &amp; Data Structures
          </h3>
          <p className="mt-3 flex items-center gap-2 text-white/55">
            <Award className="h-4 w-4 text-ember-400/70" />
            freeCodeCamp
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/45">
            A foundation in thinking in structures — breaking problems down, building them
            back up. Part of the journey, not the whole of it.
          </p>

          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-ember-400/5 blur-3xl transition-opacity duration-500 group-hover:bg-ember-400/10"
            aria-hidden="true"
          />
        </article>
      </div>

      <p className="reveal reveal-delay-3 mt-12 max-w-2xl text-pretty text-sm leading-relaxed text-white/40">
        This section is built to grow. As more is learned and earned, it joins the record
        here — each entry another revision to the draft.
      </p>
    </section>
  );
}
