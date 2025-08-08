import { Loader2 } from "lucide-react";

export default function CalendarSkeleton() {
  return (
    <div className="max-w-7xl mx-auto animate-pulse relative">
      {" "}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-96 bg-gray-200 rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 bg-gray-100 rounded-full"></div>
            <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
            <div className="h-9 w-9 bg-gray-100 rounded-full"></div>
          </div>
          <div className="h-9 w-28 bg-gray-100 rounded-lg"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        </div>

        <div className="grid grid-cols-7">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
          {[...Array(35)].map((_, i) => (
            <div key={i} className="h-32 border-t border-l border-gray-200 p-2">
              <div className="h-5 w-5 bg-gray-200 rounded-md self-end float-right"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
