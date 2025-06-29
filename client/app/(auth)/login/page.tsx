"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Workflow,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  GitBranch,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#F97315]/20 via-black to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute top-20 left-20 w-32 h-32 bg-[#F97315]/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-[#F97315]/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#F97315]/15 rounded-full blur-md animate-pulse delay-500" />

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Workflow className="h-12 w-12 text-[#F97315]" />
              <span className="text-3xl font-bold">MacroBridge</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Automate your workflows,
              <br />
              <span className="text-[#F97315]">amplify your productivity</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect your favorite apps and automate repetitive tasks without
              writing a single line of code.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#F97315] rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <ArrowRight className="h-6 w-6 text-gray-400" />
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <GitBranch className="h-6 w-6 text-white" />
              </div>
              <ArrowRight className="h-6 w-6 text-gray-400" />
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm">Trigger → Process → Action</p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-[#F97315]">10K+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#F97315]">1M+</div>
              <div className="text-sm text-gray-400">Tasks Automated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#F97315]">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Workflow className="h-8 w-8 text-[#F97315]" />
              <span className="text-2xl font-bold text-white">MacroBridge</span>
            </div>
          </div>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-white">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center text-gray-400">
                Sign in to your automation dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#F97315] focus:ring-[#F97315]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#F97315] focus:ring-[#F97315] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-gray-700 bg-gray-800 text-[#F97315] focus:ring-[#F97315]"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-400">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#F97315] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button className="w-full bg-[#F97315] hover:bg-[#EA580C] text-white cursor-pointer">
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-center">
                <span className="text-gray-400">Don't have an account? </span>
                <Link href="/signup" className="text-[#F97315] hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
