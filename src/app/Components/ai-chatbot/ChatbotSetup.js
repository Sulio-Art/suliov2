"use client";
import { useState, useEffect, useRef } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import toast from "react-hot-toast";
import { Loader2, Lock } from "lucide-react";
import { Textarea } from "../ui/textarea";
// --- IMPORTS FOR SKIPPING QUERY ---
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";
import {
  useGetChatbotSettingsQuery,
  useUpdateChatbotSettingsMutation,
} from "@/redux/Chatbot/chatbotApi";

// --- (STEP_PERMISSIONS remains the same) ---
const STEP_PERMISSIONS = {
  free: ["Setup Greetings", "Setup Artist"],
  plus: ["Setup Greetings", "Setup Artist", "Setup Damage"],
  premium: [
    "Setup Greetings", "Setup Artist", "Setup Damage",
    "Setup Invitation Co-operation", "Setup Comission",
  ],
  pro: [
    "Setup Greetings", "Setup Artist", "Setup Damage",
    "Setup Invitation Co-operation", "Setup Comission", "Return Artwork",
  ],
};

export default function ChatbotSetup({ activeStep }) {
  const { plan: userPlan, hasAccess } = useSubscription();
  
  // --- GET TOKEN FROM REDUX STORE ---
  const token = useSelector(selectBackendToken);

  // --- RTK Query Hooks ---
  // CORRECT: Added the skip option to prevent this query from running without a token.
  const { data: profile, isLoading: isSettingsLoading } = useGetChatbotSettingsQuery(
    undefined, 
    { skip: !token }
  );
  
  const [updateChatbotSettings, { isLoading: isUpdating }] = useUpdateChatbotSettingsMutation();
  const chatbotSettings = profile?.chatbotSettings || {};
  
  // --- Local State ---
  const [userInput, setUserInput] = useState("");
  const debounceTimeout = useRef(null);

  // --- Plan/Permission Logic (Unchanged) ---
  const isChatbotFeatureActive = hasAccess("aiChatbot");
  const isStepIncludedInPlan = STEP_PERMISSIONS[userPlan]?.includes(activeStep);
  const isStepAllowed = isChatbotFeatureActive && isStepIncludedInPlan;
  
  // Effect to populate the textarea when the active step or settings change
  useEffect(() => {
    // This now safely runs only after the profile has been successfully fetched.
    if (profile) {
      const settingKey = activeStep.toLowerCase().replace(/\s+/g, "-");
      setUserInput(chatbotSettings[settingKey] || "");
    }
  }, [activeStep, profile, chatbotSettings]);

  // Effect to handle auto-saving with debounce
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    debounceTimeout.current = setTimeout(async () => {
      // Don't try to save if there's no token or profile data
      if (!token || !profile) return;

      const settingKey = activeStep.toLowerCase().replace(/\s+/g, "-");
      const savedValue = chatbotSettings[settingKey] || "";

      if (userInput !== savedValue) {
        const newSettings = {
          ...chatbotSettings,
          [settingKey]: userInput,
        };
        try {
          await updateChatbotSettings(newSettings).unwrap();
          toast.success(`"${activeStep}" settings saved!`, {
            id: 'save-toast',
          });
        } catch (err) {
          toast.error("Failed to save settings.");
        }
      }
    }, 1000);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [userInput, activeStep, chatbotSettings, updateChatbotSettings, token, profile]);


  // isSettingsLoading will now correctly be true until the token exists AND the data is fetched.
  if (isSettingsLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col flex-1 p-6">
      {!isStepAllowed ? (
        <div className="flex justify-center items-center h-full">
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 max-w-md text-center">
            <Lock className="h-8 w-8 mx-auto mb-3 text-yellow-600" />
            <p className="text-yellow-800 font-semibold text-lg">
              Upgrade Required
            </p>
            <p className="text-yellow-700 text-sm mt-2">
              Upgrade your plan to configure the "{activeStep}" feature.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-shrink-0 mb-4">
            <h3 className="text-lg font-semibold mb-1">
              Configure "{activeStep}"
            </h3>
            <p className="text-sm text-gray-600">
              Enter your instructions below. This will help the AI understand
              how to handle this part of the conversation. Changes are saved automatically.
            </p>
          </div>
          <div className="relative flex-1">
            <Textarea
              placeholder={`Write your instructions for "${activeStep}"...`}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isUpdating || !isStepAllowed}
              className="w-full h-full text-base resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            {isUpdating && (
              <div className="absolute bottom-4 right-4 text-gray-500 flex items-center gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}