export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
