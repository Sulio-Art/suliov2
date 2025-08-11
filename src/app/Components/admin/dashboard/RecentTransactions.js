
import Link from "next/link";
import { FileSearch } from "lucide-react";

const StatusBadge = ({ status }) => {
  const baseStyle =
    "inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize";
  let variantStyle = "bg-gray-100 text-gray-800";

  if (status === "completed" || status === "Success") {
    variantStyle = "bg-green-100 text-green-800";
  } else if (status === "failed") {
    variantStyle = "bg-red-100 text-red-800";
  }

  return <span className={`${baseStyle} ${variantStyle}`}>{status}</span>;
};

export default function RecentTransactions({ transactions = [] }) {
  const formatUserName = (user) => {
    if (!user) return "N/A";
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">
          Recent Transaction History
        </h3>

        {transactions.length > 0 && (
          <Link href="/admin/transactions">
            <span className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">
              See all
            </span>
          </Link>
        )}
      </div>
      <div className="overflow-x-auto flex-grow">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 px-2 font-medium">Trx ID</th>
              <th className="py-2 px-2 font-medium">User</th>
              <th className="py-2 px-2 font-medium">Amount</th>
              <th className="py-2 px-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tr) => (
                <tr
                  key={tr._id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="py-3 px-2 text-gray-600 font-mono">
                    {tr._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="py-3 px-2 text-gray-700 font-medium">
                    {formatUserName(tr.userId)}
                  </td>
                  <td className="py-3 px-2 text-gray-800">
                    ${tr.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-2">
                    <StatusBadge status={tr.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-12 text-gray-500">
                  <div className="flex flex-col items-center">
                    <FileSearch className="h-10 w-10 mb-2 text-gray-400" />
                    <span>No recent transactions found.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
