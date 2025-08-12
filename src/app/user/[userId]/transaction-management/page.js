import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import ClientWrapper from "./client-wrapper";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getTransactions(token, { page = 1, search = "", status = "" }) {
  if (!token) {
    return { error: "No authentication token found.", status: 401 };
  }
  try {
    const url = new URL(`${BACKEND_API_URL}/api/transactions/me`);
    url.searchParams.append("page", page);
    if (search) url.searchParams.append("search", search);
    if (status) url.searchParams.append("status", status);

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        error: "Failed to fetch transactions.",
        status: response.status,
      };
    }

    return { data: await response.json(), status: 200 };
  } catch (err) {
    return { error: "An unexpected error occurred.", status: 500 };
  }
}

export default async function TransactionManagementPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const search = searchParams.search || "";
  const status = searchParams.status || "";

  const result = await getTransactions(session.backendToken, {
    page,
    search,
    status,
  });

  const isForbidden = result.status === 403;
  const initialTransactions = result.data?.transactions || [];
  const initialTotalPages = result.data?.totalPages || 1;

  return (
    <ClientWrapper
      isForbidden={isForbidden}
      initialTransactions={initialTransactions}
      initialTotalPages={initialTotalPages}
      initialPage={page}
      initialSearch={search}
      initialStatus={status}
    />
  );
}
