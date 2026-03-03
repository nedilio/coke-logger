const steps = [
  {
    number: 1,
    title: "Crea tu cuenta",
    description: "En menos de 1 minuto estás listo"
  },
  {
    number: 2,
    title: "Registra cada Coca-Cola",
    description: "Tipo, formato, tamaño. 3 clicks y listo"
  },
  {
    number: 3,
    title: "Ve tus estadísticas",
    description: "Gráficos, métricas y descubrimientos sobre ti"
  }
];

export function HowItWorks() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl fade-in-up">
          Cómo funciona
        </h2>
        <p className="mb-12 text-center text-lg text-white/50 md:text-xl fade-in-up stagger-1">
          Solo 3 pasos para empezar a trackear
        </p>

        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="card-noir group flex items-center gap-6 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] border-glow fade-in-up stagger-2"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-3xl font-bold text-white glow-red">
                {step.number}
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">{step.title}</h3>
                <p className="text-white/50">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
