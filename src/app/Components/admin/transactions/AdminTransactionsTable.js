import { format } from "date-fns";
import { FileSearch } from "lucide-react";

const StatusBadge = ({ status }) => {
  const baseStyle =
    "inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize";
  let variantStyle = "bg-gray-100 text-gray-800";

  if (status === "completed") {
    variantStyle = "bg-green-100 text-green-800";
  } else if (status === "failed") {
    variantStyle = "bg-red-100 text-red-800";
  } else if (status === "cancelled") {
    variantStyle = "bg-yellow-100 text-yellow-800";
  }

  return <span className={`${baseStyle} ${variantStyle}`}>{status}</span>;
};

export default function AdminTransactionsTable({ transactions = [] }) {
  const formatUserName = (user) => {
    if (!user) return { name: "N/A", email: "" };
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    return { name: name || user.email, email: user.email };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b-2">
            <th className="p-3 font-semibold">Transaction ID</th>
            <th className="p-3 font-semibold">User</th>
            <th className="p-3 font-semibold">Date</th>
            <th className="p-3 font-semibold">Amount</th>
            <th className="p-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tr) => {
              const userDetails = formatUserName(tr.userId);
              return (
                <tr
                  key={tr._id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="p-3 text-gray-600 font-mono">{tr._id}</td>
                  <td className="p-3 text-gray-800 font-medium">
                    <div>{userDetails.name}</div>
                    <div className="text-xs text-gray-500">
                      {userDetails.email}
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">
                    {format(new Date(tr.createdAt), "dd MMM yyyy, hh:mm a")}
                  </td>
                  <td className="p-3 text-gray-800 font-semibold">
                    ${tr.amount.toFixed(2)}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={tr.status} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-16 text-gray-500">
                <div className="flex flex-col items-center">
                  <FileSearch className="h-12 w-12 mb-2 text-gray-400" />
                  <span className="font-medium">No transactions found.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
