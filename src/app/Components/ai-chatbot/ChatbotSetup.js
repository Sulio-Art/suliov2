"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useGetChatbotSettingsQuery, useUpdateChatbotSettingsMutation } from "@/redux/Chatbot/chatbotApi";
import { useGetMySubscriptionQuery } from "@/redux/Subscription/subscriptionApi";
import { setFormDirty } from "@/redux/UI/uiSlice";

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
  const dispatch = useDispatch();
  
  // State for the settings as they are being actively edited by the user.
  const [currentSettings, setCurrentSettings] = useState({});
  // State to hold the last known "saved" version of the settings.
  const [initialSettings, setInitialSettings] = useState({});

  // Data fetching hooks
  const { data: profile, isLoading: isSettingsLoading } = useGetChatbotSettingsQuery();
  const { data: subscription, isLoading: isSubscriptionLoading } = useGetMySubscriptionQuery();
  const [updateChatbotSettings, { isLoading: isSaving }] = useUpdateChatbotSettingsMutation();

  // Derived state for permissions
  const userPlan = subscription?.plan || "free";
  const hasAccess = (featureKey) => !!subscription?.entitlements?.features?.[featureKey];
  const isStepAllowed = hasAccess("aiChatbot") && STEP_PERMISSIONS[userPlan]?.includes(activeStep);
  
  // Derived state to check for unsaved changes
  const isDirty = useMemo(() => JSON.stringify(currentSettings) !== JSON.stringify(initialSettings), [currentSettings, initialSettings]);

  // Effect for browser navigation warning (e.g., closing tab, refresh)
  // This logic is now self-contained within this component.
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = ''; 
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  // Effect to sync our component's dirty status with the global Redux state
  // This is used by the LogoutButton to show the custom dialog.
  useEffect(() => {
    dispatch(setFormDirty(isDirty));
    // When this component unmounts, reset the global flag to false.
    return () => {
      dispatch(setFormDirty(false));
    };
  }, [isDirty, dispatch]);

  // Effect to populate state when server data arrives
  useEffect(() => {
    if (profile?.chatbotSettings) {
      setCurrentSettings(profile.chatbotSettings);
      setInitialSettings(profile.chatbotSettings);
    }
  }, [profile]);

  // Handler for text input changes
  const handleInputChange = (e) => {
    const settingKey = activeStep.toLowerCase().replace(/\s+/g, "-");
    setCurrentSettings(prev => ({ ...prev, [settingKey]: e.target.value }));
  };

  // Handler for the Save button
  const handleSave = async () => {
    if (!isDirty || isSaving) return;
    try {
      await updateChatbotSettings(currentSettings).unwrap();
      toast.success("Settings saved successfully!");
      // After saving, the current state becomes the new "initial" state, resetting isDirty to false.
      setInitialSettings(currentSettings);
    } catch (err) {
      toast.error(err.data?.message || "Failed to save settings.");
    }
  };

  // Get the current value for the active step from the settings object.
  const settingKey = activeStep.toLowerCase().replace(/\s+/g, "-");
  const currentValue = currentSettings[settingKey] || "";

  // Combined loading state
  if (isSettingsLoading || isSubscriptionLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header section containing the title and the save button */}
      <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
        <div>
          <h3 className="text-lg font-semibold">
            Configure "{activeStep}"
          </h3>
          <p className="text-sm text-gray-600">
            Enter instructions below. Click "Save Changes" to apply.
          </p>
        </div>
        <Button onClick={handleSave} disabled={!isDirty || isSaving} size="sm">
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
          {isSaving ? "Saving..." : isDirty ? "Save Changes" : "Saved"}
        </Button>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 p-6 min-h-0">
        {!isStepAllowed ? (
          <div className="flex justify-center items-center h-full">
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 max-w-md text-center">
              <Lock className="h-8 w-8 mx-auto mb-3 text-yellow-600" />
              <p className="text-yellow-800 font-semibold text-lg">Upgrade Required</p>
              <p className="text-yellow-700 text-sm mt-2">
                Upgrade your plan to configure the "{activeStep}" feature.
              </p>
            </div>
          </div>
        ) : (
          <Textarea
            placeholder={`Write your instructions for "${activeStep}"...`}
            value={currentValue}
            onChange={handleInputChange}
            disabled={!isStepAllowed}
            className="w-full h-full text-base resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        )}
      </div>
    </div>
  );
}