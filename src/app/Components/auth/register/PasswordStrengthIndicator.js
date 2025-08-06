import { Check, X } from "lucide-react";

export default function PasswordStrengthIndicator({ password = '' }) {
    const checks = [
        { id: 'length', re: /.{8,}/, text: "At least 8 characters" },
        { id: 'uppercase', re: /[A-Z]/, text: "One uppercase letter (A-Z)" },
        { id: 'number', re: /[0-9]/, text: "One number (0-9)" },
        { id: 'special', re: /[\W_]/, text: "One special character (!@#$%)" },
    ];

    const unfulfilledChecks = checks.filter(check => !check.re.test(password));

    if (unfulfilledChecks.length === 0) {
        return (
            <div className="flex items-center text-sm text-green-600 mt-2">
                <Check className="h-4 w-4 mr-2" />
                <span>Password strength is excellent</span>
            </div>
        );
    }

    return (
        <div className="space-y-1 mt-2">
            {unfulfilledChecks.map((check) => (
                <div key={check.id} className="flex items-center text-sm text-gray-500">
                    <X className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{check.text}</span>
                </div>
            ))}
        </div>
    );
};