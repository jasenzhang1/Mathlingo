import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main>
        <Features />
      </main>
      <Footer />
    </div>
  );
}
