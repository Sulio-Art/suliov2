// src/app/Components/dashboard/AgeDonut.js

export default function AgeDonut({ data = [] }) {
  const totalUsers = data.reduce((acc, curr) => acc + curr.count, 0);

  // Generate the CSS conic-gradient string
  let cumulativePercent = 0;
  const gradientColors = data
    .filter((group) => group.count > 0)
    .map((group) => {
      const percent = (group.count / totalUsers) * 100;
      const startPercent = cumulativePercent;
      cumulativePercent += percent;
      const endPercent = cumulativePercent;
      return `${group.color} ${startPercent}% ${endPercent}%`;
    })
    .join(", ");

  const conicGradientStyle = {
    background: `conic-gradient(${gradientColors})`,
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow flex-1 flex flex-col items-center justify-center min-w-[280px]">
      <div className="font-semibold mb-4 text-gray-700">Age Groups</div>
      <div className="relative w-36 h-36">
        {totalUsers > 0 ? (
          <>
            {/* Donut chart element */}
            <div
              className="w-full h-full rounded-full"
              style={conicGradientStyle}
            />
            {/* Center circle to create the "hole" of the donut */}
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-800">
                {totalUsers}
              </span>
            </div>
          </>
        ) : (
          // Placeholder when there's no data
          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500">No Data</span>
          </div>
        )}
      </div>
      <div className="flex gap-x-4 gap-y-2 flex-wrap justify-center mt-4">
        {data.map((ag) => (
          <div
            className="flex items-center gap-2 text-xs text-gray-600"
            key={ag.label}
          >
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: ag.color }}
            />
            <span>{ag.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
