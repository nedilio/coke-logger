import { Button } from "@/components/ui/button";
import { signOutAction } from "@/server/users";
import { requireAuth } from "@/lib/auth-helpers";

export default async function DashboardPage() {
  // Require authentication - redirects to /login if not authenticated
  const session = await requireAuth();
  const { username } = session.user;
  return (
    <div>
      <h1>Dasboard</h1>
      <p>Welcome to the dashboard, {username}!</p>
      <form action={signOutAction}>
        <Button>Sign Out</Button>
      </form>
    </div>
  );
}
