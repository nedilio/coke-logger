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
    <Sidebar className="bg-[oklch(0.06_0_0)] border-r border-white/10">
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-bold text-gradient">Coke Logger</h2>
        </div>
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
                          ? "bg-[#DC2626]/20 text-[#DC2626] hover:bg-[#DC2626]/20"
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
