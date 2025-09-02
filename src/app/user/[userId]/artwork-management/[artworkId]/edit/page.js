"use client";

import { useParams } from "next/navigation";
import { useGetArtworkByIdQuery } from "@/redux/Artwork/artworkApi";
import { Loader2 } from "lucide-react";
import { ArtworkUploadForm } from "../../../../../Components/artwork/ArtworkUploadForm";
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";

const EditArtworkPage = () => {
  const params = useParams();
  const { userId, artworkId } = params;

  const token = useSelector(selectBackendToken);

  const {
    data: artwork,
    isLoading,
    error,
  } = useGetArtworkByIdQuery(artworkId, {
    skip: !token,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-10 text-red-500 font-medium bg-white rounded-lg shadow-md">
          Failed to load artwork data. Please try again later.
        </div>
      </div>
    );
  }

  return <ArtworkUploadForm userId={userId} initialData={artwork} />;
};

export default EditArtworkPage;