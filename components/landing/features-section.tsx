export function FeaturesSection() {
  const features = [
    {
      emoji: "📊",
      title: "Estadísticas Detalladas",
      description: "Ve cuántos litros tomas al mes, qué formato prefieres y tu evolución en el tiempo"
    },
    {
      emoji: "🎯",
      title: "Tracking Simple",
      description: "Registra en segundos: tipo, formato y tamaño. Así de fácil."
    },
    {
      emoji: "🏆",
      title: "Descubre Patrones",
      description: "¿Tomas más en fin de semana? ¿Prefieres lata o botella? Conoce tus hábitos"
    }
  ];

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl">
          ¿Qué hace especial a Coke Logger?
        </h2>
        <p className="mb-12 text-center text-lg text-red-100 md:text-xl">
          Todo lo que necesitas para entender tu consumo de Coca-Cola
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-effect group rounded-3xl p-8 transition-all duration-300 hover:scale-105"
            >
              <div className="mb-6 text-6xl">{feature.emoji}</div>
              <h3 className="mb-3 text-2xl font-bold">{feature.title}</h3>
              <p className="text-red-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
