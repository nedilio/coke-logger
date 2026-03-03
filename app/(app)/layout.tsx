import { requireAuth } from "@/lib/auth-helpers";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Single auth check for all routes in this group
  const session = await requireAuth();
  const username = session.user.username || session.user.email || "User";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full noir-bg">
        <AppSidebar username={username} />
        <SidebarInset className="flex-1 bg-transparent">
          <div className="noise-overlay" />
          <div className="relative z-10 p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
