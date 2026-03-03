import { getDashboardStatsAction, getCokeLogsAction } from "@/server/coke-logs";
import { DashboardStats } from "@/components/dashboard-stats";
import { CokeLogsTable } from "@/components/coke-logs-table";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function DashboardPage() {
  // Fetch data in parallel
  const [stats, logs] = await Promise.all([
    getDashboardStatsAction(),
    getCokeLogsAction(),
  ]);

  return (
    <div className="container mx-auto px-2 sm:px-4 space-y-6 sm:space-y-8">
      <AppHeader
        title="Dashboard"
        description="Tus datos de consumo de cokita en un vistazo"
        actions={
          <Button asChild size="default">
            <Link href="/create">
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar registro
            </Link>
          </Button>
        }
      />

      {/* Stats cards */}
      <DashboardStats {...stats} />

      {/* Recent logs table - Show last 20 */}
      <CokeLogsTable logs={logs.slice(0, 20)} />
    </div>
  );
}
