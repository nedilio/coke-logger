import { AppHeader } from "@/components/app-header";

export default async function ProfilePage() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <AppHeader title="Profile" description="Datos del fan de la Coca-Cola" />

      <main>Pronto podrás editar tus datos</main>
    </div>
  );
}
