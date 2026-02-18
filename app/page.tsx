import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-card sm:items-start">
        <h1 className="text-6xl font-bold">Coke Logger</h1>
        <Button asChild variant="link">
          <Link href="/signup">Don&apos;t have an account? Sign up</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/login">Already have an account? Log in</Link>
        </Button>
      </main>
    </div>
  );
}
