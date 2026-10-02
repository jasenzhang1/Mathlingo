import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

const EMAIL = "mathlingo1@gmail.com";

export function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">Contact Us</h1>
        <p className="font-body mt-4 text-lg text-[var(--ink-soft)]">Have questions? We'd love to hear from you.</p>
        <a
          href={`mailto:${EMAIL}`}
          className="font-body mt-10 inline-block rounded-full px-8 py-3 text-base font-semibold text-[var(--accent-ink)] shadow-sm transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--accent)" }}
        >
          {EMAIL}
        </a>
      </main>
      <Footer />
    </div>
  );
}
