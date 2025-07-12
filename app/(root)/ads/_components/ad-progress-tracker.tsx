"use client";
import { Check, Loader2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type StageStatus = "pending" | "active" | "completed" | "error";

interface Stage {
  id: string;
  title: string;
  status: StageStatus;
  message: string;
}

interface AIAdProgressTrackerProps {
  stages?: Stage[];
  className?: string;
}

const defaultStages: Stage[] = [
  {
    id: "ad-copy",
    title: "Generating Ad Copy",
    status: "completed",
    message: "Completed",
  },
  {
    id: "target-audience",
    title: "Generating Target Audience",
    status: "completed",
    message: "Completed",
  },
  {
    id: "budget-suggestions",
    title: "Generating Budget Suggestions",
    status: "active",
    message: "In Progress...",
  },
  {
    id: "generating-image",
    title: "Generating Image",
    status: "pending",
    message: "Waiting...",
  },
  {
    id: "finalizing",
    title: "Finalizing Ad Creative",
    status: "pending",
    message: "Waiting...",
  },
];

const StatusIcon = ({ status }: { status: StageStatus }) => {
  switch (status) {
    case "completed":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
      );
    case "active":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
        </div>
      );
    case "error":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
        </div>
      );
    case "pending":
    default:
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
      );
  }
};

const getStatusColor = (status: StageStatus) => {
  switch (status) {
    case "completed":
      return "text-green-600 dark:text-green-400";
    case "active":
      return "text-blue-600 dark:text-blue-400";
    case "error":
      return "text-red-600 dark:text-red-400";
    case "pending":
    default:
      return "text-gray-500 dark:text-gray-400";
  }
};

const getConnectorColor = (
  currentStatus: StageStatus,
  nextStatus?: StageStatus
) => {
  console.log("nextStatus: ", nextStatus);
  if (currentStatus === "completed") {
    return "bg-green-200 dark:bg-green-800";
  }
  if (currentStatus === "active") {
    return "bg-blue-200 dark:bg-blue-800";
  }
  if (currentStatus === "error") {
    return "bg-red-200 dark:bg-red-800";
  }
  return "bg-gray-200 dark:bg-gray-700";
};

export function AIAdProgressTracker({
  stages = defaultStages,
  className,
}: AIAdProgressTrackerProps) {
  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="space-y-0">
        {stages.map((stage, index) => (
          <div key={stage.id} className="relative">
            <div className="flex items-start space-x-4 pb-8">
              {/* Status Icon */}
              <div className="relative z-10 flex-shrink-0">
                <StatusIcon status={stage.status} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pt-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {stage.title}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-xs font-medium",
                    getStatusColor(stage.status)
                  )}
                >
                  {stage.message}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < stages.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-8 h-8 w-px -translate-x-1/2 transform",
                  getConnectorColor(stage.status, stages[index + 1]?.status)
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
