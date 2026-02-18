import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo / Icono SVG Coca-Cola */}
        <div className="mb-8 float-animation">
          <div className="inline-block p-6 rounded-full glass-effect shine">
            <svg
              className="w-20 h-20 md:w-32 md:h-32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35 15 C35 15, 32 12, 35 10 L40 10 C43 12, 40 15, 40 15 L38 25 L37 25 Z"
                fill="white"
                opacity="0.9"
              />
              <ellipse cx="50" cy="50" rx="20" ry="35" fill="white" opacity="0.95" />
              <ellipse cx="50" cy="50" rx="18" ry="33" fill="#DC2626" />
              <path
                d="M35 30 Q50 35, 65 30"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
              <circle cx="45" cy="40" r="3" fill="white" opacity="0.6" />
              <circle cx="52" cy="45" r="2" fill="white" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span className="block">Trackea tu</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-white">
            Adicción a la Coca
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-red-100 mb-4 max-w-2xl mx-auto font-light">
          La app definitiva para saber cuánta Coca-Cola tomas realmente
        </p>

        {/* Descripción */}
        <p className="text-base md:text-lg text-red-200 mb-12 max-w-xl mx-auto">
          Registra cada lata, botella o vaso. Obtén estadísticas increíbles.
          Descubre si eres team Original, Zero o Light. 🥤
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            asChild
            size="lg"
            className="bg-white text-red-600 hover:bg-red-50 font-bold text-lg px-8 py-6 rounded-xl shadow-2xl shine transform hover:scale-105 transition duration-300"
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
            className="glass-effect border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-6 rounded-xl"
          >
            <Link href="/login">
              <LogIn className="h-5 w-5 mr-2" />
              Iniciar Sesión
            </Link>
          </Button>
        </div>

        {/* Badge inferior */}
        <div className="glass-effect rounded-full px-8 py-3 inline-block">
          <span className="text-sm font-semibold">✨ Gratis • Simple • Divertido</span>
        </div>
      </div>
    </div>
  );
}
