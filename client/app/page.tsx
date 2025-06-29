import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Zap, Workflow } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <Workflow className="h-8 w-8 text-[#F97315]" />
            <span className="text-xl font-bold text-white">MacroBridge</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-[#F97315] transition-colors">
              Features
            </Link>
            <Link
              href="#integrations"
              className="text-sm font-medium text-gray-300 hover:text-[#F97315] transition-colors"
            >
              Integrations
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-300 hover:text-[#F97315] transition-colors">
              Pricing
            </Link>
            <Link href="#docs" className="text-sm font-medium text-gray-300 hover:text-[#F97315] transition-colors">
              Docs
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex text-gray-300 hover:text-[#F97315] hover:bg-gray-800">
              Sign In
            </Button>
            <Button className="bg-[#F97315] hover:bg-[#EA580C] text-white">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-gray-700 px-3 py-1 text-sm bg-gray-800 text-[#F97315]">
                <Zap className="mr-2 h-4 w-4" />
                Automate Everything
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Connect your apps and
                <span className="text-[#F97315]"> automate workflows</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                MacroBridge helps you automate repetitive tasks by connecting your favorite apps. Build powerful
                workflows without code and save hours every week.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#F97315]" 
                />
                <Button className="bg-[#F97315] hover:bg-[#EA580C] text-white px-8">Start Free Trial</Button>
              </div>

              <p className="text-sm text-gray-500">Free 14-day trial • No credit card required • Cancel anytime</p>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-800">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful automation made simple</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Everything you need to connect your apps and automate your workflows
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-gray-700 bg-gray-900 shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 bg-[#F97315]/20 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-[#F97315]" />
                  </div>
                  <CardTitle className="text-xl text-white">Visual Workflow Builder</CardTitle>
                  <CardDescription className="text-gray-400">
                    Create complex automations with our intuitive drag-and-drop interface
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gray-700 bg-gray-900 shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 bg-[#F97315]/20 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-[#F97315]" />
                  </div>
                  <CardTitle className="text-xl text-white">Real-time Triggers</CardTitle>
                  <CardDescription className="text-gray-400">
                    Instantly respond to events across all your connected applications
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gray-700 bg-gray-900 shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 bg-[#F97315]/20 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-[#F97315]" />
                  </div>
                  <CardTitle className="text-xl text-white">Enterprise Security</CardTitle>
                  <CardDescription className="text-gray-400">
                    Bank-level encryption and compliance with SOC 2 and GDPR standards
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gray-700 bg-gray-900 shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 bg-[#F97315]/20 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-[#F97315]" />
                  </div>
                  <CardTitle className="text-xl text-white">Team Collaboration</CardTitle>
                  <CardDescription className="text-gray-400">
                    Share workflows, manage permissions, and collaborate seamlessly
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to automate your workflows?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of teams who save time and increase productivity with MacroBridge
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button size="lg" className="bg-[#F97315] hover:bg-[#EA580C] text-white">
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 bg-gray-900">
        <div className="container px-4 md:px-6 py-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
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
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} MacroBridge. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-400 hover:text-[#F97315]">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-[#F97315]">
                Terms
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-[#F97315]">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}