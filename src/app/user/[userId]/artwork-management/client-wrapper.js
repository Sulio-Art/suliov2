"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetAllArtworksQuery } from "@/redux/Artwork/artworkApi";
import {
  Upload,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Checkbox = ({ ...props }) => (
  <input
    type="checkbox"
    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    {...props}
  />
);

const ArtworkRow = ({ artwork }) => {
  return (
    <div className="grid grid-cols-[auto_3fr_1fr_1fr_1fr_auto] items-center gap-4 py-3 px-4 border-t border-gray-200 hover:bg-gray-50">
      <Checkbox />
      <p className="font-medium text-gray-800 truncate">{artwork.title}</p>
      <p className="text-gray-600">${artwork.price.toLocaleString()}</p>
      <p className="text-gray-600">{artwork.year}</p>
      <div>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700`}
        >
          {artwork.status}
        </span>
      </div>
      <div className="flex items-center gap-4 text-gray-500">
        <button className="hover:text-blue-600">
          <Eye className="w-5 h-5" />
        </button>
        <button className="hover:text-green-600">
          <Pencil className="w-5 h-5" />
        </button>
        <button className="hover:text-red-600">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export function ArtworkClientWrapper({ userId }) {
  const {
    data: artworks,
    error,
    isLoading,
  } = useGetAllArtworksQuery(userId, {
    skip: !userId,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredArtworks =
    artworks?.filter((art) =>
      art.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Artwork Management</h1>
        <Link
          href={`/user/${userId}/artwork-management/upload`}
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          <Upload className="w-5 h-5" />
          Upload Artwork
        </Link>
      </header>

      <main className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Artwork List</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 rounded-lg"
            />
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </Button>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-[auto_3fr_1fr_1fr_1fr_auto] items-center gap-4 pb-3 px-4 text-left text-sm font-semibold text-gray-500">
            <Checkbox />
            <span>Title</span>
            <span>Price</span>
            <span>Created in</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div>
            {isLoading && (
              <div className="flex justify-center items-center p-10">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            )}
            {error && (
              <div className="text-center p-10 text-red-500 font-medium">
                Failed to load artworks. Please check your connection and try
                again.
              </div>
            )}
            {!isLoading &&
              !error &&
              artworks &&
              filteredArtworks.length > 0 &&
              filteredArtworks.map((artwork) => (
                <ArtworkRow key={artwork.id} artwork={artwork} />
              ))}
            {!isLoading &&
              !error &&
              (!artworks || filteredArtworks.length === 0) && (
                <div className="text-center p-10 text-gray-500">
                  No artworks found.
                </div>
              )}
          </div>
        </div>
      </main>
    </div>
  );
}
