"use client";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Send, Loader2, User as UserIcon, Bot } from "lucide-react";
// CONNECTED BACKEND: Using the API file you provided
import { useTestChatbotMutation } from "@/redux/Chatbot/chatbotApi";

export default function ChatbotTest({ activeStep, messages, setMessages }) {
  const [testChatbot, { isLoading }] = useTestChatbotMutation();
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    // Generate a new ID when switching steps to restart context if needed
    // or keep one ID per step. For now, random on step change is safer.
    setConversationId(crypto.randomUUID());
  }, [activeStep]);

  useEffect(() => {
    if (!messages || messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hi! I'm your AI. Let's configure the "${activeStep}". What details should I know?`,
        },
      ]);
    }
  }, [activeStep, messages, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !conversationId) return;

    const newUserMessage = { role: "user", content: userInput };
    const currentMessages = [...messages, newUserMessage];

    setMessages(currentMessages);
    setUserInput("");

    try {
      // 1. Prepare Payload for Backend
      const payload = {
        messages: currentMessages,
        activeStep: activeStep,
        conversationId: conversationId,
      };

      // 2. Call the Mutation
      const result = await testChatbot(payload).unwrap();

      // 3. Handle Success
      const finalMessages = [
        ...currentMessages,
        { role: "assistant", content: result.response },
      ];
      setMessages(finalMessages);
    } catch (err) {
      console.error("Chat Error:", err);
      const errorMessage = err.data?.message || "Failed to get a response.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-white relative">
      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 z-10 scrollbar-thin scrollbar-thumb-gray-200">
        <div className="min-h-full flex flex-col justify-end space-y-4">
          {messages.map((message, index) => {
            const isUser = message.role === "user";
            return (
              <div
                key={index}
                className={`flex w-full gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 flex-shrink-0">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                )}

                <div
                  className={`relative px-4 py-3 max-w-[70%] text-sm rounded-2xl shadow-sm ${
                    isUser
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="break-words whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>

                {isUser && (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 flex-shrink-0">
                    <UserIcon className="h-4 w-4 text-blue-600" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex justify-start gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 flex-shrink-0">
                <Bot className="h-4 w-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                <span className="text-xs text-gray-500">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-4 bg-white flex items-center gap-3 z-10 flex-shrink-0 border-t border-gray-100"
      >
        <div className="flex-1 bg-gray-50 rounded-full flex items-center px-4 py-3 border border-gray-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
          <input
            type="text"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400"
          />
        </div>

        {userInput.trim() && (
          <button
            type="submit"
            disabled={isLoading}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm animate-in zoom-in duration-200"
          >
            <Send className="h-5 w-5" />
          </button>
        )}
      </form>
    </div>
  );
}
