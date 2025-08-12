"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetArtworkByIdQuery,
  useDeleteArtworkMutation,
} from "@/redux/Artwork/artworkApi";
import { Loader2, ArrowLeft, Calendar, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

const DetailSection = ({ title, content }) => {
  if (!content) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">{title}</h3>
      <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
    </div>
  );
};

const ArtworkDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { userId, artworkId } = params;

  const [isDeleting, setIsDeleting] = useState(false);

  const { data: artwork, isLoading, error } = useGetArtworkByIdQuery(artworkId);
  const [deleteArtwork] = useDeleteArtworkMutation();

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this artwork? This action cannot be undone."
      )
    ) {
      setIsDeleting(true);
      toast.promise(deleteArtwork(artworkId).unwrap(), {
        loading: "Deleting artwork...",
        success: () => {
          router.push(`/user/${userId}/artwork-management`);
          return "Artwork deleted successfully!";
        },
        error: (err) => {
          setIsDeleting(false);
          return `Failed to delete artwork: ${err.data?.message || err.message}`;
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500 font-medium">
        Failed to load artwork. It may have been deleted or there was a network
        issue.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 sm:p-8">
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <Link
              href={`/user/${userId}/artwork-management/${artworkId}/edit`}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Edit className="w-6 h-6 text-gray-600" />
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <Trash2 className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </header>

        <main className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {artwork.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(artwork.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {artwork.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${artwork.title} - view ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            ))}
          </div>

          <div className="space-y-6">
            <DetailSection title="Description" content={artwork.description} />

          
            <DetailSection
              title="Creative Insights"
              content={artwork.creativeInsights}
            />
            <DetailSection
              title="Technical Issues"
              content={artwork.technicalIssues}
            />
           
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
