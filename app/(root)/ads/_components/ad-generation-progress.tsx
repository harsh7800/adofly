import React from "react";
import { Check, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "pending" | "active" | "completed" | "error";

export interface AdGenerationStep {
  id: string;
  title: string;
  status: StepStatus;
}

interface AdGenerationProgressProps {
  steps: AdGenerationStep[];
}

const AdGenerationProgress: React.FC<AdGenerationProgressProps> = ({
  steps,
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                  {
                    "border-gray-300 bg-white": step.status === "pending",
                    "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100":
                      step.status === "active",
                    "border-green-500 bg-green-500":
                      step.status === "completed",
                    "border-red-500 bg-red-100": step.status === "error",
                  }
                )}
              >
                {step.status === "completed" && (
                  <Check className="w-4 h-4 text-white" />
                )}
                {step.status === "active" && (
                  <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                )}
                {step.status === "pending" && (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
                {step.status === "error" && (
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                )}
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 h-8 mt-2 transition-colors duration-300",
                    {
                      "bg-gray-200": step.status === "pending",
                      "bg-blue-300": step.status === "active",
                      "bg-green-400": step.status === "completed",
                      "bg-red-400": step.status === "error",
                    }
                  )}
                />
              )}
            </div>

            {/* Step content */}
            <div className="flex-1 pb-8">
              <h3
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  {
                    "text-gray-500": step.status === "pending",
                    "text-blue-900": step.status === "active",
                    "text-green-900": step.status === "completed",
                    "text-red-900": step.status === "error",
                  }
                )}
              >
                {step.title}
              </h3>

              <p
                className={cn("text-xs mt-1 transition-colors duration-300", {
                  "text-gray-400": step.status === "pending",
                  "text-blue-600": step.status === "active",
                  "text-green-600": step.status === "completed",
                  "text-red-600": step.status === "error",
                })}
              >
                {step.status === "pending" && "Waiting..."}
                {step.status === "active" && "In Progress..."}
                {step.status === "completed" && "Completed"}
                {step.status === "error" && "Error"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdGenerationProgress;
