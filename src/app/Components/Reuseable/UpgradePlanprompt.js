import Link from "next/link";
import { Button } from "../../Components/ui/button";
import { Lock } from "lucide-react";

export default function UpgradePlanPrompt({ featureName }) {
  return (
    <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="mx-auto bg-yellow-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
          <Lock className="h-8 w-8 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Feature Locked</h2>
        <p className="text-gray-600 mb-6">
          The {featureName} feature is not available on your current plan.
          Please upgrade to access this and more powerful tools.
        </p>
        <Link href="/pricing">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Pricing Plans
          </Button>
        </Link>
      </div>
    </div>
  );
}
