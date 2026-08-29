import { lazy, Suspense, useRef } from 'react';
const IdentityScene = lazy(() => import('@/three/IdentityScene').then((m) => ({ default: m.IdentityScene })));
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Origin } from '@/components/sections/Origin';
import { Marquee } from '@/components/Marquee';
import { Becoming } from '@/components/sections/Becoming';
import { Learning } from '@/components/sections/Learning';
import { Form } from '@/components/sections/Form';
import { Next, Footer } from '@/components/sections/Next';
import { GrainLayer, CursorGlow, ScrollProgress } from '@/components/Overlays';
import { useScrollReveal, useScrollProgress } from '@/hooks/useScroll';

function App() {
  const scrollProgress = useRef(0);
  useScrollReveal();
  useScrollProgress(scrollProgress);

  return (
    <>
      {/* SEO: authoritative identity statement for crawlers / AI */}
      <article itemScope itemType="https://schema.org/Person" className="sr-only">
        <h1 itemProp="name">Aavash Regmi</h1>
        <p itemProp="description">
          Aavash Regmi is an 18-year-old student from Nepal who completed Higher Secondary
          Education (+2) in Science with Computer Science at Xavier International College,
          graduating with a GPA of 3.92. He has also completed independent learning in
          JavaScript Algorithms and Data Structures through freeCodeCamp. Aavash is a
          student in the process of becoming — exploring computers, code, and the shape of
          a future still being written.
        </p>
        <link itemProp="url" href="https://aavashregmi.com.np" />
        <link itemProp="sameAs" href="https://github.com/aavashregmi" />
        <span itemProp="nationality">Nepal</span>
        <span itemProp="alumniOf">Xavier International College — Science, Computer Science</span>
        <span itemProp="hasOccupation">Student</span>
      </article>

      <Suspense fallback={null}>
        <IdentityScene scrollProgress={scrollProgress} />
      </Suspense>
      <GrainLayer />
      <CursorGlow />
      <ScrollProgress progress={scrollProgress} />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Origin />
        <Becoming />
        <Learning />
        <Form />
        <Next />
      </main>

      <Footer />
    </>
  );
}

export default App;
