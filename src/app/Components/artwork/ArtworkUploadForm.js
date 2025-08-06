"use client";

import React, { useState } from "react";

import { useCreateArtworkMutation } from "@/redux/Artwork/artworkApi";
import { useRouter } from "next/navigation";
import { Upload, Eye, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";


const FormInput = ({ label, children }) => (
  <div>
    <label className="text-sm font-medium text-gray-600 mb-2 block">
      {label}
    </label>
    {children}
  </div>
);


export const ArtworkUploadForm = ({ userId }) => {
  const router = useRouter();
  
  const [createArtwork, { isLoading }] = useCreateArtworkMutation();

  
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");

  
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId || userId === "undefined") {
      toast.error("User session is invalid. Please log in again.");
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

         
          <div className="space-y-6">
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
                  eg: Painting
                </option>
                <option value="painting">Painting</option>
                <option value="sculpture">Sculpture</option>
                <option value="digital">Digital Art</option>
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
          </div>

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
