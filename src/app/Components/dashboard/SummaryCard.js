export default function SummaryCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}