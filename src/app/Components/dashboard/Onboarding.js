"use client";

import Link from 'next/link';
import { Button } from '../ui/button';
import { CheckCircle2, UploadCloud, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const OnboardingStep = ({ title, icon, isComplete, href }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
                <div className={cn("h-12 w-12 rounded-full flex items-center justify-center", isComplete ? "bg-green-100" : "bg-blue-100")}>
                    {isComplete ? <CheckCircle2 className="h-6 w-6 text-green-600"/> : icon}
                </div>
                <span className="font-semibold text-gray-800">{title}</span>
            </div>
            {isComplete ? (
                <div className="text-sm font-medium text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5"/>
                    Completed
                </div>
            ) : (
                <Link href={href}>
                    <Button variant="outline">Start</Button>
                </Link>
            )}
        </div>
    );
};

export default function Onboarding({ onboardingStatus = {}, userId }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-lg font-bold text-center text-gray-900">
          To get started complete these steps
        </h2>
        <OnboardingStep
          title="Upload your first artwork"
          icon={<UploadCloud className="h-6 w-6 text-blue-600" />}
          isComplete={onboardingStatus?.hasUploadedArtwork}
          href={`/user/${userId}/artwork-management/upload`}
        />
        <OnboardingStep
          title="Setup your chatbot"
          icon={<Bot className="h-6 w-6 text-blue-600" />}
          isComplete={onboardingStatus?.isChatbotConfigured}
          href={`/user/${userId}/ai-chatbot`}
        />
      </div>
    </div>
  );
}