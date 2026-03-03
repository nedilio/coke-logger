import { BubblesBg } from "@/components/landing/bubbles-bg";
import { BackToHomeButton } from "@/components/back-to-home-button";

interface AuthLayoutWrapperProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

export function AuthLayoutWrapper({ 
  children, 
  showBackButton = true 
}: AuthLayoutWrapperProps) {
  return (
    <div className="relative min-h-screen noir-bg overflow-x-hidden text-white">
      <div className="noise-overlay" />
      <BubblesBg />
      {showBackButton && <BackToHomeButton />}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md fade-in-up">
          {children}
        </div>
      </div>
    </div>
  );
}
