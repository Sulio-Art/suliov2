"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { planDetails } from "../Components/subscription/planDetails";
import PricingCard from "./PricingCard";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/hooks/useSubscription";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PricingCardsSection() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isLoading, setIsLoading] = useState(null);

  const { status: subscriptionStatus, plan: currentPlan } = useSubscription();

  const isPostTrial = subscriptionStatus === "expired";

  const handlePayment = async (plan) => {
    if (plan.id === currentPlan) {
      toast.info("This is already your current plan.");
      return;
    }

    if (plan.id === "free") {
      if (isPostTrial) {
        toast.error("Your trial has ended. Please select a paid plan.");
        return;
      }
      toast.info("You are already on the Free plan!");
      if (sessionStatus === "authenticated") {
        router.push(`/user/${session.user.id}/dashboard`);
      }
      return;
    }

    if (sessionStatus !== "authenticated") {
      toast.error("Please log in to choose a plan.");
      router.push("/auth/login");
      return;
    }

    setIsLoading(plan.id);
    const planPricing = plan.pricing[billingCycle];

    try {
      const orderResponse = await fetch(
        `${BACKEND_API_URL}/api/subscriptions/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.backendToken}`,
          },
          body: JSON.stringify({
            plan: plan.id,
            amount: planPricing.amount,
            billingCycle: billingCycle,
          }),
        }
      );
      const orderData = await orderResponse.json();
      if (!orderResponse.ok)
        throw new Error(orderData.message || "Failed to create order.");

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onerror = () => {
        toast.error("Failed to load payment provider.");
        setIsLoading(null);
      };
      script.onload = () => {
        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: "INR",
          name: "Sulio Art",
          description: `${plan.name} Plan (${billingCycle})`,
          order_id: orderData.orderId,
          handler: async (response) => {
            const verifyResponse = await fetch(
              `${BACKEND_API_URL}/api/subscriptions/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session.backendToken}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );
            const verifyData = await verifyResponse.json();
            if (verifyResponse.ok) {
              toast.success("Payment successful! Your plan is now active.");
              router.push(`/user/${session.user.id}/subscription`);
            } else {
              toast.error(verifyData.message || "Payment verification failed.");
            }
            setIsLoading(null);
          },
          prefill: {
            name: session.user.name,
            email: session.user.email,
          },
          theme: { color: "#4F46E5" },
          modal: {
            ondismiss: function () {
              setIsLoading(null);
            },
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", () => {
          toast.error("Payment failed. Please try again.");
          setIsLoading(null);
        });
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(null);
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="bg-gray-200 p-1 rounded-full flex items-center">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              "px-6 py-2 text-sm font-semibold rounded-full",
              billingCycle === "monthly"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={cn(
              "px-6 py-2 text-sm font-semibold rounded-full",
              billingCycle === "yearly"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            )}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <PricingCard
          plan={planDetails.free}
          price={planDetails.free.pricing[billingCycle].price}
          billing={planDetails.free.pricing[billingCycle].billing}
          onSelect={handlePayment}
          isLoading={isLoading === planDetails.free.id}
          isPopular={false}
          isPostTrial={isPostTrial}
          currentPlan={currentPlan}
        />
        <PricingCard
          plan={planDetails.plus}
          price={planDetails.plus.pricing[billingCycle].price}
          billing={planDetails.plus.pricing[billingCycle].billing}
          onSelect={handlePayment}
          isLoading={isLoading === planDetails.plus.id}
          isPopular={false}
          currentPlan={currentPlan}
        />
        <PricingCard
          plan={planDetails.premium}
          price={planDetails.premium.pricing[billingCycle].price}
          billing={planDetails.premium.pricing[billingCycle].billing}
          onSelect={handlePayment}
          isLoading={isLoading === planDetails.premium.id}
          isPopular={true}
          currentPlan={currentPlan}
        />
        <PricingCard
          plan={planDetails.pro}
          price={planDetails.pro.pricing[billingCycle].price}
          billing={planDetails.pro.pricing[billingCycle].billing}
          onSelect={handlePayment}
          isLoading={isLoading === planDetails.pro.id}
          isPopular={false}
          currentPlan={currentPlan}
        />
      </div>
    </div>
  );
}