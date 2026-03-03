import { CokeLogForm } from "@/components/coke-log-form";
import { AppHeader } from "@/components/app-header";

export default function CreatePage() {
  return (
    <div className="container mx-auto px-1 sm:px-4 max-w-full sm:max-w-2xl -mx-1">
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
