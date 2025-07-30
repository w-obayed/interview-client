"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginImage from "@/app/assets/image/login-image.png";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import useForm from "@/hook/useFrom";
import Link from "next/link";
import { login } from "@/lib/auth/auth";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const { input, inputValue, formReset } = useForm({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userLogin } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(input);
      setIsLoading(false);

      if (response.success === true) {
        userLogin(response.token, response.user);
        // Reset form
        formReset();
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-emerald-700 via-slate-900 to-emerald-800">
        <Image src={loginImage} alt="Login" className="bg-transparent w-full" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Login
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Welcome Back, Please Enter your Details to Log In.
            </p>
          </div>

          <div className="space-y-6">
            <form className="space-y-3" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="pl-10"
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
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href={"/forgot password"}
                  className="text-sm text-cyan-600 hover:text-cyan-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {isLoading ? "Logging in..." : "Log In"}
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
                href={"/signup"}
                className="font-medium text-black px-2 py-1 rounded"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
