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
  Check,
  ArrowRight,
  Star,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Cookies from 'js-cookie';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmailError("");
    setPasswordError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    let valid = true;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters, include a letter and a number.");
      valid = false;
    }
    if (!name) {
      setError("Name is required.");
      valid = false;
    }
    if (!valid) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${SERVER_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || data.message || "Signup failed");
      } else {
        Cookies.set('token', data.token, { expires: 7 });
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#F97315]/20 via-black to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute top-32 left-16 w-40 h-40 bg-[#F97315]/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-[#F97315]/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-[#F97315]/15 rounded-full blur-lg animate-pulse delay-500" />

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Workflow className="h-12 w-12 text-[#F97315]" />
              <span className="text-3xl font-bold">MacroBridge</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Join thousands of teams
              <br />
              <span className="text-[#F97315]">automating success</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Start your automation journey today and save hours every week with
              intelligent workflows.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#F97315]/20 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-[#F97315]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  Lightning Fast Setup
                </h3>
                <p className="text-sm text-gray-400">
                  Get started in under 5 minutes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#F97315]/20 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#F97315]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  Enterprise Security
                </h3>
                <p className="text-sm text-gray-400">
                  Bank-level encryption & compliance
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#F97315]/20 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-[#F97315]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Loved by Teams</h3>
                <p className="text-sm text-gray-400">
                  4.9/5 rating from 10,000+ users
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
            <div className="flex items-center space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#F97315] text-[#F97315]"
                />
              ))}
            </div>
            <p className="text-gray-300 mb-4">
              "MacroBridge transformed our workflow. We save 20+ hours per week
              on repetitive tasks."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#F97315] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">SC</span>
              </div>
              <div>
                <p className="font-medium text-white">Sarah Chen</p>
                <p className="text-sm text-gray-400">
                  Head of Operations, Garg Tech Solutions
                </p>
              </div>
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
                Create your account
              </CardTitle>
              <CardDescription className="text-center text-gray-400">
                Start automating your workflows today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#F97315] focus:ring-[#F97315]"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#F97315] focus:ring-[#F97315]"
                />
                {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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
                {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#F97315] focus:ring-[#F97315] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
              <span className="text-gray-400 text-sm">Your password must contain one uppercase, one lowercase, one number & one special character.</span>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="rounded border-gray-700 bg-gray-800 text-[#F97315] focus:ring-[#F97315]"
                />
                <Label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-[#F97315] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#F97315] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button className="w-full bg-[#F97315] hover:bg-[#EA580C] text-white cursor-pointer" onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating Account..." : <>Create Account<ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>

              {error && <div className="text-red-500 text-center text-sm mt-2">{error}</div>}

              <div className="text-center">
                <span className="text-gray-400">Already have an account? </span>
                <Link href="/login" className="text-[#F97315] hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
