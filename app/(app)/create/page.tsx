import { CokeLogForm } from "@/components/coke-log-form";

export default function CreatePage() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Add New Entry</h1>
        <p className="text-muted-foreground">
          Track your Coca-Cola consumption
        </p>
      </header>

      <main>
        <CokeLogForm />
      </main>
    </div>
  );
}
