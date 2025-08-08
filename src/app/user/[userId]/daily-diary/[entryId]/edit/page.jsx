import ClientSideWrapper from "../../../../clientSideWrapper.jsx";
import NewDiaryForm from "../../../../../Components/DailyDiary/NewDiaryForm";

export default function EditDiaryPage() {
  return (
    <ClientSideWrapper>
      <div className="flex justify-center p-4 sm:p-6 lg:p-8">
        <NewDiaryForm />
      </div>
    </ClientSideWrapper>
  );
}
