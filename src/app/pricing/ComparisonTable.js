import { Button } from "../ui/button";
import { featureList, planDetails } from "../subscription/planDetails";
import { Check, X } from "lucide-react"; 


const FeatureValue = ({ value }) => {
  if (value === "✓") {
    return <Check className="h-5 w-5 text-green-500" />;
  }
  if (value === "X") {
    return <X className="h-5 w-5 text-gray-400" />;
  }
  return <span className="text-gray-800 font-medium">{value}</span>;
};

export default function ComparisonTable() {
  return (
    <div className="mt-24">
      <div className="text-center mb-8">
        <Button size="lg" variant="outline" className="text-lg font-bold">
          Compare Plans
        </Button>
      </div>
      <h2 className="text-center text-3xl font-bold mb-10">
        Find the right Sulio Art AI Chatbot Assistant for you
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4"></th>
              {Object.values(planDetails).map((plan) => (
                <th key={plan.name} className="text-center p-4">
                  <Button
                    variant="outline"
                    className="rounded-full text-base font-bold"
                  >
                    {plan.name}
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureList.map((feature) => (
              <tr key={feature} className="border-b last:border-b-0">
                <td className="py-5 px-4 font-semibold text-gray-600">
                  {feature}
                </td>
                {Object.values(planDetails).map((plan) => (
                  <td
                    key={`${plan.name}-${feature}`}
                    className="py-5 px-4 text-center"
                  >
                    <div className="flex justify-center">
                      <FeatureValue value={plan.features[feature]} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
