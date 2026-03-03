import { BarChart3, Target, Trophy } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Estadísticas Detalladas",
    description: "Ve cuántos litros tomas al mes, qué formato prefieres y tu evolución en el tiempo",
    color: "text-[#00f5ff]",
    borderColor: "hover:border-[#00f5ff]/30",
  },
  {
    icon: Target,
    title: "Tracking Simple",
    description: "Registra en segundos: tipo, formato y tamaño. Así de fácil.",
    color: "text-[#ff00ff]",
    borderColor: "hover:border-[#ff00ff]/30",
  },
  {
    icon: Trophy,
    title: "Descubre Patrones",
    description: "¿Tomas más en fin de semana? ¿Prefieres lata o botella? Conoce tus hábitos",
    color: "text-[#39ff14]",
    borderColor: "hover:border-[#39ff14]/30",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl fade-in-up">
          ¿Qué hace especial a <span className="text-gradient">Coke Logger</span>?
        </h2>
        <p className="mb-12 text-center text-lg text-white/50 md:text-xl fade-in-up stagger-1">
          Todo lo que necesitas para entender tu consumo de Coca-Cola
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`card-noir group rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${feature.borderColor} fade-in-up stagger-${idx + 2}`}
            >
              <div className={`mb-6 ${feature.color}`}>
                <feature.icon className="h-12 w-12" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">{feature.title}</h3>
              <p className="text-white/50">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
