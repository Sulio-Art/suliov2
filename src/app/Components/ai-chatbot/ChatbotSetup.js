"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSubscription } from "@/hooks/useSubscription";
import toast from "react-hot-toast";
import { Send, Loader2, Lock } from "lucide-react";
import { Input } from "../ui/input";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export default function ChatbotSetup({ activeStep }) {
  const { data: session } = useSession();
  const { plan: userPlan, hasAccess } = useSubscription();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const isChatbotFeatureActive = hasAccess("aiChatbot");
  const isStepIncludedInPlan = STEP_PERMISSIONS[userPlan]?.includes(activeStep);
  const isStepAllowed = isChatbotFeatureActive && isStepIncludedInPlan;

  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allSettings, setAllSettings] = useState({});
  const [currentSavedPrompt, setCurrentSavedPrompt] = useState("");
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      if (!session) return;
      setIsSettingsLoading(true);
      try {
        const response = await fetch(`${BACKEND_API_URL}/profiles/me`, {
          headers: { Authorization: `Bearer ${session.backendToken}` },
        });

        if (!response.ok) throw new Error("Could not fetch settings.");
        const profile = await response.json();

        setAllSettings(profile.chatbotSettings || {});
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsSettingsLoading(false);
      }
    };
    fetchSettings();
  }, [session]);

  useEffect(() => {
    if (!isSettingsLoading) {
      const settingKey = activeStep.toLowerCase().replace(/\s+/g, "-");
      const savedPromptForCurrentStep = allSettings[settingKey] || "";
      setCurrentSavedPrompt(savedPromptForCurrentStep);
      setUserInput(savedPromptForCurrentStep);

      if (savedPromptForCurrentStep) {
        setMessages([
          {
            type: "system",
            content: `Current setting for "${activeStep}": ${savedPromptForCurrentStep}`,
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages([]);
      }
    }
  }, [activeStep, allSettings, isSettingsLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!isStepAllowed || isLoading || !session || !userInput.trim()) return;

    const userMessage = {
      type: "user",
      content: userInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    const currentInput = userInput;
    setUserInput(""); 

    try {
      const response = await fetch(`${BACKEND_API_URL}/api/chat/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.backendToken}`,
        },
        body: JSON.stringify({
          setting: activeStep,
          value: currentInput,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to save the setting.");
      }

      const successMessage = {
        type: "system",
        content: `✅ Setting saved successfully for "${activeStep}"`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, successMessage]);

      toast.success(result.message);

      const settingKey = activeStep.toLowerCase().replace(/\s+/g, "-");
      setAllSettings((prevSettings) => ({
        ...prevSettings,
        [settingKey]: currentInput,
      }));
      setCurrentSavedPrompt(currentInput);
    } catch (err) {
      const errorMessage = {
        type: "system",
        content: `❌ Error: ${err.message || "An error occurred while saving."}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      toast.error(err.message || "An error occurred while saving.");
      setUserInput(currentInput); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full w-full" style={{ minHeight: "60vh" }}>
      <div
        ref={chatContainerRef}
        className="absolute top-0 left-0 right-0 bottom-20 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {!isStepAllowed && (
          <div className="flex justify-center">
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 max-w-md text-center">
              <Lock className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-yellow-800 font-medium">Upgrade Required</p>
              <p className="text-yellow-700 text-sm mt-1">
                Upgrade your plan to configure "{activeStep}" feature.
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.type === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-white border shadow-sm rounded-bl-md"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.type === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {messages.length === 0 && isStepAllowed && (
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-lg font-medium mb-2">
                Configure "{activeStep}"
              </p>
              <p className="text-sm max-w-md">
                Enter your instructions below to set up this step. This will
                help the AI understand how to handle this part of the
                conversation.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder={
                isStepAllowed
                  ? `Write your instructions for "${activeStep}"...`
                  : "Upgrade your plan to configure this feature."
              }
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isLoading || !isStepAllowed}
              autoComplete="off"
              className="h-12 text-base pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            {!isStepAllowed && (
              <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !isStepAllowed || !userInput.trim()}
            className="h-12 w-12 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


