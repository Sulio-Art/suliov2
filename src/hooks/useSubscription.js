import { useSession } from "next-auth/react";
import { planDetails } from "../app/Components/subscription/planDetails";

// A map defining which paid plans get access to specific premium features.
const featureAccessMap = {
  "Transaction Management": { plans: ["plus", "premium", "pro"] },
  "Personalized greetings": { plans: ["plus", "premium", "pro"] },
  "Customizable chat responses": { plans: ["pro"] },
  "AI-generated buyer recommendations": { plans: ["plus", "premium", "pro"] },
  "Sales performance insights": { plans: ["plus", "premium", "pro"] },
  "Referral rewards program access": { plans: ["premium", "pro"] },
  "Audience analytics": { plans: ["premium", "pro"] },
  "After-sales service management": { plans: ["premium", "pro"] },
};

export function useSubscription() {
  const { data: session, status } = useSession();

  const plan = session?.user?.currentPlan || "free";
  const isLoading = status === "loading";
  const planData = planDetails[plan];

  /**
   * Checks if the current user's plan has access to a specific feature.
   * @param {string} featureName - The name of the feature from featureList.
   * @returns {boolean} - True if the user has access, false otherwise.
   */
  const hasAccess = (featureName) => {
    // If featureName is not in our map, it's a standard feature available to all.
    if (!featureName || !featureAccessMap[featureName]) {
      return true;
    }

    // --- FIX: Check if the user's current plan is included in the feature's allowed plans.
    // This is safer as it defaults to denying access for unlisted plans.
    return featureAccessMap[featureName].plans.includes(plan);
  };

  return {
    plan,
    planData,
    isLoading,
    hasAccess,
  };
}