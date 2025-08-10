import { useSession } from "next-auth/react";
import { planDetails } from "../app/Components/subscription/planDetails";

const featureAccessMap = {
  "Transaction and sales tracking": { plans: ["plus", "premium", "pro"] },
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
    if (!featureName || !featureAccessMap[featureName]) {
      return true;
    }
    return featureAccessMap[featureName].plans.includes(plan);
  };

  return {
    plan,
    planData,
    isLoading,
    hasAccess,
  };
}
