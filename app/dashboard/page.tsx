import { Button } from "@/components/ui/button";
import { signOutAction } from "@/server/users";
import { requireAuth } from "@/lib/auth-helpers";
import { CokeLogForm } from "@/components/coke-log-form";

export default async function DashboardPage() {
  // Require authentication - redirects to /login if not authenticated
  const session = await requireAuth();
  const { username } = session.user;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {username}!</p>
        </div>
        <form action={signOutAction}>
          <Button variant="outline">Sign Out</Button>
        </form>
      </header>

      <main>
        <CokeLogForm />
      </main>
    </div>
  );
}
