import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ArtworkClientWrapper } from "./client-wrapper";

import SubscriptionGuard from "@/app/Components/Reuseable/SubscitpionGuard";

async function getArtworks(backendToken, page = 1) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) {
    throw new Error("API URL is not defined.");
  }
  try {
    const res = await fetch(`${API_URL}/api/artworks/user?page=${page}`, {
      headers: {
        Authorization: `Bearer ${backendToken}`,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

const ArtworkManagementPage = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (!session?.backendToken) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-10 text-red-500 font-medium bg-white rounded-lg shadow-md">
          Authentication Error: Session token is missing. Please try logging out
          and back in.
        </div>
      </div>
    );
  }

  const initialData = await getArtworks(session.backendToken, 1);

  return (
    <SubscriptionGuard>
      <ArtworkClientWrapper userId={params.userId} initialData={initialData} />
    </SubscriptionGuard>
  );
};

export default ArtworkManagementPage;
