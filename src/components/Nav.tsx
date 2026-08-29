import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';

const links = [
  { label: 'Origin', href: '#origin' },
  { label: 'Becoming', href: '#becoming' },
  { label: 'Learning', href: '#learning' },
  { label: 'Form', href: '#form' },
  { label: 'Next', href: '#next' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled ? 'bg-ink-950/70 backdrop-blur-md py-3' : 'py-6'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="font-display text-sm font-medium tracking-2xl text-white/90 transition-opacity hover:opacity-100"
          aria-label="Aavash Regmi — home"
        >
          <span className="text-aurora-300">A</span>R
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="mono-label text-white/45 transition-colors duration-300 hover:text-white/90"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/aavashregmi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/55 transition-colors hover:text-white"
          aria-label="Aavash Regmi on GitHub"
        >
          <Github className="h-4 w-4" />
          <span className="mono-label hidden sm:inline">GitHub</span>
        </a>
      </nav>
    </header>
  );
}
