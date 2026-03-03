import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, Coffee, Droplets, Calendar } from "lucide-react";

interface DashboardStatsProps {
  totalLogs: number;
  logsThisWeek: number;
  favoriteType: string;
  favoriteSizeML: number;
  mlThisWeek: number;
  mlThisMonth: number;
}

const statCards = [
  {
    title: "Has registrado",
    getValue: (props: DashboardStatsProps) => `${props.totalLogs} cokitas`,
    icon: FlaskConical,
    color: "text-[#DC2626]",
    bgColor: "bg-[#DC2626]/10",
  },
  {
    title: "Esta semana tomaste",
    getValue: (props: DashboardStatsProps) =>
      props.mlThisWeek > 1000
        ? `${(props.mlThisWeek / 1000).toFixed(2)}L`
        : `${props.mlThisWeek}ml`,
    icon: Droplets,
    color: "text-[#00f5ff]",
    bgColor: "bg-[#00f5ff]/10",
  },
  {
    title: "Eres fan de la cokita",
    getValue: (props: DashboardStatsProps) => (
      <span className="capitalize">{props.favoriteType}</span>
    ),
    icon: Coffee,
    color: "text-[#ff00ff]",
    bgColor: "bg-[#ff00ff]/10",
  },
  {
    title: "Este mes llevas consumidos",
    getValue: (props: DashboardStatsProps) =>
      props.mlThisMonth > 1000
        ? `${(props.mlThisMonth / 1000).toFixed(2)}L`
        : `${props.mlThisMonth}ml`,
    icon: Calendar,
    color: "text-[#39ff14]",
    bgColor: "bg-[#39ff14]/10",
  },
];

export function DashboardStats(props: DashboardStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, idx) => (
        <Card
          key={idx}
          className="card-noir border-white/5 hover:border-[#DC2626]/20 transition-all duration-300"
        >
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-white/60">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stat.getValue(props)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
