"use client";

import React, { useState, useEffect } from "react";
import {
  useCreateArtworkMutation,
  useUpdateArtworkMutation,
  useGetStorageStatsQuery,
} from "@/redux/Artwork/artworkApi";
import { useGetMySubscriptionQuery } from "@/redux/Subscription/subscriptionApi";
import { useRouter } from "next/navigation";
import { Upload, Loader2, HardDrive, X, Save } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";

const FormInput = ({ label, children }) => (
  <div>
    <label className="text-sm font-medium text-gray-600 mb-2 block">
      {label}
    </label>
    {children}
  </div>
);

const StorageIndicator = ({ currentUsage = 0, storageLimit = 0 }) => {
  const usageMB = (currentUsage / 1024 / 1024).toFixed(2);
  const limitMB =
    storageLimit > 0 ? (storageLimit / 1024 / 1024).toFixed(0) : 0;
  const percentage = storageLimit > 0 ? (currentUsage / storageLimit) * 100 : 0;
  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-2 text-sm">
        <div className="flex items-center gap-2 font-medium text-gray-700">
          <HardDrive className="h-4 w-4" />
          <span>Storage Usage</span>
        </div>
        <span className="font-mono text-gray-600">
          {usageMB} MB / {limitMB} MB
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
        ></div>
      </div>
      {percentage >= 100 && (
        <p className="text-xs text-red-600 mt-2">
          You have reached your storage limit. Please{" "}
          <Link href="/pricing" className="underline font-bold">
            upgrade your plan
          </Link>{" "}
          to upload more artworks.
        </p>
      )}
    </div>
  );
};

export const ArtworkUploadForm = ({ userId, initialData = null }) => {
  const router = useRouter();
  const isEditMode = initialData !== null;
  const token = useSelector(selectBackendToken);

  const [title, setTitle] = useState("");
  const [artworkType, setArtworkType] = useState("");
  const [price, setPrice] = useState("");
  const [creationYear, setCreationYear] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [creativeInsights, setCreativeInsights] = useState("");
  const [technicalIssues, setTechnicalIssues] = useState("");

  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [createArtwork, { isLoading: isCreating }] = useCreateArtworkMutation();
  const [updateArtwork, { isLoading: isUpdating }] = useUpdateArtworkMutation();
  const { data: storageStats, isLoading: isLoadingStats } =
    useGetStorageStatsQuery(undefined, {
      skip: !token,
    });

  const { data: subscriptionData, isLoading: isLoadingSubscription } =
    useGetMySubscriptionQuery(undefined, {
      skip: !token,
    });

  const subscriptionStatus = subscriptionData?.status;
  const entitlements = subscriptionData?.entitlements;
  const daysRemaining = subscriptionData?.daysRemaining;

  useEffect(() => {
    if (isEditMode && initialData) {
      setTitle(initialData.title || "");
      setArtworkType(initialData.artworkType || "");
      setPrice(initialData.price?.toString() || "");
      setCreationYear(initialData.creationYear?.toString() || "");
      setDescription(initialData.description || "");
      setTag(initialData.tag || "");
      setCreativeInsights(initialData.creativeInsights || "");
      setTechnicalIssues(initialData.technicalIssues || "");
      setImagePreviews(initialData.imageUrls || []);
    }
  }, [initialData, isEditMode]);

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    if (newFiles.length === 0) return;

    if (entitlements?.artworkMaxSizeMB) {
      const maxBytes = entitlements.artworkMaxSizeMB * 1024 * 1024;
      const overSized = newFiles.find((f) => f.size > maxBytes);
      if (overSized) {
        toast.error(
          `File "${overSized.name}" exceeds your plan limit of ${entitleaments.artworkMaxSizeMB} MB`
        );
        return;
      }
    }

    if (isEditMode) {
      setImagePreviews([]);
      setSelectedFiles(newFiles);
    } else {
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
    event.target.value = null;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFiles(event.dataTransfer.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      subscriptionStatus === "expired" ||
      subscriptionStatus === "trial_expired"
    ) {
      toast.error("Your subscription has expired. Please upgrade to continue.");
      return;
    }

    if (
      storageStats &&
      typeof storageStats.storageLimit === "number" &&
      storageStats.currentUsage >= storageStats.storageLimit
    ) {
      toast.error(
        "You have reached your storage limit. Upgrade to upload more."
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artworkType", artworkType);
    formData.append("price", price);
    formData.append("creationYear", creationYear);
    formData.append("description", description);
    formData.append("tag", tag);
    formData.append("creativeInsights", creativeInsights);
    formData.append("technicalIssues", technicalIssues);

    if (isEditMode) {
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("artworkImages", file);
        });
      }

      toast
        .promise(updateArtwork({ id: initialData._id, formData }).unwrap(), {
          loading: "Saving changes...",
          success: "Artwork updated successfully!",
          error: (err) =>
            `Failed to update: ${err.data?.message || err.message}`,
        })
        .then(() =>
          router.push(`/user/${userId}/artwork-management/${initialData._id}`)
        );
    } else {
      if (selectedFiles.length === 0) {
        toast.error("Please select at least one image to upload.");
        return;
      }

      if (typeof storageStats?.storageLimit === "number") {
        const totalNewBytes = selectedFiles.reduce((sum, f) => sum + f.size, 0);
        if (
          storageStats.currentUsage + totalNewBytes >
          storageStats.storageLimit
        ) {
          toast.error(
            "Uploading these files would exceed your storage limit. Remove some files or upgrade."
          );
          return;
        }
      }

      selectedFiles.forEach((file) => formData.append("artworkImages", file));

      toast
        .promise(createArtwork(formData).unwrap(), {
          loading: "Uploading artwork...",
          success: "Artwork uploaded successfully!",
          error: (err) => `Upload failed: ${err.data?.message || err.message}`,
        })
        .then(() => router.push(`/user/${userId}/artwork-management`));
    }
  };

  const isLoading = isCreating || isUpdating || isLoadingSubscription;

  if (
    subscriptionStatus === "expired" ||
    subscriptionStatus === "trial_expired"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            Your Subscription Has Ended
          </h2>
          <p className="text-gray-600 mb-6">
            Your free trial or subscription has expired. Please upgrade to
            continue uploading and using our services.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/pricing">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl relative">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between items-center pb-4 border-b">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {isEditMode ? "Edit Artwork" : "Upload Artwork"}
            </h1>
            {entitlements && (
              <div className="text-sm text-gray-600">
                Plan:{" "}
                <span className="font-semibold capitalize">
                  {entitlements.effectivePlan}
                </span>
                {" • "}Max file: {entitlements.artworkMaxSizeMB} MB
                {" • "}Days left: {daysRemaining ?? "—"}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute top-4 right-4 p-2 text-gray-500 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>

          {!isEditMode &&
            (isLoadingStats ? (
              <div>Loading storage...</div>
            ) : (
              <StorageIndicator
                currentUsage={storageStats?.currentUsage}
                storageLimit={storageStats?.storageLimit}
              />
            ))}

          <Input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type Artwork Title"
            required
            className="w-full bg-gray-100 text-lg p-4 rounded-lg"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput label="Artwork Type">
              <select
                name="artworkType"
                value={artworkType}
                onChange={(e) => setArtworkType(e.target.value)}
                required
                className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg"
              >
                <option value="" disabled>
                  eg: For Sale
                </option>
                <option value="for_sale">For Sale</option>
                <option value="not_for_sale">Not for Sale</option>
              </select>
            </FormInput>
            <FormInput label="Price">
              <Input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 49.99"
                required={artworkType === "for_sale"}
                disabled={artworkType !== "for_sale"}
                min="0"
                step="0.01"
                className="w-full bg-gray-100 p-3 rounded-lg"
              />
            </FormInput>
            <FormInput label="Creation year">
              <Input
                type="number"
                name="creationYear"
                value={creationYear}
                onChange={(e) => setCreationYear(e.target.value)}
                placeholder="2021"
                required
                className="w-full bg-gray-100 p-3 rounded-lg"
              />
            </FormInput>
          </div>

          <FormInput label="Artwork Photo(s)">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={handleDrop}
            >
              <div className="flex flex-wrap gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                ))}
              </div>
              <label className="flex flex-col items-center justify-center cursor-pointer text-center w-full py-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-gray-600 font-semibold">
                  Click or drag to upload
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {isEditMode
                    ? "Uploading new images will replace all existing ones."
                    : "You can select multiple images."}
                </p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/jpeg"
                  multiple
                />
              </label>
            </div>
          </FormInput>

          <FormInput label="Description">
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write down the description..."
              required
              className="w-full bg-gray-100 p-4 rounded-lg h-28 resize-none"
            ></textarea>
          </FormInput>

          <FormInput label="Tag">
            <select
              name="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
              className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg"
            >
              <option value="" disabled>
                eg: Sculpture
              </option>
              <option value="oil-painting">Oil Painting</option>
              <option value="acrylic-painting">Acrylic Painting</option>
              <option value="watercolor-painting">Watercolor Painting</option>
              <option value="ink-painting">Ink Painting</option>
              <option value="pastel-painting">Pastel Painting</option>
              <option value="copperplate">Copperplate</option>
              <option value="lithograph">Lithograph</option>
              <option value="woodcut">Woodcut</option>
              <option value="silkscreen">Silkscreen</option>
              <option value="digital-print">Digital Print</option>
              <option value="drawing">Drawing</option>
              <option value="charcoal-drawing">Charcoal Drawing</option>
              <option value="gouache-painting">Gouache Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="installation-art">Installation Art</option>
              <option value="ceramic-art">Ceramic Art</option>
              <option value="fiber-art">Fiber Art / Textile Art</option>
              <option value="photography-art">Photography Art</option>
              <option value="video-art">Video Art</option>
              <option value="digital-art">Digital Art</option>
              <option value="nft-art">NFT Art</option>
              <option value="interactive-art">Interactive Art</option>
              <option value="mixed-media">Mixed Media</option>
              <option value="public-art">Public Art</option>
              <option value="calligraphy">Calligraphy</option>
              <option value="illustration">Illustration</option>
              <option value="art-jewelry">Art Jewelry</option>
              <option value="artist-merchandise">
                Artist-Designed Merchandise
              </option>
            </select>
          </FormInput>

          <FormInput label="Creative Insights (Optional)">
            <textarea
              name="creativeInsights"
              value={creativeInsights}
              onChange={(e) => setCreativeInsights(e.target.value)}
              placeholder="Write about your creative process..."
              className="w-full bg-gray-100 p-4 rounded-lg h-28 resize-none"
            ></textarea>
          </FormInput>

          <FormInput label="Technical Issues (Optional)">
            <textarea
              name="technicalIssues"
              value={technicalIssues}
              onChange={(e) => setTechnicalIssues(e.target.value)}
              placeholder="Describe any technical challenges..."
              className="w-full bg-gray-100 p-4 rounded-lg h-28 resize-none"
            ></textarea>
          </FormInput>

          <div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              disabled={
                isLoading ||
                (storageStats &&
                  typeof storageStats.storageLimit === "number" &&
                  storageStats.currentUsage >= storageStats.storageLimit)
              }
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isEditMode ? (
                <>
                  <Save className="w-5 h-5" /> Save Changes
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" /> Upload Artwork
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};