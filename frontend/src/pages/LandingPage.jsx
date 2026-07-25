import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Footer from "../components/Footer.jsx";

function LandingPage() {
  return (
    <div className="min-h-screen bg-paper-50 dark:bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
