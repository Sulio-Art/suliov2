import Link from "next/link";
import { FileSearch } from "lucide-react";

const SimpleBadge = ({ children, variant }) => {
  const baseStyle = "inline-block px-2.5 py-1 rounded-full text-xs font-medium";
  const variantStyle =
    variant === "success"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  return <span className={`${baseStyle} ${variantStyle}`}>{children}</span>;
};

export default function RecentTransactions({ transactions = [], userId }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-gray-700">
          Recent Transaction History
        </div>

        <Link href={`/user/${userId}/transaction-management`}>
          <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
            See all
          </span>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b">
              <th className="py-2 text-left font-medium">Trnx ID</th>
              <th className="py-2 text-left font-medium">Amount</th>
              <th className="py-2 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tr) => (
                <tr key={tr._id} className="border-b last:border-none">
                  <td className="py-3 text-gray-600 font-mono">
                    {tr._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="py-3 text-gray-800 font-medium">
                    ${tr.amount.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <SimpleBadge
                      variant={
                        tr.status === "completed" ? "success" : "outline"
                      }
                    >
                      {tr.status}
                    </SimpleBadge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-500">
                  <div className="flex flex-col items-center">
                    <FileSearch className="h-8 w-8 mb-2 text-gray-400" />
                    <span>No recent transactions to show.</span>
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
