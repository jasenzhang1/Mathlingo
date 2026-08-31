export function Footer() {
  return (
    <footer className="font-body">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-[var(--ink-soft)] sm:flex-row">
        <p>© {new Date().getFullYear()} Mathlingo</p>
        <p>Duolingo/Anki for math and statistics.</p>
      </div>
    </footer>
  );
}
