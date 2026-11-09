import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Smartphone, Sparkles } from "lucide-react";
import { CokeLogo } from "@/components/coke-logo";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8 fade-in-up">
          <div className="inline-block rounded-[22%] shine glow-red">
            <CokeLogo className="size-24 md:size-36" />
          </div>
        </div>

        <a
          href="#ios"
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-white/80 transition-colors hover:text-white fade-in-up"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-coke-red opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-coke-red" />
          </span>
          <Smartphone className="size-4" />
          App para iPhone · muy pronto
        </a>

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
            className="btn-coke text-white font-bold text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105"
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
