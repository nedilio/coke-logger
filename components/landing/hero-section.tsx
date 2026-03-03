import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8 fade-in-up">
          <div className="inline-block p-8 rounded-full glass glow-red shine">
            <svg
              className="w-20 h-20 md:w-32 md:h-32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="50" cy="50" rx="20" ry="35" fill="white" opacity="0.95" />
              <ellipse cx="50" cy="50" rx="18" ry="33" fill="url(#cokeGradient)" />
              <path
                d="M35 30 Q50 35, 65 30"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
              <circle cx="45" cy="40" r="3" fill="white" opacity="0.6" />
              <circle cx="52" cy="45" r="2" fill="white" opacity="0.5" />
              <defs>
                <linearGradient id="cokeGradient" x1="35" y1="20" x2="65" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#DC2626" />
                  <stop offset="1" stopColor="#991B1B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight fade-in-up stagger-1">
          <span className="block text-white/80">Trackea tu</span>
          <span className="block text-gradient">
            Adicción a la Coca
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-2xl mx-auto font-light fade-in-up stagger-2">
          La app definitiva para saber cuánta Coca-Cola tomas realmente
        </p>

        <p className="text-base md:text-lg text-white/50 mb-12 max-w-xl mx-auto fade-in-up stagger-3">
          Registra cada lata, botella o vaso. Obtén estadísticas incredible.
          Descubre si eres team Original, Zero o Light.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up stagger-4">
          <Button
            asChild
            size="lg"
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-lg px-8 py-6 rounded-xl glow-red transition-all duration-300 hover:scale-105"
          >
            <Link href="/signup">
              <Sparkles className="h-5 w-5 mr-2" />
              Crear Cuenta Gratis
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="glass border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-semibold text-lg px-8 py-6 rounded-xl transition-all duration-300"
          >
            <Link href="/login">
              <LogIn className="h-5 w-5 mr-2" />
              Iniciar Sesión
            </Link>
          </Button>
        </div>

        <div className="glass rounded-full px-8 py-3 inline-block fade-in-up stagger-5">
          <span className="text-sm font-semibold text-white/60">100% Gratis • Simple • Privado</span>
        </div>
      </div>
    </div>
  );
}
