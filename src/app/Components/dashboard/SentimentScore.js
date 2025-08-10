import { Smile } from "lucide-react";

export default function SentimentScore({ score }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center h-full min-w-[280px]">
      <div className="flex items-center gap-2 mb-3">
        <Smile className="h-6 w-6 text-green-500" />
        <span className="font-semibold text-gray-700">Sentiment Score</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold text-green-600 mb-1">{score}</span>
        <span className="text-xs text-gray-500">of all messages analyzed</span>
      </div>
    </div>
  );
}