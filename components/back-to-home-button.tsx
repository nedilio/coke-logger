import Link from "next/link";
import { Home } from "lucide-react";

export function BackToHomeButton() {
  return (
    <Link 
      href="/" 
      className="absolute top-6 left-6 z-20 glass px-4 py-2 rounded-full flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
    >
      <Home className="h-5 w-5" />
      <span className="hidden sm:inline">Volver al inicio</span>
    </Link>
  );
}
