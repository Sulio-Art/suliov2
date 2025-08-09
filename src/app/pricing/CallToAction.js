import { Button } from "../ui/button";

export default function CallToAction() {
  return (
    <div className="bg-gray-900 mt-24">
      <div className="max-w-4xl mx-auto text-center py-16 px-4">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          The all-in-one solution for artists to elevate their business with AI
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Sulio AI Chatbot Assistant helps artists automate client interactions,
          manage sales, and enhance their engagement—seamlessly.
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            className="bg-yellow-400 text-black hover:bg-yellow-500 h-14 text-xl font-bold"
          >
            Get Set Up Today
          </Button>
          <p className="text-sm text-gray-400 mt-2">
            Start your free 30-day trial today!
          </p>
        </div>
      </div>
    </div>
  );
}
