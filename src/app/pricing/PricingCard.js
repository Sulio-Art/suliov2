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
}) {
  
  const includedFeatures = Object.entries(plan.features).filter(
    ([_, value]) => value !== "X"
  );

  return (
    <div
      className={cn(
        "border-2 rounded-2xl p-6 flex flex-col relative",
        isPopular ? "border-blue-600" : "border-gray-300"
      )}
    >
      {isPopular && (
        <div className="absolute top-0 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded-full self-center">
          Most Popular
        </div>
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
        disabled={isLoading}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          "Get started"
        )}
        {!isLoading && <ArrowRight className="h-5 w-5" />}
      </Button>
    </div>
  );
}
