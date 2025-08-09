import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { planDetails, featureList } from "./planDetails";
import { ArrowRight, Check, X } from "lucide-react"; 
import { format } from "date-fns";


const FeatureValue = ({ value }) => {
  if (value === "✓") {
    return <Check className="h-5 w-5 text-green-500" />;
  }
  if (value === "X") {
    return <X className="h-5 w-5 text-gray-400" />;
  }
  return <span className="text-gray-800 font-medium">{value}</span>;
};

export default function SubscriptionDetails({ subscription }) {
  const currentPlan =
    planDetails[subscription.plan.toLowerCase()] || planDetails.free;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Your Current Plan: {currentPlan.name}
            </CardTitle>
            <CardDescription>
              Active Since: {formatDate(subscription.startDate)} | Renews On:{" "}
              {formatDate(subscription.endDate)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-4 text-lg">Your Plan Features:</h3>
            <div className="space-y-4">
              {featureList.map((featureName, index) => {
                const featureValue = currentPlan.features[featureName];
                if (featureValue === "X") return null;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-600">{featureName}</span>
                    <FeatureValue value={featureValue} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>Manage Your Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Explore other plans to unlock more powerful features and take your
              artistry to the next level.
            </p>
            <Link href="/pricing" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Upgrade or View All Plans
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
