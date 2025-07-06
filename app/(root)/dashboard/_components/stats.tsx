import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Eye, MousePointer } from "lucide-react";

const stats = [
  {
    title: "Total Spend",
    value: "$2,708.25",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Impressions",
    value: "86,910",
    change: "+8.2%",
    trend: "up",
    icon: Eye,
    color: "text-blue-600",
  },
  {
    title: "Click-through Rate",
    value: "3.4%",
    change: "+0.3%",
    trend: "up",
    icon: MousePointer,
    color: "text-purple-600",
  },
  {
    title: "Conversions",
    value: "175",
    change: "+15.8%",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-600",
  },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
