"use client";

import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null; 
  }

  return (
    <div className="flex items-center justify-end space-x-4 mt-6">
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}