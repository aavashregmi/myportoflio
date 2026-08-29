import { ArrowUpRight } from 'lucide-react';

export function Next() {
  return (
    <section
      id="next"
      className="relative mx-auto max-w-5xl px-6 py-32 md:py-56"
      aria-labelledby="next-heading"
    >
      <p className="reveal mono-label mb-6 text-ember-400/80">05 — Next</p>

      <h2
        id="next-heading"
        className="reveal reveal-delay-1 display-mega text-4xl leading-[0.95] text-white/90 sm:text-6xl md:text-7xl text-balance"
      >
        The future is{' '}
        <span className="serif-italic font-light text-aurora-300">unwritten.</span>
      </h2>

      <div className="mt-12 max-w-2xl space-y-6 text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
        <p className="reveal reveal-delay-2">
          Aavash has not decided what he will be — only that he will keep becoming. The
          next few years are an open question, and open questions are where the most
          interesting people live.
        </p>
        <p className="reveal reveal-delay-3">
          If you are curious about the draft so far, the work in progress, or where the
          path might lead — that curiosity is welcome.
        </p>
      </div>

      <div className="reveal reveal-delay-3 mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href="https://github.com/aavashregmi"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 text-sm text-white/85 transition-all duration-500 hover:border-aurora-400/50 hover:bg-aurora-400/5"
        >
          Follow the work
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <a
          href="https://aavashregmi.com.np"
          className="mono-label text-white/35 transition-colors hover:text-white/70"
        >
          aavashregmi.com.np
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg text-white/85">
            Aavash Regmi
          </p>
          <p className="mt-1 mono-label text-white/35">
            A living document · Version now
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/aavashregmi"
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label text-white/40 transition-colors hover:text-white/80"
          >
            GitHub
          </a>
          <span className="mono-label text-white/25">Nepal</span>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs leading-relaxed text-white/25">
        An identity, not a résumé. Built to evolve.
      </p>
    </footer>
  );
}
