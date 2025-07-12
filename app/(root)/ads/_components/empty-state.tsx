"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const EmptyState = () => {
  const router = useRouter();

  return (
    <Card className="border-2 border-dashed border-gray-300">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-blue-600" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No ads generated yet
        </h3>

        <p className="text-gray-600 mb-8 max-w-md">
          Start creating your first AI-powered ad campaign. Our intelligent
          system will help you generate compelling ad copies in minutes.
        </p>

        <Button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Generate your first ad
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
