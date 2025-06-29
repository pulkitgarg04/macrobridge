import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap } from "lucide-react"
import Navbar from "@/components/Home/Navbar"
import Footer from "@/components/Home/Footer"
import Integration from "@/components/Home/Integration"
import { WobbleCardComponent } from "@/components/Home/WobbleCard"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />      

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

        <WobbleCardComponent />

        <Integration />

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

      <Footer />
    </div>
  )
}