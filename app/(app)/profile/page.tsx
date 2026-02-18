import { AppHeader } from "@/components/app-header";

export default async function ProfilePage() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <AppHeader
        title="Profile"
        description="Track your Coca-Cola consumption"
      />

      <main>Profile form</main>
    </div>
  );
}
