import React from 'react'
import { Workflow, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900">
    <div className="container px-4 md:px-6 py-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-5 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Workflow className="h-6 w-6 text-[#F97315]" />
            <span className="text-lg font-bold text-white">MacroBridge</span>
          </div>
          <p className="text-gray-400 text-sm">Automate your workflows and connect your favorite apps with ease.</p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Integrations
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                API
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Status
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Community
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F97315]">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} MacroBridge. All rights reserved.</p>
        <div className="flex space-x-6 justify-center mb-6">
          <Link
            href="https://github.com/pulkitgarg04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-[#F97315] transition-colors text-sm"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/pulkitgarg04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-[#F97315] transition-colors text-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </Link>
          <Link
            href="https://x.com/pulkitgarg04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-[#F97315] transition-colors text-sm"
            aria-label="X"
          >
            <Twitter className="h-4 w-4" />
            <span>X</span>
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}
