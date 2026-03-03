import { redirectIfAuthenticated } from "@/lib/auth-helpers";
import { BubblesBg } from "@/components/landing/bubbles-bg";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export const metadata = {
  title: "Coke Logger - Trackea tu consumo de Coca-Cola",
  description: "La app definitiva para saber cuánta Coca-Cola tomas realmente. Registra cada lata, botella o vaso. Obtén estadísticas increíbles.",
  keywords: ["coca-cola", "tracking", "estadísticas", "consumo"],
  openGraph: {
    title: "Coke Logger - Trackea tu consumo de Coca-Cola",
    description: "Registra cada Coca-Cola que tomas y descubre tus patrones de consumo",
    type: "website",
  },
};

export default async function Home() {
  // Redirect authenticated users to dashboard
  await redirectIfAuthenticated();

  return (
    <div className="relative min-h-screen noir-bg overflow-x-hidden text-white">
      <div className="noise-overlay" />
      <BubblesBg />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
