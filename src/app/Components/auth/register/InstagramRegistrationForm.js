"use client";

import { Controller } from "react-hook-form";
import Link from "next/link";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input";
import { Label } from "../../../Components/ui/label";
import { Loader2 } from "lucide-react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

export default function InstagramRegistrationForm({
  control,
  errors,
  formStep,
  userExistsError,
  passwordValue,
  onSendOtp,
  onVerifyOtp,
  isOtpLoading,
  onOtpChange,
  otpValue,
  isSubmitting,
}) {
  return (
    <>
      <div className={formStep !== "DETAILS" ? "hidden" : ""}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
            {userExistsError && (
              <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1 mt-2 text-blue-700 text-sm flex items-center gap-1">
                <span>🚩 This email is already in use.</span>
                <Link
                  href="/auth/login"
                  className="font-semibold underline hover:text-blue-800"
                >
                  Go to login
                </Link>
              </div>
            )}
          </div>
          <Button
            type="button"
            className="w-full"
            onClick={onSendOtp}
            disabled={isOtpLoading}
          >
            {isOtpLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Email
          </Button>
        </div>
      </div>

      <div className={formStep !== "OTP_VERIFICATION" ? "hidden" : ""}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              placeholder="Enter 6 digit code"
              value={otpValue}
              onChange={onOtpChange}
              maxLength={6}
            />
          </div>
          <Button
            type="button"
            className="w-full"
            onClick={onVerifyOtp}
            disabled={isOtpLoading}
          >
            {isOtpLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Code
          </Button>
        </div>
      </div>

      <div className={formStep !== "PASSWORD_SETUP" ? "hidden" : ""}>
        <div className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input id="firstName" {...field} />}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => <Input id="lastName" {...field} />}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="final-email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="final-email"
                  type="email"
                  {...field}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
              )}
            />
            <p className="text-sm text-green-600 mt-1">✓ Email verified.</p>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    {...field}
                    className="pr-10"
                  />
                )}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <PasswordStrengthIndicator password={passwordValue} />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...field}
                    className="pr-10"
                  />
                )}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {formStep === "PASSWORD_SETUP" && (
        <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account & Finish
        </Button>
      )}
    </>
  );
}