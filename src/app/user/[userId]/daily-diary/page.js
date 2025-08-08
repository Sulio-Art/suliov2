import ClientSideWrapper from "../../clientSideWrapper.jsx";
import DailyDiaryCalendar from "../../../Components/DailyDiary/DailyDiaryCalendar";

export default function DailyDiaryPage() {
  return (
    <ClientSideWrapper>
      <div className="h-full">
        <DailyDiaryCalendar />
      </div>
    </ClientSideWrapper>
  );
}
