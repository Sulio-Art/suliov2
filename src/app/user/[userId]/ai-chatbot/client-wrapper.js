"use client";
import { useState, useEffect } from "react";
import ChatbotStepper from "../../../Components/ai-chatbot/ChatbotStepper";
import ChatbotSetup from "../../../Components/ai-chatbot/ChatbotSetup";
import ChatbotTest from "../../../Components/ai-chatbot/ChatbotTest";
// --- The problematic import is now REMOVED ---
import { cn } from "@/lib/utils";

const steps = [
  "Setup Greetings",
  "Setup Artist",
  "Setup Damage",
  "Setup Invitation Co-operation",
  "Setup Comission",
  "Return Artwork",
];

// --- THE FIX IS HERE: Define the constant directly in the file that uses it. ---
const CHAT_HISTORY_STORAGE_KEY = 'sulioV2TestChatHistories';

export default function ClientWrapper() {
  const [activeStep, setActiveStep] = useState(steps[0]);
  const [activeTab, setActiveTab] = useState("setup");
  const [messageHistories, setMessageHistories] = useState({});

  useEffect(() => {
    try {
      // Use the locally defined constant
      const savedHistories = localStorage.getItem(CHAT_HISTORY_STORAGE_KEY);
      if (savedHistories) {
        setMessageHistories(JSON.parse(savedHistories));
      }
    } catch (error) {
      console.error("Failed to load chat history from local storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (Object.keys(messageHistories).length > 0) {
        // Use the locally defined constant
        localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(messageHistories));
      }
    } catch (error) {
      console.error("Failed to save chat history to local storage:", error);
    }
  }, [messageHistories]);

  const handleSetMessages = (newMessages) => {
    setMessageHistories(prev => ({ ...prev, [activeStep]: newMessages }));
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto h-full min-h-0 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">AI Chatbot Settings</h1>
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 w-full">
        <h2 className="text-md font-medium text-gray-600 mb-3">
          Complete these steps to go live
        </h2>
        <div className="overflow-x-auto">
          <ChatbotStepper
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm flex-1 min-h-0 flex flex-col w-full">
        <div className="flex border-b flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("setup")}
            className={cn(
              "flex-1 py-3 px-4 text-center font-semibold transition-colors",
              activeTab === "setup"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:bg-gray-100"
            )}
          >
            Setup chatbot
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("test")}
            className={cn(
              "flex-1 py-3 px-4 text-center font-semibold transition-colors",
              activeTab === "test"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:bg-gray-100"
            )}
          >
            Test chatbot
          </button>
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          {activeTab === "setup" ? (
            <ChatbotSetup activeStep={activeStep} />
          ) : (
            <ChatbotTest 
              activeStep={activeStep} 
              messages={messageHistories[activeStep] || []}
              setMessages={handleSetMessages}
            /> 
          )}
        </div>
      </div>
    </div>
  );
}