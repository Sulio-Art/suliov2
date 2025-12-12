"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ChatbotStepper from "../../../Components/ai-chatbot/ChatbotStepper";
import ChatbotTest from "../../../Components/ai-chatbot/ChatbotTest";
import { cn } from "@/lib/utils";
import { RefreshCw, ArrowRight, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useGetMySubscriptionQuery } from "@/redux/Subscription/subscriptionApi";
import { useGetChatbotSettingsQuery } from "@/redux/Chatbot/chatbotApi"; // CONNECTED BACKEND
import { Button } from "../../../Components/ui/button";

const STEP_PERMISSIONS = {
  free: ["Setup Greetings", "Setup Artist"],
  plus: ["Setup Greetings", "Setup Artist", "Setup Damage"],
  premium: [
    "Setup Greetings",
    "Setup Artist",
    "Setup Damage",
    "Setup Invitation Co-operation",
    "Setup Comission",
  ],
  pro: [
    "Setup Greetings",
    "Setup Artist",
    "Setup Damage",
    "Setup Invitation Co-operation",
    "Setup Comission",
    "Return Artwork",
  ],
};

const steps = [
  "Setup Greetings",
  "Setup Artist",
  "Setup Damage",
  "Setup Invitation Co-operation",
  "Setup Comission",
  "Return Artwork",
];

const STEP_DESCRIPTIONS = {
  "Setup Greetings": "Define start messages & welcome tone",
  "Setup Artist": "Configure persona, style & background",
  "Setup Damage": "Handle artwork damage & restoration queries",
  "Setup Invitation Co-operation": "Manage event invites & partnerships",
  "Setup Comission": "Set pricing, rules & custom request logic",
  "Return Artwork": "Define return policies & refund processes",
};

const CHAT_HISTORY_STORAGE_KEY = "sulioV2TestChatHistories";

export default function ClientWrapper() {
  const [activeStep, setActiveStep] = useState(steps[0]);
  const [messageHistories, setMessageHistories] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [viewMode, setViewMode] = useState("chat");

  // 1. Fetch Subscription (Existing)
  const { data: subscription, isLoading: isSubscriptionLoading } =
    useGetMySubscriptionQuery();

  // 2. Fetch Chatbot Settings (NEW CONNECTION)
  const { data: profileData, isLoading: isSettingsLoading } =
    useGetChatbotSettingsQuery();

  const userPlan = subscription?.plan || "free";

  // Check permissions
  const isStepAllowed = (step) => {
    if (isSubscriptionLoading) return true;
    const allowedSteps = STEP_PERMISSIONS[userPlan] || STEP_PERMISSIONS["free"];
    return allowedSteps.includes(step);
  };

  // Load local chat history
  useEffect(() => {
    try {
      const savedHistories = localStorage.getItem(CHAT_HISTORY_STORAGE_KEY);
      if (savedHistories) setMessageHistories(JSON.parse(savedHistories));
    } catch (error) {
      console.error("Failed to load local storage data:", error);
    }
  }, []);

  // Save chat history to local storage
  useEffect(() => {
    if (Object.keys(messageHistories).length > 0) {
      localStorage.setItem(
        CHAT_HISTORY_STORAGE_KEY,
        JSON.stringify(messageHistories)
      );
    }
  }, [messageHistories]);

  // 3. Sync Completed Steps from Backend (NEW)
  useEffect(() => {
    if (profileData && profileData.chatbotSettings) {
      // Convert backend keys (e.g., "setup-artist") to frontend step names
      const backendSettings = profileData.chatbotSettings;
      const completed = [];

      steps.forEach((step) => {
        // Backend key logic: "Setup Artist" -> "setup-artist"
        const backendKey = step.toLowerCase().replace(/\s+/g, "-");
        // If the key exists in the map and has a value, mark it complete
        if (backendSettings[backendKey]) {
          completed.push(step);
        }
      });
      setCompletedSteps(completed);
    }
  }, [profileData]);

  useEffect(() => {
    const allCompleted = steps.every((s) => completedSteps.includes(s));
    if (allCompleted && completedSteps.length > 0) {
      setViewMode("success");
    } else {
      setViewMode("chat");
    }
  }, [completedSteps]);

  const handleSetMessages = (newMessages) => {
    setMessageHistories((prev) => ({ ...prev, [activeStep]: newMessages }));
  };

  const handleSidebarClick = (step) => {
    setActiveStep(step);
    setViewMode("chat");
  };

  const isLoading = isSubscriptionLoading || isSettingsLoading;

  return (
    <div className="w-full h-[calc(100vh-10px)] p-4 flex flex-col max-w-[1600px] mx-auto overflow-hidden">
      <Toaster position="top-center" />

      <div className="mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">
          AI Chatbot Settings
        </h1>
      </div>

      <div className="flex flex-row gap-6 h-full min-h-0">
        {/* LEFT COLUMN: Main Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
          {viewMode === "success" ? (
            // --- SUCCESS VIEW ---
            <div className="flex flex-col h-full animate-in fade-in duration-500">
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white/50">
                <div className="mb-2 flex items-center gap-2 text-gray-800 font-semibold text-lg">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  AI Artist Chatbot
                </div>

                <div className="relative mt-8 mb-8">
                  <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full" />
                  <div className="relative h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-200">
                    <RefreshCw className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full relative z-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Congratulations!
                  </h2>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    You are all set. Anytime you can ask me to change the way of
                    talking and thinking.
                  </p>

                  <Link
                    href="/dashboard"
                    className="text-blue-600 font-semibold hover:underline text-sm inline-flex items-center cursor-pointer"
                  >
                    Go to Dashboard <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // --- CHAT CONFIG VIEW ---
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b bg-white flex items-center justify-between flex-shrink-0 z-20 shadow-sm">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-800">{activeStep}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {STEP_DESCRIPTIONS[activeStep] || "Configure this setting"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium capitalize">
                    Plan: {userPlan}
                  </div>
                  {/* SAVE BUTTON REMOVED AS REQUESTED */}
                </div>
              </div>

              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : isStepAllowed(activeStep) ? (
                <ChatbotTest
                  activeStep={activeStep}
                  messages={messageHistories[activeStep] || []}
                  setMessages={handleSetMessages}
                />
              ) : (
                /* LOCKED VIEW */
                <div className="flex-1 flex items-center justify-center bg-gray-50/30">
                  <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-md text-center shadow-sm">
                    <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Feature Locked
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      The <strong>"{activeStep}"</strong> feature is only
                      available on <strong>Plus</strong> plans and above.
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-full">
                      Upgrade to Unlock
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="w-[320px] flex-shrink-0 h-full">
          <ChatbotStepper
            steps={steps}
            stepDescriptions={STEP_DESCRIPTIONS}
            activeStep={activeStep}
            setActiveStep={handleSidebarClick}
            completedSteps={completedSteps}
          />
        </div>
      </div>
    </div>
  );
}
