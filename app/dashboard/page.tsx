import { Button } from "@/components/ui/button";
import { signOutAction } from "@/server/users";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dasboard</h1>
      <p>Welcome to the dashboard!</p>
      <form action={signOutAction}>
        <Button>Sign Out</Button>
      </form>
    </div>
  );
}
