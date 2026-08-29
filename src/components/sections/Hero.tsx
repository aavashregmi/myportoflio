import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      aria-label="Introduction"
    >
      <div className="vignette" />

      <p className="reveal mono-label mb-8 text-aurora-300/80">
        Digital Identity · Nepal
      </p>

      <h1 className="reveal reveal-delay-1 display-mega text-white text-balance">
        <span className="block text-[clamp(2.75rem,11vw,9.5rem)]">AAVASH</span>
        <span className="block text-[clamp(2.75rem,11vw,9.5rem)] gradient-text">REGMI</span>
      </h1>

      <p className="reveal reveal-delay-2 mt-10 max-w-xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
        A student{' '}
        <span className="serif-italic text-white/85">in the process of becoming</span>{' '}
        — an identity not yet finished, a future still being written, one line of curiosity at a time.
      </p>

      <div className="reveal reveal-delay-3 mt-14 flex flex-col items-center gap-3">
        <a
          href="#origin"
          className="group flex flex-col items-center gap-2 text-white/40 transition-colors hover:text-white/80"
          aria-label="Scroll to begin"
        >
          <span className="mono-label">Begin</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
