"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

interface AppHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AppHeader({ title, description, actions }: AppHeaderProps) {
  return (
    <header className="flex flex-wrap items-start md:items-center justify-between gap-4 mb-8">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <SidebarTrigger className="md:hidden mt-1 text-white/60 hover:text-white hover:bg-white/10" />
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {description && (
            <p className="text-white/40 mt-1">{description}</p>
          )}
        </div>
      </div>

      {actions && (
        <div className="w-full md:w-auto flex items-center justify-end">
          {actions}
        </div>
      )}
    </header>
  );
}
