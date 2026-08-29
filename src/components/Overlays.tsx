export function GrainLayer() {
  return (
    <div
      className="grain-layer"
      aria-hidden="true"
    />
  );
}

export function CursorGlow() {
  return <div className="cursor-glow" aria-hidden="true" />;
}

/** A thin scroll-progress indicator pinned to the top of the viewport. */
export function ScrollProgress({ progress }: { progress: React.MutableRefObject<number> }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-px bg-transparent" aria-hidden="true">
      <div
        ref={(el) => {
          if (!el) return;
          const update = () => {
            el.style.transform = `scaleX(${progress.current})`;
            requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
        }}
        className="h-full origin-left bg-gradient-to-r from-aurora-400 via-signal-400 to-ember-400"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
