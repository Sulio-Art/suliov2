import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

export default function NoSubscription() {
  return (
    <Card className="max-w-2xl mx-auto text-center">
      <CardHeader>
        <div className="mx-auto bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
          <Star className="h-8 w-8 text-gray-500" />
        </div>
        <CardTitle className="text-2xl">
          You don't have an active plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          Unlock powerful AI tools to manage your art, engage with customers,
          and grow your business by choosing a plan.
        </p>
        <Link href="/pricing">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Pricing Plans
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
