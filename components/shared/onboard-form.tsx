"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAccountSetup } from "@/app/api/account-setup";
import { OnboardingFormType, onboardingSchema } from "@/schema/onboard";

export default function OnboardingPortal() {
  const [open, setOpen] = React.useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OnboardingFormType>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    defaultValues: {
      primaryUseCases: [],
      primaryUseCaseOther: "",
      role: "",
      roleOther: "",
      industry: "",
      teamSize: "",
      country: "",
      primaryGoal: "",
      hearAboutUs: "",
      hearAboutUsOther: "",
    },
  });

  const primaryUseCases = watch("primaryUseCases");
  const role = watch("role");
  const hearAboutUs = watch("hearAboutUs");

  const handleUseCaseChange = (useCase: string, checked: boolean) => {
    const current = primaryUseCases || [];
    if (checked) {
      setValue("primaryUseCases", [...current, useCase]);
    } else {
      setValue(
        "primaryUseCases",
        current.filter((item) => item !== useCase)
      );
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAccountSetup,
    onSuccess: () => {
      toast.success("Signed up successfully!");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Signup failed");
      console.error("Error signing in:", error);
    },
  });

  const onSubmit = (data: OnboardingFormType) => {
    console.log("Onboarding form submitted:", data);
    mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[calc(100%-5rem)]">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-center">
            Tell us about yourself
          </h1>
          <p className="text-center">
            This will help us personalise your experience.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Primary Use Case */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-900">
              What will you primarily use our app for?{" "}
            </Label>
            <div className="space-y-3">
              {[
                "Running ads",
                "Creating marketing campaigns",
                "Managing locations / stores",
                "Sending notifications",
                "Team collaboration",
              ].map((useCase) => (
                <div key={useCase} className="flex items-center space-x-3">
                  <Checkbox
                    id={useCase}
                    checked={primaryUseCases?.includes(useCase)}
                    onCheckedChange={(checked) =>
                      handleUseCaseChange(useCase, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={useCase}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {useCase}
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="other"
                  checked={primaryUseCases?.includes("other")}
                  onCheckedChange={(checked) =>
                    handleUseCaseChange("other", checked as boolean)
                  }
                />
                <Label
                  className="text-sm font-normal cursor-pointer"
                  htmlFor="other"
                >
                  Other
                </Label>
                {primaryUseCases?.includes("other") && (
                  <Input
                    placeholder="Please specify..."
                    {...register("primaryUseCaseOther")}
                    className="ml-2 h-8 text-sm"
                  />
                )}
              </div>
            </div>
            {errors.primaryUseCases && (
              <p className="text-red-500 text-sm">
                {errors.primaryUseCases.message}
              </p>
            )}
          </div>

          {/* Your Role */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-900">
              What&apos;s your role?
            </Label>
            <RadioGroup
              value={role}
              onValueChange={(value) => setValue("role", value)}
              className="space-y-3"
            >
              {[
                "Founder / Owner",
                "Marketer",
                "Designer",
                "Developer",
                "Operations",
              ].map((r) => (
                <div key={r} className="flex items-center space-x-3">
                  <RadioGroupItem id={r} value={r} />
                  <Label
                    htmlFor={r}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {r}
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <RadioGroupItem id="other-role" value="other-role" />
                <Label
                  htmlFor="other-role"
                  className="text-sm font-normal cursor-pointer"
                >
                  Other
                </Label>
                {role === "other-role" && (
                  <Input
                    placeholder="Please specify..."
                    {...register("roleOther")}
                    className="ml-2 h-8 text-sm"
                  />
                )}
              </div>
            </RadioGroup>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-900">
              What industry are you in?
            </Label>
            <Select
              value={watch("industry")}
              onValueChange={(value) => setValue("industry", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "retail", label: "Retail" },
                  { value: "food-beverage", label: "Food & Beverage" },
                  { value: "healthcare", label: "Healthcare" },
                  { value: "saas-software", label: "SaaS / Software" },
                  { value: "logistics", label: "Logistics" },
                  { value: "education", label: "Education" },
                  { value: "finance", label: "Finance" },
                  { value: "other", label: "Other" },
                ].map((ind) => (
                  <SelectItem id={ind.value} key={ind.value} value={ind.value}>
                    {ind.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-red-500 text-sm">{errors.industry.message}</p>
            )}
          </div>

          {/* Team Size */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-900">
              What&apos;s your team size?
            </Label>
            <RadioGroup
              value={watch("teamSize")}
              onValueChange={(value) => setValue("teamSize", value)}
              className="space-y-3"
            >
              {[
                { value: "just-me", label: "Just me" },
                { value: "2-10", label: "2-10" },
                { value: "11-50", label: "11-50" },
                { value: "51-200", label: "51-200" },
                { value: "200+", label: "200+" },
              ].map((size) => (
                <div key={size.value} className="flex items-center space-x-3">
                  <RadioGroupItem id={size.value} value={size.value} />
                  <Label
                    htmlFor={size.value}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {size.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.teamSize && (
              <p className="text-red-500 text-sm">{errors.teamSize.message}</p>
            )}
          </div>

          {/* Country or Region */}
          <div className="space-y-2">
            <Label
              htmlFor="country"
              className="text-base font-medium text-gray-900"
            >
              Country or region
            </Label>
            <Input
              id="country"
              {...register("country")}
              placeholder="Enter your country or region"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* Primary Goal */}
          <div className="space-y-2">
            <Label
              htmlFor="primaryGoal"
              className="text-base font-medium text-gray-900"
            >
              What&apos;s your primary goal with our app?
            </Label>
            <Input
              id="primaryGoal"
              {...register("primaryGoal")}
              placeholder="e.g., Increase sales, improve customer engagement..."
            />
            {errors.primaryGoal && (
              <p className="text-red-500 text-sm">
                {errors.primaryGoal.message}
              </p>
            )}
          </div>

          {/* How did you hear about us */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-900">
              How did you hear about us?
            </Label>
            <RadioGroup
              value={hearAboutUs}
              onValueChange={(value) => setValue("hearAboutUs", value)}
              className="space-y-3"
            >
              {["Google search", "Social media", "Friend / colleague"].map(
                (source) => (
                  <div key={source} className="flex items-center space-x-3">
                    <RadioGroupItem id={source} value={source} />
                    <Label
                      htmlFor={source}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {source}
                    </Label>
                  </div>
                )
              )}
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="other-source" />
                <Label className="text-sm font-normal cursor-pointer">
                  Other
                </Label>
                {hearAboutUs === "other-source" && (
                  <Input
                    placeholder="Please specify..."
                    {...register("hearAboutUsOther")}
                    className="ml-2 h-8 text-sm"
                  />
                )}
              </div>
            </RadioGroup>
            {errors.hearAboutUs && (
              <p className="text-red-500 text-sm">
                {errors.hearAboutUs.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              isLoading={isPending}
              type="submit"
              className="w-full h-12 text-base font-medium"
            >
              Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
