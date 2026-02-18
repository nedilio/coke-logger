import { CokeLogForm } from "@/components/coke-log-form";
import { AppHeader } from "@/components/app-header";

export default function CreatePage() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <AppHeader
        title="Add New Entry"
        description="Track your Coca-Cola consumption"
      />

      <main>
        <CokeLogForm />
      </main>
    </div>
  );
}
