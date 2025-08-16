"use client";

import { useState } from "react";
import SubscriptionDetails from "../../../Components/subscription/SubscriptionDetails";
import NoSubscription from "../../../Components/subscription/NoSubscription";



export default function ClientWrapper({ initialSubscription }) {

  const [subscription] = useState(initialSubscription);

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Subscription Management</h1>
      {subscription ? (
        <SubscriptionDetails subscription={subscription} />
      ) : (
        <NoSubscription />
      )}
    </div>
  );
}