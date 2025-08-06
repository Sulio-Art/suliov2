"use client";

import { Controller } from "react-hook-form";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input";
import { Label } from "../../../Components/ui/label";
import { Loader2 } from "lucide-react";

export default function OtpForm({ control, errors, isSubmitting }) {
  return (
    <>
      <div>
        <Label htmlFor="otp">Verification Code</Label>
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <Input id="otp" placeholder="Enter 6 digit code" {...field} />
          )}
        />
        {errors.otp && (
          <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Verify Email
      </Button>
    </>
  );
}
