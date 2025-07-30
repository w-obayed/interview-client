"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { MailCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { verifyEmail } from "@/lib/auth/auth";

export default function EmailVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  // Create refs outside of useMemo
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  // Store refs array in useMemo
  const inputRefs = useMemo(
    () => [ref1, ref2, ref3, ref4, ref5, ref6],
    [ref1, ref2, ref3, ref4, ref5, ref6]
  );

  // Focus the first input when component mounts
  useEffect(() => {
    inputRefs[0].current?.focus();
  }, [inputRefs]);

  const handleChange = (index, value) => {
    // Clear error when typing
    if (error) setError("");

    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Update the code array
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Ensure the pasted data is exactly 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);

      // Automatically focus the last input field
      inputRefs[5]?.current?.focus();
    } else {
      setError("Invalid code format. Please paste a 6-digit code.");
    }
  };

  const verifyCode = async () => {
    const fullCode = code.join("");

    // Check if code is complete
    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    try {
      setIsVerifying(true);
      const response = await verifyEmail({ verificationToken: fullCode });
      setIsVerifying(false);

      if (response.success) {
        setIsVerified(true);
      } else {
        setError(
          response.error || "Invalid verification code. Please try again."
        );
      }
    } catch (error) {
      setIsVerifying(false);
      setError(
        "An unexpected error occurred. Please try again later.",
        error.message
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-4">
              <MailCheck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Verify your email
          </CardTitle>
          <CardDescription>
            We have sent a 6-digit verification code to your email address.
            Enter the code below to confirm your email.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!isVerified ? (
            <>
              <div className="flex justify-center gap-2 mb-6">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-lg font-medium"
                  />
                ))}
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center mb-4">{error}</p>
              )}

              <Button
                onClick={verifyCode}
                disabled={isVerifying}
                className="w-full"
              >
                {isVerifying ? "Verifying..." : "Verify Email"}
              </Button>
            </>
          ) : (
            <div className="text-center p-4">
              <div className="rounded-full bg-green-200 p-3 mx-auto mb-4 w-fit">
                <MailCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-primary mb-2">
                Email Verified!
              </h3>
              <p className="text-gray-600">
                Thank you for verifying your email address.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          {!isVerified ? (
            <div className="text-center text-sm w-full">
              <span className="text-gray-500">Did not receive a code? </span>
              <Input type="hidden" />
              <Button variant="link" className="p-0 h-auto font-medium">
                Resend Code
              </Button>
            </div>
          ) : (
            <div className="text-center text-sm w-full">
              <span className="text-gray-500">Please login your account. </span>
              <Link
                href={"/login"}
                className="text-base text-primary underline font-medium"
              >
                login
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
