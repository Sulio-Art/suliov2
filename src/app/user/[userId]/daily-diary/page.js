import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ClientSideWrapper from "../../clientSideWrapper.jsx";
import DailyDiaryCalendar from "../../../Components/DailyDiary/DailyDiaryCalendar";

async function getDiaryEntries(token) {
  if (!token) {
    return [];
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/diary`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch diary entries:", await response.text());
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching diary entries:", error);
    return [];
  }
}

export default async function DailyDiaryPage() {
  const session = await getServerSession(authOptions);
  const initialEntries = await getDiaryEntries(session?.backendToken);

  return (
    <ClientSideWrapper>
      <div className="h-full">
        <DailyDiaryCalendar initialEntries={initialEntries} />
      </div>
    </ClientSideWrapper>
  );
}
