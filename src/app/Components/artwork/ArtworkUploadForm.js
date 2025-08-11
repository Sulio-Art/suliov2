"use client";

import React, { useState } from "react";
import {
  useCreateArtworkMutation,
  useGetStorageStatsQuery,
} from "@/redux/Artwork/artworkApi";
import { useRouter } from "next/navigation";
import { Upload, Eye, Loader2, HardDrive } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import Link from "next/link";

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
  const limitMB = (storageLimit / 1024 / 1024).toFixed(0);
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

export const ArtworkUploadForm = ({ userId }) => {
  const router = useRouter();
  const [createArtwork, { isLoading }] = useCreateArtworkMutation();

  const { data: storageStats, isLoading: isLoadingStats } =
    useGetStorageStatsQuery(userId, {
      skip: !userId,
    });

  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const currentUsage = storageStats?.currentUsage || 0;
      const storageLimit = storageStats?.storageLimit || 0;
      if (currentUsage + file.size > storageLimit && storageLimit > 0) {
        toast.error(
          "This file exceeds your storage limit. Please upgrade your plan or upload a smaller file.",
          { duration: 5000 }
        );
        event.target.value = null;
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const currentUsage = storageStats?.currentUsage || 0;
      const storageLimit = storageStats?.storageLimit || 0;
      if (currentUsage + file.size > storageLimit && storageLimit > 0) {
        toast.error(
          "This file exceeds your storage limit. Please upgrade your plan or upload a smaller file.",
          { duration: 5000 }
        );
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId || userId === "undefined") {
      toast.error("User session is invalid. Please log in again.");
      return;
    }
    if (!selectedFile) {
      toast.error("Please select an image file to upload.");
      return;
    }

    const formData = new FormData(event.target);
    formData.append("userId", userId);
    

    try {
      await createArtwork(formData).unwrap();
      toast.success("Artwork uploaded successfully!");
      router.push(`/user/${userId}/artwork-management`);
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to upload artwork. Please try again."
      );
      console.error("Failed to create artwork:", error);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Upload Artwork
            </h1>
            <Button type="button" variant="outline">
              Save as draft
            </Button>
          </div>

          {isLoadingStats ? (
            <div className="text-center text-gray-500 py-4">
              Loading storage details...
            </div>
          ) : (
            <StorageIndicator
              currentUsage={storageStats?.currentUsage}
              storageLimit={storageStats?.storageLimit}
            />
          )}

          <Input
            type="text"
            name="title"
            className="w-full bg-gray-100 text-lg p-4 rounded-lg"
            placeholder="Type Artwork Title"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput label="Artwork Type">
              <select
                name="artworkType"
                className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg border-transparent focus:ring-2 focus:ring-blue-500"
                defaultValue=""
                required
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
                type="text"
                name="price"
                placeholder="50$"
                className="w-full bg-gray-100 p-3 rounded-lg"
                required
              />
            </FormInput>
            <FormInput label="Creation year">
              <Input
                type="number"
                name="creationYear"
                placeholder="2021"
                className="w-full bg-gray-100 p-3 rounded-lg"
                required
              />
            </FormInput>
          </div>
          <FormInput label="Upload high resolution photo of your artwork">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full flex flex-col md:flex-row items-center justify-between gap-6"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="flex flex-col items-center text-center">
                  <img
                    src={imagePreview}
                    alt="Artwork preview"
                    className="max-h-32 rounded-md mb-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {fileName}
                  </span>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer text-center w-full py-4">
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-gray-600 font-semibold">
                    click or drag to upload photo
                  </span>
                  <input
                    type="file"
                    name="artworkImage"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg"
                    required
                  />
                </label>
              )}
              <div className="bg-gray-100 p-4 rounded-lg text-xs text-gray-600 self-stretch text-left">
                <h4 className="font-semibold mb-2">Upload Guidelines:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>File format: JPG / PNG</li>
                  <li>Minimum size: 2000px (longest side), 300 dpi</li>
                  <li>Max file size: 25MB</li>
                  <li>Clean background, even lighting</li>
                  <li>No watermarks, logos, or composite images</li>
                </ul>
              </div>
            </div>
          </FormInput>
          <FormInput label="Description">
            <textarea
              name="description"
              placeholder="Write down the description in 500 letters"
              className="w-full bg-gray-100 p-4 rounded-lg h-28 resize-none"
              required
            ></textarea>
          </FormInput>
          <FormInput label="Tag">
            <select
              name="tag"
              className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg border-transparent focus:ring-2 focus:ring-blue-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                eg: Sculpture
              </option>

              <option value="sculpture">Sculpture</option>
              <option value="digital">Digital Art</option>
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
              <option value="installation-art">Installation Art</option>
              <option value="ceramic-art">Ceramic Art</option>
              <option value="fiber-art">Fiber Art / Textile Art</option>
              <option value="photography-art">Photography Art</option>
              <option value="video-art">Video Art</option>
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
          <FormInput label="Creative Insights">
            <textarea
              name="creativeInsights"
              placeholder="Write down the description in 500 letters"
              className="w-full bg-gray-100 p-4 rounded-lg h-28 resize-none"
            ></textarea>
          </FormInput>
          <FormInput label="Technical Issues">
            <textarea
              name="technicalIssues"
              placeholder="Write down the description in 500 letters"
              className="w-full bg-gray-100 p-4 rounded-lg h-28 resize-none"
            ></textarea>
          </FormInput>
          <div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Eye className="w-5 h-5" /> See Preview
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};