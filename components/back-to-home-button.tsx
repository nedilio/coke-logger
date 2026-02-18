import Link from "next/link";
import { Home } from "lucide-react";

export function BackToHomeButton() {
  return (
    <Link 
      href="/" 
      className="absolute top-6 left-6 z-20 glass-effect px-4 py-2 rounded-full flex items-center gap-2 text-white hover:scale-105 transition-all duration-300"
    >
      <Home className="h-5 w-5" />
      <span className="hidden sm:inline">Volver al inicio</span>
    </Link>
  );
}
