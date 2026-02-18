import Link from "next/link";
import { Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="glass-effect rounded-3xl bg-black/30 p-12 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Empieza a descubrir tu relación con la Coca-Cola hoy mismo
          </h2>
          <p className="mb-8 text-lg text-red-100 md:text-xl">
            Es gratis, simple y divertido. Crea tu cuenta en segundos.
          </p>
          <Link
            href="/signup"
            className="shine group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-[oklch(47.747%_0.19594_29.223)] transition-all duration-300 hover:scale-105"
          >
            <Rocket className="h-5 w-5" />
            Crear Cuenta Gratis
          </Link>
        </div>
      </div>
    </section>
  );
}
