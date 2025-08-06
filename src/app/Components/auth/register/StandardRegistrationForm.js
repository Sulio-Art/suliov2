"use client";

import { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import Link from "next/link";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input";
import { Label } from "../../../Components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

export default function StandardRegistrationForm({
  control,
  errors,
  isSubmitting,
  userExistsError,
  passwordValue,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordWrapperRef = useRef(null);
  const confirmPasswordWrapperRef = useRef(null);

  return (
    <>
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
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        {userExistsError && (
          <p className="text-red-500 text-sm mt-1">
            An account with this email already exists.{" "}
            <Link
              href="/auth/login"
              className="font-bold underline hover:text-red-700"
            >
              Please log in.
            </Link>
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative" ref={passwordWrapperRef}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...field}
                className="pr-10"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
        <PasswordStrengthIndicator password={passwordValue} />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative" ref={confirmPasswordWrapperRef}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...field}
                className="pr-10"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </>
  );
}
