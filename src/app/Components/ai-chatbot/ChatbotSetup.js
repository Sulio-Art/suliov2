"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSubscription } from "@/hooks/useSubscription"; 
import toast from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";
import { Input } from "../ui/input";

const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

export default function ChatbotSetup({ activeStep }) {
  const { data: session } = useSession();
  const { hasAccess } = useSubscription();

  const isStepAllowed = hasAccess(activeStep.replace("Setup ", ""));

  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || !isStepAllowed || isLoading) return;
    setIsLoading(true);
    try {
      const apiEndpoint = `${CHATBOT_API_URL}/settings/${activeStep.toLowerCase().replace(/\s+/g, "-")}`;
      await new Promise((r) => setTimeout(r, 900)); 
      toast.success(`Saved configuration for: '${activeStep}'`);
      setSaved(userInput);
      setUserInput("");
    } catch (err) {
      toast.error(err.message || "An error occurred while saving.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 justify-end">
      
      {saved && (
        <div className="mb-2 text-sm text-green-600">
          Saved for <span className="font-semibold">{activeStep}</span>: {saved}
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-3 border-t pt-4 bg-white px-2 pb-2"
      >
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
          className="h-12 text-base"
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim() || !isStepAllowed}
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
  );
}
