import { useState } from "react";
import { Bot, Send, Loader2 } from "lucide-react";
import { Input } from "../ui/input";

export default function ChatbotTest() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 500));
    setUserInput("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
            <Bot className="h-4 w-4 text-blue-600" />
          </div>
          <div className="p-3 rounded-xl text-sm bg-gray-100 text-gray-800 max-w-lg">
            What is your return policy?
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t pt-2 bg-white px-2 pb-2"
      >
        <Input
          type="text"
          placeholder="Type your answer..."
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
