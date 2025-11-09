import { Globe } from "lucide-react";
import { getDeterministicColor } from "../ui/colorPalette";
import { countryCodeMap, formatCountryDisplay } from "../ui/countryCodeMapper";

export default function CountryStats({ stats = [], isLoading }) {
  const incomingStatsMap = new Map(
    stats.map((stat) => [stat.label.toLowerCase(), stat.count])
  );

  const allCountryFullNames = Object.keys(countryCodeMap);
  allCountryFullNames.push("unknown");

  const fullStatsData = allCountryFullNames.map((countryName) => ({
    label: countryName,
    count: incomingStatsMap.get(countryName.toLowerCase()) || 0,
  }));

  const modifiedStats = fullStatsData.map((stat) => {
    if (stat.label.toLowerCase() === "unknown") {
      return { ...stat, label: "Other Countries" };
    }
    const countryCode = formatCountryDisplay(stat.label);
    return { ...stat, label: countryCode };
  });

  const visibleStats = modifiedStats.filter((stat) => stat.count > 0);

  const sortedVisibleStats = [...visibleStats].sort(
    (a, b) => b.count - a.count
  );

  const totalVisibleCount = sortedVisibleStats.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  const top5Stats = sortedVisibleStats.slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6 shadow flex-1 flex flex-col min-w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-blue-500" />
        <span className="text-lg font-semibold text-gray-700">
          Customer by Country
        </span>
      </div>

      {isLoading ? (
        <div className="text-gray-400 text-sm py-10 text-center">
          Loading...
        </div>
      ) : top5Stats.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          No customer data available.
        </div>
      ) : (
        <ul className="space-y-4 flex-grow">
          {top5Stats.map((c) => {
            const percentage =
              totalVisibleCount > 0
                ? ((c.count / totalVisibleCount) * 100).toFixed(0)
                : 0;
            const barColor = getDeterministicColor(c.label);

            return (
              <li key={c.label}>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="font-medium text-gray-600">{c.label}</span>
                  <span className="font-semibold text-gray-800">{c.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: barColor,
                    }}
                  ></div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {sortedVisibleStats.length > 5 && (
        <button className="text-blue-600 text-sm font-semibold text-left mt-4">
          View All
        </button>
      )}
    </div>
  );
}
