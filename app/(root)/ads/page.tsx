"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Calendar as CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import EmptyState from "./_components/empty-state";
import AdCard from "./_components/ad-card";
import CreateAdDialog from "./_components/create-ad-dialog";

// Mock data for demonstration
const mockAds = [
  {
    id: 1,
    productName: "Premium Wireless Headphones",
    adTitle: "Experience Crystal Clear Sound",
    shortCopy:
      "Immerse yourself in premium audio quality with our latest wireless headphones featuring noise cancellation...",
    ctaButtons: ["Shop Now", "Learn More"],
    thumbnailImage:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop",
    status: "draft" as const,
    dateCreated: "2024-01-15",
  },
  {
    id: 2,
    productName: "Smart Home Security Camera",
    adTitle: "Protect Your Home 24/7",
    shortCopy:
      "Advanced AI-powered security camera with night vision and smartphone alerts for complete peace of mind...",
    ctaButtons: ["Get Started", "View Demo"],
    thumbnailImage:
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
    status: "approved" as const,
    dateCreated: "2024-01-14",
  },
  {
    id: 3,
    productName: "Organic Pet Food",
    adTitle: "Nourish Your Best Friend",
    shortCopy:
      "Premium organic pet food made with natural ingredients for healthier, happier pets every day...",
    ctaButtons: ["Order Now"],
    thumbnailImage:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop",
    status: "published" as const,
    dateCreated: "2024-01-13",
  },
];

const AdCopiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  // Filter ads based on search and filters
  const filteredAds = mockAds.filter((ad) => {
    const matchesSearch =
      ad.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.adTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAds.length / 6);
  const startIndex = (currentPage - 1) * 6;
  const paginatedAds = filteredAds.slice(startIndex, startIndex + 6);

  const handleViewDetails = (id: number) => {
    console.log("View details for ad:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit ad:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete ad:", id);
  };

  const handlePublish = (id: number) => {
    console.log("Publish ad:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            My AI Generated Ads
          </h1>
          <p className="text-lg text-gray-600">
            View, manage, and launch your AI-generated ad copies.
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search ads by product name or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range Filter */}
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-32 justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "MMM dd") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-32 justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "MMM dd") : "To"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <CreateAdDialog open={open} onOpenChange={setOpen}>
                <Button label="Create Ad" icon={<Plus />} />
              </CreateAdDialog>
            </div>
          </div>
        </Card>

        {/* Content Section */}
        {paginatedAds.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Ad Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedAds.map((ad) => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onPublish={handlePublish}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(Math.max(1, currentPage - 1));
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index + 1}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(index + 1);
                          }}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(Math.min(totalPages, currentPage + 1));
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdCopiesPage;
