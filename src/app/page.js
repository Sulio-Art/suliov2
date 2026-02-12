import LandingPage from "./Components/Home/FinalCallToActionSection/LandingPage";
import FAQSection from "./Components/Home/FrequentlyAskedQuestionsSection/FAQSection";
import Hero from "./Components/Home/HeroSection/Hero";
import Navbar from "./Components/Home/Navbar/Navbar";
import ProductDisplaySection from "./Components/Home/ProductDisplaySection/ProductDisplay";
import Testimonials from "./Components/Home/TestimonialsSection/Testimonials";
import MarketingStats from "./Components/Home/TestimonialsSection/MarketingStats";
import VideoIntroduction from "./Components/Home/VideoIntroduction/VideoIntroduction";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductDisplaySection />
      <Testimonials />
      <MarketingStats />
      <VideoIntroduction />
      <FAQSection />
      <LandingPage />
    </main>
  );
}
