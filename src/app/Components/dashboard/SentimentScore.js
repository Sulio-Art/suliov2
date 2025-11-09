import { Frown, Meh, Smile, SmilePlus } from "lucide-react";

export default function SentimentScore({ score = 0 }) {
  const scorePercentage = Math.min(Math.max(score * 100, 0), 100);
  const displayScore = Math.min(Math.max(score, 0), 1).toFixed(2);

  const getSentimentData = (score) => {
    if (score >= 0.75) {
      return {
        icon: SmilePlus,
        iconColor: "text-green-600",
        scoreColor: "text-green-600",
        bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50",
        label: "Very Positive",
        labelColor: "text-green-700",
      };
    } else if (score >= 0.5) {
      return {
        icon: Smile,
        iconColor: "text-green-500",
        scoreColor: "text-green-500",
        bgGradient: "bg-gradient-to-br from-green-50 to-lime-50",
        label: "Positive",
        labelColor: "text-green-600",
      };
    } else if (score >= 0.25) {
      return {
        icon: Meh,
        iconColor: "text-yellow-500",
        scoreColor: "text-yellow-600",
        bgGradient: "bg-gradient-to-br from-yellow-50 to-amber-50",
        label: "Neutral",
        labelColor: "text-yellow-700",
      };
    } else {
      return {
        icon: Frown,
        iconColor: "text-red-500",
        scoreColor: "text-red-600",
        bgGradient: "bg-gradient-to-br from-red-50 to-rose-50",
        label: "Negative",
        labelColor: "text-red-700",
      };
    }
  };

  const sentiment = getSentimentData(score);
  const Icon = sentiment.icon;

  return (
    <div
      className={`${sentiment.bgGradient} rounded-xl shadow-lg p-6 flex flex-col items-center justify-center h-full min-w-[280px] border border-gray-100 transition-all duration-500`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon
          className={`h-7 w-7 ${sentiment.iconColor} transition-all duration-500`}
        />
        <span className="font-semibold text-gray-700">Sentiment Score</span>
      </div>

      <div className="flex flex-col items-center">
        <span
          className={`text-5xl font-bold ${sentiment.scoreColor} mb-2 transition-all duration-500`}
        >
          {displayScore}
        </span>

        <div
          className={`px-4 py-1 rounded-full ${sentiment.bgGradient} border ${sentiment.iconColor.replace("text", "border")} mb-3`}
        >
          <span className={`text-sm font-medium ${sentiment.labelColor}`}>
            {sentiment.label}
          </span>
        </div>

        <span className="text-xs text-gray-500 text-center">
          of all messages analyzed
        </span>
      </div>

      <div className="w-full mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-700 ease-out ${
            score >= 0.75
              ? "bg-green-600"
              : score >= 0.5
                ? "bg-green-500"
                : score >= 0.25
                  ? "bg-yellow-500"
                  : "bg-red-500"
          }`}
          style={{ width: `${scorePercentage}%` }}
        />
      </div>
    </div>
  );
}
