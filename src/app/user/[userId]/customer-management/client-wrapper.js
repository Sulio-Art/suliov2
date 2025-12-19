"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";
import {
  Search,
  MessageSquareText,
  X,
  Loader2,
  ArrowUpDown,
} from "lucide-react";
// 1. Import React Simple Maps
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";
import axios from "axios";

// --- MAP CONFIGURATION ---
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// --- Helper Functions ---

const getTimestamp = (dateString) => {
  if (!dateString) return 0;
  if (
    typeof dateString === "string" &&
    dateString.length === 6 &&
    !isNaN(dateString)
  ) {
    const day = parseInt(dateString.substring(0, 2), 10);
    const month = parseInt(dateString.substring(2, 4), 10) - 1;
    const year = parseInt("20" + dateString.substring(4, 6), 10);
    return new Date(year, month, day).getTime();
  }
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 0 : date.getTime();
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  if (
    typeof dateString === "string" &&
    dateString.length === 6 &&
    !isNaN(dateString)
  ) {
    const day = parseInt(dateString.substring(0, 2), 10);
    const month = parseInt(dateString.substring(2, 4), 10) - 1;
    const year = parseInt("20" + dateString.substring(4, 6), 10);
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    }
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

// --- Helper Components ---

const TagBadge = ({ type }) => {
  if (!type) return <span className="text-gray-400 text-xs">-</span>;
  const styles = {
    VVIP: "bg-purple-100 text-purple-700",
    VIP: "bg-blue-100 text-blue-700",
    Normal: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap",
        styles[type] || "bg-gray-100 text-gray-700"
      )}
    >
      {type}
    </span>
  );
};

const IntentionBadge = ({ type }) => {
  if (!type) return <span className="text-gray-400 text-xs">-</span>;
  const styles = {
    "Return-Artwork": "bg-red-100 text-red-600",
    "Business-Cooperation": "bg-purple-100 text-purple-600",
    "Logistics-Tracking": "bg-fuchsia-100 text-fuchsia-600",
    "General-Chat": "bg-gray-100 text-gray-600",
    Purchase: "bg-green-100 text-green-600",
    Commission: "bg-lime-100 text-lime-700",
    "Damage-Handling": "bg-orange-100 text-orange-600",
    Interview: "bg-cyan-100 text-cyan-600",
  };
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap",
        styles[type] || "bg-gray-100 text-gray-700"
      )}
    >
      {type.replace("-", " ")}
    </span>
  );
};

// --- NEW REAL MAP COMPONENT ---
const InteractiveMap = ({ data }) => {
  // Normalize names to match map data (e.g. "United States" vs "United States of America")
  const activeCountries = useMemo(() => {
    return (data || []).map((d) => (d.label || "").toLowerCase());
  }, [data]);

  return (
    <div className="w-full h-full">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name.toLowerCase();

              // Check if backend data has this country
              // We do a basic partial match to handle "USA" vs "United States" differences
              const isHighlighted = activeCountries.some(
                (ac) => countryName.includes(ac) || ac.includes(countryName)
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? "#2563EB" : "#E5E7EB"} // Blue for active, Gray for inactive
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: isHighlighted ? "#1D4ED8" : "#D1D5DB",
                      outline: "none",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

const DetailSlideOver = ({ customer, isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const displayCustomer = customer || {};

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ease-in-out",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Details</h2>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-0 text-sm">
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-500">Username</span>
                <span className="font-medium text-gray-900 truncate max-w-[50%]">
                  {displayCustomer.username}
                </span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-500">Full Name</span>
                <span className="font-medium text-gray-900 truncate max-w-[50%]">
                  {displayCustomer.fullName}
                </span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-500">Tags (Status)</span>
                <span className="font-medium text-gray-900">
                  {displayCustomer.tag}
                </span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-500">Instagram ID</span>
                <span className="font-medium text-gray-900">
                  {displayCustomer.instagramId}
                </span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-500">Last Contacted</span>
                <span className="font-medium text-gray-900">
                  {displayCustomer.lastContacted}
                </span>
              </div>
            </div>
            <div className="bg-[#F8FAFC] border border-blue-100 rounded-xl p-0 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />
              <div className="p-4 pl-6">
                <h4 className="text-gray-400 text-xs mb-2 font-medium">
                  Summary to chat
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {displayCustomer.summary || "No summary available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function ClientWrapper() {
  const token = useSelector(selectBackendToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({ ageGroups: [], countryStats: [] });
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const customersRes = await axios.get(
          `${API_URL}/api/customers`,
          config
        );
        const statsRes = await axios.get(
          `${API_URL}/api/dashboard/stats`,
          config
        );

        const formattedCustomers = (customersRes.data || []).map((c) => ({
          id: c._id,
          username: c.username || c.sender_id,
          fullName: c.fullname,
          rawLastContacted: c.last_contacted,
          lastContacted: formatDate(c.last_contacted),
          tag: c.status,
          intention: c.tags,
          instagramId: c.sender_id,
          summary: c.summary,
        }));

        const formattedAgeGroups = (statsRes.data.ageGroups || []).map(
          (group) => ({
            name: group.label,
            value: group.count,
            color: group.color,
          })
        );

        setCustomers(formattedCustomers);
        setStats({
          ageGroups: formattedAgeGroups,
          countryStats: statsRes.data.countryStats || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [API_URL, token]);

  const processCustomers = () => {
    let processed = (customers || []).filter((c) =>
      (c.username || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    processed.sort((a, b) => {
      switch (sortBy) {
        case "username_asc":
          return (a.username || "").localeCompare(b.username || "");
        case "name_asc":
          return (a.fullName || "").localeCompare(b.fullName || "");
        case "newest":
          return (
            getTimestamp(b.rawLastContacted) - getTimestamp(a.rawLastContacted)
          );
        case "oldest":
          return (
            getTimestamp(a.rawLastContacted) - getTimestamp(b.rawLastContacted)
          );
        default:
          return 0;
      }
    });
    return processed;
  };

  const filteredAndSortedCustomers = processCustomers();
  const handleOpenDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsSlideOverOpen(true);
  };
  const handleCloseDetail = () => {
    setIsSlideOverOpen(false);
    setTimeout(() => setSelectedCustomer(null), 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Potential Customer Database
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 w-full h-48 md:h-64 bg-gray-50 rounded-lg overflow-hidden relative group">
              {/* --- REAL MAP IMPLEMENTATION --- */}
              <InteractiveMap data={stats.countryStats} />
            </div>

            <div className="w-full md:w-48 shrink-0">
              <h3 className="font-bold text-gray-900 mb-4">
                Customer by country
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 max-h-[200px] overflow-y-auto">
                {stats.countryStats.length > 0 ? (
                  stats.countryStats.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      <span className="capitalize">
                        {item.label || "Unknown"}
                      </span>{" "}
                      ({item.count})
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 italic">No data available</li>
                )}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center min-h-[200px]">
            <h3 className="font-bold text-gray-900 mb-4">Age groups</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                {stats.ageGroups.length > 0 ? (
                  stats.ageGroups.map((entry) => (
                    <div key={entry.name}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        ></span>
                        <span className="text-xs text-gray-500">
                          {entry.name}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 ml-4">
                        {entry.value}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No age data</p>
                )}
              </div>
              <div className="w-40 h-40 relative flex-shrink-0 flex items-center justify-center">
                <PieChart width={160} height={160}>
                  <Pie
                    data={
                      stats.ageGroups.length > 0
                        ? stats.ageGroups
                        : [{ name: "No Data", value: 1, color: "#e5e7eb" }]
                    }
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats.ageGroups.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-gray-900">Customer list</h2>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search username"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="username_asc">Username (A-Z)</option>
                  <option value="name_asc">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-medium text-gray-600 pl-6">
                    Username
                  </th>
                  <th className="p-4 font-medium text-gray-600">Full Name</th>
                  <th className="p-4 font-medium text-gray-600">
                    Last Contacted
                  </th>
                  <th className="p-4 font-medium text-gray-600">Tags</th>
                  <th className="p-4 font-medium text-gray-600">Intentions</th>
                  <th className="p-4 font-medium text-gray-600 text-right pr-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredAndSortedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 text-gray-900 font-medium pl-6">
                      {customer.username}
                    </td>
                    <td className="p-4 text-gray-600">
                      {customer.fullName || "-"}
                    </td>
                    <td className="p-4 text-gray-600">
                      {customer.lastContacted}
                    </td>
                    <td className="p-4">
                      <TagBadge type={customer.tag} />
                    </td>
                    <td className="p-4">
                      <IntentionBadge type={customer.intention} />
                    </td>
                    <td className="p-4 text-right pr-6">
                      <button
                        onClick={() => handleOpenDetail(customer)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        <MessageSquareText className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredAndSortedCustomers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No customers found.
            </div>
          )}
        </div>
      </div>
      <DetailSlideOver
        customer={selectedCustomer}
        isOpen={isSlideOverOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
