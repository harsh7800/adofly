import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAdForm from "./create-ad-form";
import { AdCreativeType } from "@/schema/ad-creatives";
import { useMutation } from "@tanstack/react-query";
import { createAdCreative } from "@/app/api/ad-creative";
import { useAdGeneration } from "@/hooks/use-ad-generation";
import AdGenerationProgress from "./ad-generation-progress"; // adjust path as needed

interface CreateAdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

const CreateAdDialog = ({
  open,
  onOpenChange,
  children,
}: CreateAdDialogProps) => {
  const [inputData, setInputData] = useState<AdCreativeType | null>(null);
  const [showPortal, setShowPortal] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-ad-creative"],
    mutationFn: createAdCreative,
    onSuccess: () => {
      onOpenChange(false);
      setShowPortal(false); // hide the portal once finished
    },
  });

  const handleSubmit = async (formData: AdCreativeType) => {
    setInputData(formData);
    setShowPortal(true); // trigger portal
    await mutateAsync(formData);
    console.log("formData: ", formData);
  };

  const { steps, finalResult } = useAdGeneration(inputData);
  console.log("steps: ", steps);
  console.log("finalResult: ", finalResult);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader className="space-y-3 pb-6">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Create New Ad
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              Fill in the details to generate an AI-powered ad.
            </DialogDescription>
          </DialogHeader>

          <CreateAdForm
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
            isSubmitting={isPending}
          />
        </DialogContent>
      </Dialog>

      {/* ✅ Portal that shows annotation progress */}
      {showPortal && inputData && steps.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 w-[350px] bg-white shadow-xl rounded-xl border p-4">
          <h2 className="text-base font-semibold mb-2">
            Ad Generation Progress
          </h2>
          <AdGenerationProgress steps={steps} />
          {finalResult?.adCopy && (
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <div>
                <strong>Ad Title:</strong> {finalResult.adCopy.title}
              </div>
              <div>
                <strong>CTA:</strong> {finalResult.adCopy.cta}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CreateAdDialog;
