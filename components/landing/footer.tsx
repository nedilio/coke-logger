import Link from "next/link";
import { LEGAL_CONTACT_EMAIL } from "@/components/legal-page";

export function Footer(): React.ReactElement {
  return (
    <footer className="relative z-10 py-12 px-6 text-center border-t border-white/10">
      <nav className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
        <Link href="/privacy" className="transition-colors hover:text-white">
          Privacidad
        </Link>
        <Link href="/terms" className="transition-colors hover:text-white">
          Términos
        </Link>
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className="transition-colors hover:text-white">
          Contacto
        </a>
      </nav>
      <p className="mb-2 text-white/40">
        © 2026 Coke Logger • Hecho con ❤️ y mucha Coca-Cola
      </p>
      <p className="text-sm text-white/30">
        No estamos afiliados con The Coca-Cola Company
      </p>
    </footer>
  );
}
