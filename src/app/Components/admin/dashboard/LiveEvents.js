import { CalendarSearch } from "lucide-react";

export default function LiveEvents({ events = [] }) {
  const formatUserName = (user) => {
    if (!user) return "N/A";
    return (
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">Live Events</h3>
      </div>

      <div className="flex-grow space-y-4 overflow-y-auto pr-2">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="flex items-center space-x-4 border-b pb-3 last:border-none last:pb-0"
            >
              <div className="flex-shrink-0 bg-green-100 text-green-700 rounded-md text-center p-2 w-14">
                <div className="text-xs font-bold uppercase">
                  {new Date(event.date).toLocaleString("en-US", {
                    month: "short",
                  })}
                </div>
                <div className="text-lg font-bold">
                  {new Date(event.date).getDate()}
                </div>
              </div>
              <div className="flex-grow min-w-0">
                {" "}
                <p className="font-semibold text-gray-800 truncate">
                  {event.title}
                </p>
                <p className="text-sm text-gray-500">
                  By: {formatUserName(event.userId)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-gray-500">
            <CalendarSearch className="h-10 w-10 mb-2 text-gray-400" />
            <span>No live events found.</span>
          </div>
        )}
      </div>
    </div>
  );
}
