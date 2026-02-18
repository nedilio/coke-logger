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
    <div className="container mx-auto p-6 space-y-8">
      <AppHeader
        title="Dashboard"
        description="Your Coca-Cola consumption overview"
        actions={
          <Button asChild size="default">
            <Link href="/create">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Entry
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
