import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-6xl font-bold">Coke Logger</h1>
        <Link href="/signup" className="text-blue-500 underline">
          Don&apos;t have an account? Sign up
        </Link>
        <Link href="/login" className="text-blue-500 underline">
          Already have an account? Log in
        </Link>
      </main>
    </div>
  );
}
