import ClientSideWrapper from "../clientSideWrapper";
import DailyDiaryCalendar from "../../../Components/DailyDiary/DailyDiaryCalendar";

export default function DailyDiaryPage() {
  return (
    // The wrapper handles session loading, modals, and toasts.
    <ClientSideWrapper>
      <div className="p-4 sm:p-6 lg:p-8">
        <DailyDiaryCalendar />
      </div>
    </ClientSideWrapper>
  );
}
