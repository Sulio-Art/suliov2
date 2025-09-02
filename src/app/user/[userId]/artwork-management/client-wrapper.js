"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  useGetAllArtworksQuery,
  useDeleteArtworkMutation,
} from "@/redux/Artwork/artworkApi";
import { useDebounce } from "use-debounce";
import {
  Upload,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "../../../Components/ui/button";
import PaginationControls from "../../../Components/Reuseable/PaginationControls";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";

const FilterPopover = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const handleReset = () => {
    const defaultFilters = {
      status: "all",
      artworkType: "all",
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    setFilters(defaultFilters);
    onApply(defaultFilters);
  };

  return (
    <div
      ref={popoverRef}
      className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-20 border p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <X size={16} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full mt-1 p-2 border rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Artwork Type
          </label>
          <select
            value={filters.artworkType}
            onChange={(e) =>
              setFilters({ ...filters, artworkType: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="for_sale">For Sale</option>
            <option value="not_for_sale">Not for Sale</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full mt-1 p-2 border rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="createdAt">Creation Date</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Order</label>
          <select
            value={filters.sortOrder}
            onChange={(e) =>
              setFilters({ ...filters, sortOrder: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <Button variant="secondary" onClick={handleReset} className="w-full">
          Reset
        </Button>
        <Button onClick={() => onApply(filters)} className="w-full">
          Apply
        </Button>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-bold text-gray-900">Confirm Deletion</h2>
        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this artwork? All of its data and
          images will be permanently removed. This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const ArtworkRow = ({ artwork, userId, onDeleteClick }) => {
  const status = artwork.status || "Available";

  let thumbnailUrl = null;
  if (
    artwork.imageUrls &&
    Array.isArray(artwork.imageUrls) &&
    artwork.imageUrls.length > 0
  ) {
    thumbnailUrl = artwork.imageUrls[0];
  } else if (artwork.imageUrl) {
    thumbnailUrl = artwork.imageUrl;
  }

  return (
    <div className="grid grid-cols-[auto_3fr_1fr_1fr_1fr_auto] items-center gap-4 py-3 px-4 border-t border-gray-200 hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div className="flex items-center gap-3">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={artwork.title}
            className="h-10 w-10 object-cover rounded-md border"
          />
        ) : (
          <div className="h-10 w-10 bg-gray-200 rounded-md border"></div>
        )}
        <p className="font-medium text-gray-800 truncate">{artwork.title}</p>
      </div>
      <p className="text-gray-600">${(artwork.price || 0).toLocaleString()}</p>
      <p className="text-gray-600">{artwork.creationYear || "N/A"}</p>
      <div>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            status === "Available"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex items-center gap-4 text-gray-500">
        <Link
          href={`/user/${userId}/artwork-management/${artwork._id}`}
          className="hover:text-blue-600"
          aria-label="View Artwork"
        >
          <Eye className="w-5 h-5" />
        </Link>
        <Link
          href={`/user/${userId}/artwork-management/${artwork._id}/edit`}
          className="hover:text-green-600"
          aria-label="Edit Artwork"
        >
          <Pencil className="w-5 h-5" />
        </Link>
        <button
          onClick={() => onDeleteClick(artwork._id)}
          className="hover:text-red-600"
          aria-label="Delete Artwork"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export function ArtworkClientWrapper({ userId, initialData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [artworkToDelete, setArtworkToDelete] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: "all",
    artworkType: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const authToken = useSelector(selectBackendToken);

  const queryParams = {
    page: currentPage,
    ...activeFilters,
  };

  if (debouncedSearchTerm) {
    queryParams.search = debouncedSearchTerm;
  }

  const {
    data,
    error,
    isLoading: isFetchingArtworks,
  } = useGetAllArtworksQuery(queryParams, {
    skip: !authToken,
  });

  const [deleteArtwork, { isLoading: isDeleting }] = useDeleteArtworkMutation();

  const displayData =
    (isFetchingArtworks || !authToken) &&
    currentPage === 1 &&
    !debouncedSearchTerm
      ? initialData
      : data;
  const artworks = displayData?.artworks || [];
  const totalPages = displayData?.totalPages || 1;

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, activeFilters]);

  const handleDeleteClick = (id) => {
    setArtworkToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!artworkToDelete) return;
    try {
      await deleteArtwork(artworkToDelete).unwrap();
      toast.success("Artwork deleted successfully!");
      setArtworkToDelete(null);
    } catch (err) {
      toast.error(err.data?.message || "Failed to delete artwork.");
    }
  };

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
    setIsFilterOpen(false);
  };

  const activeFilterCount = Object.keys(activeFilters).filter((key) => {
    if (key === "sortBy" && activeFilters[key] === "createdAt") return false;
    if (key === "sortOrder" && activeFilters[key] === "desc") return false;
    return activeFilters[key] !== "all";
  }).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <DeleteConfirmationModal
        isOpen={!!artworkToDelete}
        onClose={() => setArtworkToDelete(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />

      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800">Artwork List</h2>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 rounded-lg w-full sm:w-auto focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              <FilterPopover
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApply={handleApplyFilters}
                initialFilters={activeFilters}
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-[auto_3fr_1fr_1fr_1fr_auto] items-center gap-4 pb-3 px-4 text-left text-sm font-semibold text-gray-500 border-b">
            <input type="checkbox" className="h-5 w-5" />
            <span>Title</span>
            <span>Price</span>
            <span>Created in</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div>
            {isFetchingArtworks && artworks.length === 0 && (
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
            {!isFetchingArtworks && !error && artworks.length === 0 && (
              <div className="text-center p-10 text-gray-500">
                No artworks found.
              </div>
            )}
            {artworks.length > 0 &&
              artworks.map((artwork) => (
                <ArtworkRow
                  key={artwork._id}
                  artwork={artwork}
                  userId={userId}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
          </div>
        </div>

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
}