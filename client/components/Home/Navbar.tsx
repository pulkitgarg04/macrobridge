import React from "react";
import Link from "next/link";
import { Workflow, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-2">
          <Workflow className="h-8 w-8 text-[#F97315]" />
          <span className="text-xl font-bold text-white">MacroBridge</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-300 hover:text-[#F97315] transition-colors"
          >
            Features
          </Link>
          <Link
            href="#integrations"
            className="text-sm font-medium text-gray-300 hover:text-[#F97315] transition-colors"
          >
            Integrations
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-gray-300 hover:text-[#F97315] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#docs"
            className="text-sm font-medium text-gray-300 hover:text-[#F97315] transition-colors"
          >
            Docs
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button
              variant="ghost"
              className="hidden md:inline-flex text-gray-300 hover:text-[#F97315] hover:bg-gray-800 cursor-pointer"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/signup">
            <Button className="bg-[#F97315] hover:bg-[#EA580C] text-white cursor-pointer">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
