import { Button } from "../ui/button";

export default function ChatbotStepper({ steps, activeStep, setActiveStep }) {
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step) => (
        <Button
          key={step}
          type="button"
          variant={activeStep === step ? "default" : "outline"}
          onClick={() => setActiveStep(step)}
          className="rounded-full px-4 text-sm"
          aria-selected={activeStep === step}
        >
          {step}
        </Button>
      ))}
    </div>
  );
}
