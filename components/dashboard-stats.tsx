import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  totalLogs: number;
  logsThisWeek: number;
  favoriteType: string;
  favoriteSizeML: number;
  mlThisWeek: number;
  mlThisMonth: number;
}

export function DashboardStats({
  totalLogs,
  logsThisWeek,
  mlThisWeek,
  mlThisMonth,
  favoriteType,
  favoriteSizeML,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Has registrado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLogs} cokitas</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Esta semana tomaste
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mlThisWeek > 1000
              ? `${(mlThisWeek / 1000).toFixed(2)}L`
              : `${mlThisWeek}ml`}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Eres fan de la cokita
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{favoriteType}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Este mes llevas consumidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mlThisMonth > 1000
              ? `${(mlThisMonth / 1000).toFixed(2)}L`
              : `${mlThisMonth}ml`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
