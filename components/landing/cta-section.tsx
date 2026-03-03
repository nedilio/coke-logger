import Link from "next/link";
import { Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="card-noir rounded-3xl p-12 text-center border-glow">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl fade-in-up">
            Empieza a descubrir tu relación con la Coca-Cola hoy mismo
          </h2>
          <p className="mb-8 text-lg text-white/50 md:text-xl fade-in-up stagger-1">
            Es gratis, simple y divertido. Crea tu cuenta en segundos.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 glow-red fade-in-up stagger-2"
          >
            <Rocket className="h-5 w-5" />
            Crear Cuenta Gratis
          </Link>
        </div>
      </div>
    </section>
  );
}
