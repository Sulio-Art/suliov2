export default function AgeDonut({ data = [] }) {
  const totalUsers = data.reduce((acc, curr) => acc + curr.count, 0);

  const arcs = [];
  let cumulativeAngle = -90; 

  data.forEach((group) => {
    const angle = (group.count / totalUsers) * 360;
    arcs.push({
      startAngle: cumulativeAngle,
      endAngle: cumulativeAngle + angle,
      color: group.color,
    });
    cumulativeAngle += angle;
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow flex-1 flex flex-col items-center justify-center min-w-[280px]">
      <div className="font-semibold mb-2 text-gray-700">Age Groups</div>
      <div className="relative w-32 h-32">
        <svg width="128" height="128" viewBox="0 0 128 128">
         
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{totalUsers}</span>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap justify-center mt-3">
        {data.map((ag) => (
          <div className="flex items-center gap-1.5 text-xs" key={ag.label}>
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
