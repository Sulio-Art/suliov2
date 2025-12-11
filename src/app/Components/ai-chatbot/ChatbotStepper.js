import { CheckCircle2, Circle, HelpCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatbotStepper({
  steps,
  stepDescriptions, // Receiving descriptions from parent
  activeStep,
  setActiveStep,
  completedSteps = [],
}) {
  const completionPercentage =
    steps.length > 0
      ? Math.round((completedSteps.length / steps.length) * 100)
      : 0;

  const currentStepIndex = steps.indexOf(activeStep) + 1;

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-blue-50/30 flex-shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-sm">
              Complete these steps to go live
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Configure your AI chatbot to interact with artists and clients
            </p>
          </div>

          <button type="button" className="group relative flex-shrink-0 ml-2">
            <HelpCircle className="h-4 w-4 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer" />

            <div className="absolute right-0 top-6 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-lg pointer-events-none group-hover:pointer-events-auto">
              <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              Click for detailed setup instructions and tips
            </div>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium">
              Step {currentStepIndex} of {steps.length}
            </span>
            <span className="text-blue-600 font-semibold">
              {completionPercentage}% Complete
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Status Badge */}
        {completedSteps.length === steps.length && (
          <div className="mt-3 flex items-center gap-2 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 animate-in fade-in slide-in-from-top-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="font-medium">All steps completed!</span>
          </div>
        )}
      </div>

      {/* STEPS LIST */}
      <div className="flex-1 p-2 flex flex-col gap-2 h-full overflow-y-auto">
        {steps.map((step) => {
          const isActive = activeStep === step;
          const isCompleted = completedSteps.includes(step);
          const description =
            stepDescriptions?.[step] || "Configure settings for this section";

          return (
            <button
              key={step}
              type="button"
              onClick={() => setActiveStep(step)}
              // UPDATED: Added 'title' attribute for hover visibility
              title={description}
              className={cn(
                "w-full flex-1 flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all border group min-h-[60px]",
                isActive
                  ? "border-blue-500 bg-blue-50/80 shadow-sm"
                  : "border-transparent hover:bg-gray-50"
              )}
            >
              {/* Text Column */}
              <div className="flex flex-col text-left mr-3 overflow-hidden min-w-0">
                <span
                  className={cn(
                    "font-medium truncate text-sm",
                    isActive ? "text-blue-700" : "text-gray-700"
                  )}
                >
                  {step}
                </span>
                <span
                  className={cn(
                    "text-xs truncate mt-0.5",
                    isActive
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  )}
                >
                  {description}
                </span>
              </div>

              {/* Status Icon */}
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600" />
              ) : (
                <Circle
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive
                      ? "text-blue-400"
                      : "text-gray-300 group-hover:text-gray-400"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="p-3 border-t bg-blue-50/50 flex-shrink-0">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-medium text-gray-700">Tip:</span> Configure
            each step carefully and save to ensure your chatbot works perfectly.
          </p>
        </div>
      </div>
    </div>
  );
}
