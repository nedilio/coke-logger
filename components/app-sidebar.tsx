"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, User, LogOut, TrophyIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/server/users";
import { CokeLogo } from "@/components/coke-logo";

interface AppSidebarProps {
  username: string;
}

export function AppSidebar({ username }: AppSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/create", label: "Agregar Entrada", icon: PlusCircle },
    { href: "/ranking", label: "Ranking", icon: TrophyIcon },
    { href: "/profile", label: "Perfil", icon: User },
  ];

  return (
    <Sidebar className="border-r border-white/10">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2">
          <CokeLogo className="size-9 drop-shadow-[0_4px_12px_var(--coke-red)]" />
          <span className="font-display text-lg font-bold text-gradient">Coke Logger</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40">Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-coke-red/30 to-transparent text-white shadow-[inset_2px_0_0_var(--coke-red)] hover:bg-coke-red/20 [&_svg]:text-coke-bright"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 space-y-3">
          <p className="text-sm text-white/40">
            Conectado como <span className="font-medium text-white/60">{username}</span>
          </p>
          <form action={signOutAction} className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-white/10 text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
