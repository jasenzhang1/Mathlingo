import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";

function App() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default App;
