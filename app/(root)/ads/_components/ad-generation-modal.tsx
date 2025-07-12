import React from "react";
import AdGenerationProgress from "./ad-generation-progress";
import { useAdGeneration } from "@/hooks/use-ad-generation";

const AdGenerationModal = ({ payload }) => {
  const { steps, finalData, isLoading, error } = useAdGeneration(payload);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Generating Your Ad...</h2>

      <AdGenerationProgress steps={steps} />

      {isLoading && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Generating ad content. Please wait...
        </p>
      )}

      {finalData && (
        <div className="mt-6">
          <h3 className="text-md font-medium">Your Ad is Ready!</h3>
          {/* Render final ad preview */}
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-4">Error: {error.message}</p>
      )}
    </div>
  );
};

export default AdGenerationModal;
