"use client";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Bot, Send, Loader2, User as UserIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useTestChatbotMutation } from "@/redux/Chatbot/chatbotApi"; // <-- IMPORT THE HOOK

export default function ChatbotTest({ activeStep }) {
  // --- RTK Query Mutation ---
  const [testChatbot, { isLoading }] = useTestChatbotMutation();

  // --- Local State ---
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // --- Effects (Unchanged) ---
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Testing the "${activeStep}" prompt. Type a message to begin.`
      }
    ]);
  }, [activeStep]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage = { role: "user", content: userInput };
    const currentMessages = [...messages, newUserMessage];
    
    setMessages(currentMessages);
    setUserInput("");

    try {
      // Use the RTK mutation hook
      const result = await testChatbot({
        messages: currentMessages,
        activeStep: activeStep,
      }).unwrap(); // .unwrap() provides better error handling

      const assistantMessage = { role: "assistant", content: result.response };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err) {
      const errorMessage = err.data?.message || "Failed to get a response from the chatbot.";
      toast.error(errorMessage);
      const errorResponseMessage = { role: "assistant", content: `Error: ${errorMessage}` };
      setMessages((prev) => [...prev, errorResponseMessage]);
    }
  };
  
  // --- JSX (Mostly Unchanged) ---
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'assistant' && (
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 flex-shrink-0">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
            )}
            <div className={`p-3 rounded-xl text-sm max-w-lg whitespace-pre-wrap ${message.role === 'assistant' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
              {message.content}
            </div>
             {message.role === 'user' && (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 flex-shrink-0">
                <UserIcon className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t pt-2 bg-white px-2 pb-2"
      >
        <Input
          type="text"
          placeholder="Type your message to test..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
          className="h-12 text-base"
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="h-12 w-12 flex-shrink-0 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
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