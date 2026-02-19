import { CokeLogForm } from "@/components/coke-log-form";
import { AppHeader } from "@/components/app-header";

export default function CreatePage() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <AppHeader
        title="Agregar Cokita"
        description="Registra tu consumo de Coca-Cola"
      />

      <main>
        <CokeLogForm />
      </main>
    </div>
  );
}
