"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginImage from "@/app/assets/image/signup-image.png";
import Image from "next/image";
import useForm from "@/hook/useFrom";
import Link from "next/link";
import { signup } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { input, inputValue, formReset } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await signup(input);

    if (response.success) {
      formReset();
      setIsLoading(false);
      redirect("/verify-email");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#040613]">
        <Image src={loginImage} alt="Login" className="max-w-full h-full" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              SignUp
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Welcome Back, Please Enter your Details to Log In.
            </p>
          </div>

          <div className="space-y-6">
            <form className="space-y-3" onSubmit={formSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={input.name}
                    onChange={inputValue}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={input.email}
                    onChange={inputValue}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className=" pr-10"
                    placeholder="Enter your password"
                    value={input.password}
                    onChange={inputValue}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-2"
              >
                {isLoading ? "signup..." : "signup"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                  Or
                </span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
              </span>
              <Link
                href="/login"
                className="font-medium text-black px-2 py-1 rounded"
              >
                login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
