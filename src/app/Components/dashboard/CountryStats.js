import { Globe } from "lucide-react";

export default function CountryStats({ stats = [], isLoading }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex-1 flex flex-col min-w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-blue-500" />
        <span className="text-sm font-semibold text-gray-700">
          Customer by Country
        </span>
      </div>
      {isLoading ? (
        <div className="text-gray-400 text-sm py-10 text-center">
          Loading countries…
        </div>
      ) : (
        <ul className="text-sm text-gray-600 space-y-2 mb-3 flex-grow">
          {stats.slice(0, 5).map((c) => (
            <li key={c.name} className="flex justify-between">
              <span>{c.name}</span>
              <span className="font-medium text-gray-800">{c.count}</span>
            </li>
          ))}
        </ul>
      )}

      {stats && stats.length > 5 && (
        <button className="text-blue-600 text-xs text-left mt-auto">
          Show more
        </button>
      )}
    </div>
  );
}