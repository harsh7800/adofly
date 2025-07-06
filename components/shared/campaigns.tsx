import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Eye } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  platform: "Google Ads" | "Meta Ads";
  status: "Active" | "Paused" | "Draft";
  impressions: number;
  spend: number;
  ctr: number;
  conversions: number;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024",
    platform: "Google Ads",
    status: "Active",
    impressions: 45670,
    spend: 1250.3,
    ctr: 3.2,
    conversions: 89,
  },
  {
    id: "2",
    name: "Brand Awareness Q4",
    platform: "Meta Ads",
    status: "Active",
    impressions: 28900,
    spend: 890.75,
    ctr: 2.8,
    conversions: 52,
  },
  {
    id: "3",
    name: "Product Launch",
    platform: "Google Ads",
    status: "Paused",
    impressions: 12340,
    spend: 567.2,
    ctr: 4.1,
    conversions: 34,
  },
];

export function Campaigns() {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Paused":
        return "bg-yellow-100 text-yellow-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Recent Campaigns
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                  Campaign
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                  Platform
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">
                  Status
                </th>
                <th className="text-right py-3 px-2 font-medium text-gray-600 text-sm">
                  Impressions
                </th>
                <th className="text-right py-3 px-2 font-medium text-gray-600 text-sm">
                  Spend
                </th>
                <th className="text-right py-3 px-2 font-medium text-gray-600 text-sm">
                  CTR
                </th>
                <th className="text-right py-3 px-2 font-medium text-gray-600 text-sm">
                  Conversions
                </th>
                <th className="text-center py-3 px-2 font-medium text-gray-600 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr
                  key={campaign.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index === campaigns.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="py-4 px-2">
                    <div className="font-medium text-gray-900 text-sm">
                      {campaign.name}
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm text-gray-600">
                      {campaign.platform}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <Badge
                      className={`${getStatusColor(campaign.status)} text-xs`}
                    >
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="text-sm font-medium text-gray-900">
                        {formatNumber(campaign.impressions)}
                      </span>
                      <ArrowUp className="h-3 w-3 text-green-500" />
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(campaign.spend)}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="text-sm font-medium text-gray-900">
                        {campaign.ctr}%
                      </span>
                      {campaign.ctr > 3 ? (
                        <ArrowUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {campaign.conversions}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4 text-gray-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
