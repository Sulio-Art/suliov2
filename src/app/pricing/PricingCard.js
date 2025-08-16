import { Check, Loader2, ArrowRight } from "lucide-react";
import { Button } from "../Components/ui/button";
import { cn } from "@/lib/utils";

export default function PricingCard({
  plan,
  price,
  billing,
  onSelect,
  isLoading,
  isPopular,
  isPostTrial,
  currentPlan, 
}) {
  const includedFeatures = Object.entries(plan.features).filter(
    ([_, value]) => value !== "X"
  );

  const isActive = plan.id === currentPlan;


  return (
    <div
      className={cn(
        "border-2 rounded-2xl p-6 flex flex-col relative transition-all",
        isActive
          ? "border-green-600 ring-2 ring-green-500/50"
          : isPopular
            ? "border-blue-600"
            : "border-gray-300",
        isPostTrial && plan.id === "free" && "opacity-60 bg-gray-50"
      )}
    >
      {isActive ? (
        <div className="absolute top-0 -translate-y-1/2 bg-green-600 text-white px-3 py-1 text-sm font-semibold rounded-full self-center">
          Current Plan
        </div>
      ) : (
        isPopular && (
          <div className="absolute top-0 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded-full self-center">
            Most Popular
          </div>
        )
      )}

      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
      <p className="mt-2 text-4xl font-extrabold text-gray-900">{price}</p>
      <p className="mt-1 text-sm text-gray-500">{billing}</p>

      <ul className="mt-6 space-y-4 flex-grow">
        {includedFeatures.map(([feature, value]) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={() => onSelect(plan)}
        disabled={isLoading || (isPostTrial && plan.id === "free") || isActive}
        variant={isActive ? "outline" : "default"}
        className="w-full mt-8 h-12 text-lg font-semibold flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isActive ? (
          "Current Plan"
        ) : isPostTrial && plan.id === "free" ? (
          "Trial Ended"
        ) : (
          "Get started"
        )}
        {!isLoading && !(isPostTrial && plan.id === "free") && !isActive && (
          <ArrowRight className="h-5 w-5" />
        )}
      </Button>

      {isPostTrial && plan.id === "free" && (
        <p className="text-center text-sm text-gray-600 mt-3">
          Your 90-day trial has ended. Please choose a paid plan to continue.
        </p>
      )}
    </div>
  );
}