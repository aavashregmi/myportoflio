import { Github, Sparkles } from 'lucide-react';

export function Form() {
  return (
    <section
      id="form"
      className="relative mx-auto max-w-6xl px-6 py-32 md:py-48"
      aria-labelledby="form-heading"
    >
      <p className="reveal mono-label mb-6 text-signal-400/80">04 — Form</p>

      <h2
        id="form-heading"
        className="reveal reveal-delay-1 font-display text-3xl font-light text-white/90 sm:text-4xl text-balance"
      >
        What is being built
      </h2>

      <p className="reveal reveal-delay-2 mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/50">
        The work is early — and that&apos;s the point. What matters is that it&apos;s
        happening at all. This space holds what exists now and waits for what comes next.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {/* The GitHub presence — real, honest anchor */}
        <a
          href="https://github.com/aavashregmi"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal reveal-delay-1 group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 hover:border-signal-400/30 hover:bg-white/[0.04]"
        >
          <div>
            <Github className="h-6 w-6 text-white/70" />
            <h3 className="mt-6 font-display text-xl text-white">The work, in progress</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Everything built so far lives in the open. Experiments, exercises, the
              first shapes of something larger.
            </p>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 mono-label text-signal-300 transition-transform duration-300 group-hover:translate-x-1">
            View on GitHub
          </span>
          <div
            className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-signal-400/5 blur-2xl transition-opacity duration-500 group-hover:bg-signal-400/15"
            aria-hidden="true"
          />
        </a>

        {/* Placeholder for future work — architecturally ready */}
        <div className="reveal reveal-delay-2 flex flex-col justify-between rounded-2xl border border-dashed border-white/10 bg-transparent p-8">
          <div>
            <Sparkles className="h-6 w-6 text-white/30" />
            <h3 className="mt-6 font-display text-xl text-white/50">Next experiment</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/35">
              Reserved for the next thing built. The architecture here is ready — when
              the work exists, it takes this place.
            </p>
          </div>
          <span className="mt-8 mono-label text-white/25">Pending</span>
        </div>

        {/* Reserved — growth slot */}
        <div className="reveal reveal-delay-3 flex flex-col justify-between rounded-2xl border border-dashed border-white/10 bg-transparent p-8">
          <div>
            <Sparkles className="h-6 w-6 text-white/30" />
            <h3 className="mt-6 font-display text-xl text-white/50">And the one after</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/35">
              A reminder that this is a living document. More slots appear as the draft
              grows.
            </p>
          </div>
          <span className="mt-8 mono-label text-white/25">Pending</span>
        </div>
      </div>
    </section>
  );
}
