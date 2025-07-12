/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import CollapsibleSection from "./collapsible-section";
// import { ImageUploadInput } from "@/components/shared/image-input";
import { AdCreativeType, AdCreativeSchema } from "@/schema/ad-creatives";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories, ctaOptions, toneOptions } from "@/constants/data";

interface CreateAdFormProps {
  onSubmit: (data: AdCreativeType) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

type imageOption = "upload" | "generate" | "generate-with-reference";

const genderOptions = ["Male", "Female", "All"];
const locationOptions = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
];

const CreateAdForm = ({
  onSubmit,
  onCancel,
  isSubmitting,
}: CreateAdFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AdCreativeSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      imageOption: "upload",
      // imageFile: null as File | null,
      aiImageStyle: "realistic",
      aiImageDescription: "",
      ageRange: "",
      gender: [] as string[],
      locations: [] as string[],
    },
  });

  console.log("errors: ", errors);
  const imageOption = watch("imageOption");
  const selectedGenders = watch("gender");
  const selectedLocations = watch("locations");

  const handleGenderChange = (gender: string, checked: boolean) => {
    const current = getValues("gender") || [];
    if (checked) {
      setValue("gender", [...current, gender]);
    } else {
      setValue(
        "gender",
        current.filter((g) => g !== gender)
      );
    }
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const current = getValues("locations") || [];
    if (checked) {
      setValue("locations", [...current, location]);
    } else {
      setValue(
        "locations",
        current.filter((l) => l !== location)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          placeholder="Enter product name"
          {...register("productName", { required: true })}
        />
      </div>

      {/* Product Description */}
      <div className="space-y-2">
        <Label htmlFor="productDescription">Product Description</Label>
        <Textarea
          id="productDescription"
          placeholder="Describe your product"
          {...register("productDescription", { required: true })}
        />
      </div>

      {/* Image Selection */}
      <div className="space-y-3">
        <Label>Product Image</Label>
        <RadioGroup
          value={imageOption}
          onValueChange={(value) =>
            setValue("imageOption", value as imageOption)
          }
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upload" id="upload" />
            <Label htmlFor="upload" className="cursor-pointer">
              Upload Image
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="generate" id="generate" />
            <Label htmlFor="generate" className="cursor-pointer">
              Generate AI Image
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="generate-with-reference"
              id="generate-with-reference"
            />
            <Label htmlFor="generate-with-reference" className="cursor-pointer">
              Generate AI Image With Reference
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Conditional Image Upload
      {(imageOption === "upload" ||
        imageOption === "generate-with-reference") && (
        <ImageUploadInput
          acceptedTypes={["image/jpeg", "image/png", "image/webp", "image/gif"]}
          label="Upload Product Image"
          onImageSelect={(file) => setValue("imageFile", file)}
          value={watch("imageFile")}
          showPreview
          required
        />
      )} */}

      {/* Conditional AI Image Style & Description */}
      {imageOption === "generate" && (
        <>
          <div className="space-y-2">
            <Label>AI Image Style</Label>
            <Select
              value={watch("aiImageStyle")}
              onValueChange={(value) => setValue("aiImageStyle", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select image style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="illustration">Illustration</SelectItem>
                <SelectItem value="minimal3d">Minimal 3D</SelectItem>
                <SelectItem value="photorealistic">
                  Photorealistic Studio
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>AI Image Description</Label>
            <Textarea
              placeholder="Describe how you want your product to look"
              {...register("aiImageDescription")}
            />
          </div>
        </>
      )}

      {/* Target Audience Preferences */}
      <CollapsibleSection
        title="Target Audience Preferences"
        subtitle="Optional"
      >
        <div className="space-y-4">
          {/* Age Range */}
          <div className="space-y-2">
            <Label htmlFor="ageRange">Age Range</Label>
            <Input
              id="ageRange"
              placeholder="e.g., 18-35"
              {...register("ageRange")}
            />
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label>Gender</Label>
            <div className="flex flex-wrap gap-4">
              {genderOptions.map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${gender}`}
                    checked={selectedGenders?.includes(gender)}
                    onCheckedChange={(checked) =>
                      handleGenderChange(gender, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`gender-${gender}`}
                    className="cursor-pointer"
                  >
                    {gender}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <Label>Locations</Label>
            <div className="flex flex-wrap gap-4">
              {locationOptions.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={selectedLocations?.includes(location)}
                    onCheckedChange={(checked) =>
                      handleLocationChange(location, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`location-${location}`}
                    className="cursor-pointer"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Product Category */}
      <div className="space-y-2">
        <Label htmlFor="productCategory">Product Category</Label>
        <Select
          onValueChange={(value) => setValue("productCategory", value)}
          defaultValue=""
        >
          <SelectTrigger id="productCategory" className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* USPs */}
      <div className="space-y-2">
        <Label htmlFor="usps">Unique Selling Points (USPs)</Label>
        <Textarea
          id="usps"
          placeholder="List USPs separated by commas"
          onBlur={(e) =>
            setValue(
              "usps",
              e.target.value.split(",").map((s) => s.trim())
            )
          }
        />
        <p className="text-sm text-gray-500">
          Example: Free shipping, Organic ingredients, 24/7 support
        </p>
      </div>

      {/* Campaign Objective */}
      <div className="space-y-2">
        <Label htmlFor="campaignObjective">Campaign Objective / CTA</Label>
        <Select
          onValueChange={(value) => setValue("campaignObjective", value)}
          defaultValue=""
        >
          <SelectTrigger id="campaignObjective" className="w-full">
            <SelectValue placeholder="Select CTA" />
          </SelectTrigger>
          <SelectContent>
            {ctaOptions.map((cta) => (
              <SelectItem key={cta} value={cta}>
                {cta}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tone of Voice */}
      <div className="space-y-2">
        <Label htmlFor="tone">Tone of Voice</Label>
        <Select
          onValueChange={(value) => setValue("tone", value)}
          defaultValue=""
        >
          <SelectTrigger id="tone" className="w-full">
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            {toneOptions.map((tone) => (
              <SelectItem key={tone} value={tone}>
                {tone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex  space-x-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-1/2"
        >
          Cancel
        </Button>
        <Button className="w-1/2" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Generating..." : "Generate Ad"}
        </Button>
      </div>
    </form>
  );
};

export default CreateAdForm;
