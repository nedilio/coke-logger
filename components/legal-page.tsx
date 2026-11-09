import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CokeLogo } from "@/components/coke-logo";

export const LEGAL_CONTACT_EMAIL = "nediliochile@gmail.com";
export const LEGAL_LAST_UPDATED = "9 de noviembre de 2026";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}

export function LegalPage({ title, intro, sections }: LegalPageProps): React.ReactElement {
  return (
    <div className="relative min-h-screen noir-bg overflow-x-hidden text-white">
      <div className="noise-overlay" />
      <main className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Volver al inicio
        </Link>

        <header className="mb-8 flex items-center gap-4">
          <CokeLogo className="size-14 shrink-0 drop-shadow-[0_6px_18px_var(--coke-red)]" />
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
              Última actualización: {LEGAL_LAST_UPDATED}
            </p>
          </div>
        </header>

        <div className="card-noir p-6 sm:p-10">
          <div className="space-y-4 text-white/75 leading-relaxed">{intro}</div>

          <nav aria-label="Contenido" className="my-8 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Contenido
            </p>
            <ol className="grid gap-1.5 text-sm sm:grid-cols-2">
              {sections.map((section, idx) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-white/70 transition-colors hover:text-coke-bright"
                  >
                    {idx + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-10">
            {sections.map((section, idx) => (
              <section key={section.id} id={section.id} className="scroll-mt-8">
                <h2 className="mb-3 text-xl font-bold text-white">
                  <span className="text-coke-bright">{idx + 1}.</span> {section.title}
                </h2>
                <div className="space-y-3 text-white/70 leading-relaxed [&_a]:text-coke-bright [&_a]:underline-offset-4 hover:[&_a]:underline [&_strong]:text-white [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
            ¿Dudas? Escríbenos a{" "}
            <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className="text-coke-bright hover:underline">
              {LEGAL_CONTACT_EMAIL}
            </a>
            .
          </div>
        </div>

        <Button asChild variant="outline" className="mt-8 w-full sm:w-auto">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </main>
    </div>
  );
}

export function MailLink(): React.ReactElement {
  return <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>;
}
