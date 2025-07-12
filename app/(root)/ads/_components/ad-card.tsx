import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Send, CircleCheckBig } from "lucide-react";

interface Ad {
  id: number;
  productName: string;
  adTitle: string;
  shortCopy: string;
  ctaButtons: string[];
  thumbnailImage?: string;
  status: "draft" | "approved" | "published";
  dateCreated: string;
}

interface AdCardProps {
  ad: Ad;
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
}

const AdCard = ({
  ad,
  onViewDetails,
  onEdit,
  onDelete,
  onPublish,
}: AdCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "approved":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "published":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-4">
        {/* Thumbnail Image */}
        <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden mb-4">
          {ad.thumbnailImage ? (
            <img
              src={ad.thumbnailImage}
              alt={ad.productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="flex justify-between items-start mb-2">
          <Badge className={getStatusColor(ad.status)}>
            {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
          </Badge>
          <span className="text-xs text-gray-500">{ad.dateCreated}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
          {ad.productName}
        </h3>

        {/* Ad Title */}
        <h4 className="font-medium text-gray-700 text-base">{ad.adTitle}</h4>

        {/* Short Copy Preview */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {truncateText(ad.shortCopy, 20)}
        </p>

        {/* CTA Buttons Preview */}
        <div className="flex flex-wrap gap-2">
          {ad.ctaButtons.map((cta, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {cta}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          {/* Primary Action - Publish (if not published) */}

          <Button
            disabled={ad.status === "published"}
            onClick={() => onPublish(ad.id)}
            icon={
              ad.status !== "published" ? (
                <Send className="w-4 h-4" />
              ) : (
                <CircleCheckBig className="w-4 h-4" />
              )
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {ad.status !== "published"
              ? "Publish Campaign"
              : "Campaign Published"}
          </Button>

          {/* Secondary Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(ad.id)}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(ad.id)}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(ad.id)}
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdCard;
