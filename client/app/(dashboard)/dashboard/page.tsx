"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Workflow,
  Plus,
  Search,
  MoreHorizontal,
  Settings,
  Activity,
  Clock,
  Zap,
  TrendingUp,
  ArrowRight,
  Copy,
  Edit,
  Trash2,
  BarChart3,
  Filter,
  Mail,
  MessageSquare,
  Users,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const mockZaps = [
  {
    id: "1",
    name: "Gmail to Slack Notification",
    trigger: { name: "Gmail", icon: Mail, description: "New Email" },
    actions: [{ name: "Slack", icon: MessageSquare, description: "Send Message" }],
    status: "active",
    runs: 142,
    lastRun: "2 hours ago",
    success: true,
    folder: "Work Automations",
  },
  {
    id: "2",
    name: "Form Submission to CRM",
    trigger: { name: "Webhook", icon: Zap, description: "Form Submit" },
    actions: [
      { name: "HubSpot", icon: Users, description: "Create Contact" },
      { name: "Slack", icon: MessageSquare, description: "Send Message" },
    ],
    status: "active",
    runs: 89,
    lastRun: "5 minutes ago",
    success: true,
    folder: "Lead Generation",
  },
  {
    id: "3",
    name: "Calendar Event Reminders",
    trigger: { name: "Google Calendar", icon: Calendar, description: "New Event" },
    actions: [{ name: "Slack", icon: MessageSquare, description: "Send Message" }],
    status: "paused",
    runs: 23,
    lastRun: "1 day ago",
    success: false,
    folder: "Productivity",
  },
  {
    id: "4",
    name: "Customer Support Tickets",
    trigger: { name: "Email", icon: Mail, description: "New Email" },
    actions: [
      { name: "Slack", icon: MessageSquare, description: "Send Message" },
      { name: "Airtable", icon: BarChart3, description: "Create Record" },
    ],
    status: "active",
    runs: 67,
    lastRun: "1 hour ago",
    success: true,
    folder: "Customer Support",
  },
]

const folders = ["All Zaps", "Work Automations", "Lead Generation", "Productivity", "Customer Support"]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("All Zaps")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const filteredZaps = mockZaps.filter((zap) => {
    const matchesSearch = zap.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = selectedFolder === "All Zaps" || zap.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  const toggleZapStatus = (zapId: string) => {
    console.log("Toggle zap:", zapId)
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Workflow className="h-8 w-8 text-[#F97315]" />
                <span className="text-xl font-bold text-white">MacroBridge</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="text-[#F97315] font-medium">
                  Dashboard
                </Link>
                <Link href="/templates" className="text-gray-400 hover:text-white">
                  Templates
                </Link>
                <Link href="/integrations" className="text-gray-400 hover:text-white">
                  Integrations
                </Link>
                <Link href="/pricing" className="text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 bg-[#F97315] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Zaps</h1>
            <p className="text-gray-400">Automate your workflows and save time</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/templates">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                Browse Templates
              </Button>
            </Link>
            <Link href="/create-workflow">
              <Button className="bg-[#F97315] hover:bg-[#EA580C] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Zap
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-700 bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Zaps</p>
                  <p className="text-2xl font-bold text-white">{mockZaps.length}</p>
                </div>
                <Workflow className="h-8 w-8 text-[#F97315]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Zaps</p>
                  <p className="text-2xl font-bold text-white">
                    {mockZaps.filter((z) => z.status === "active").length}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Runs</p>
                  <p className="text-2xl font-bold text-white">
                    {mockZaps.reduce((acc, zap) => acc + zap.runs, 0).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">98.5%</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 space-y-6">
            <Card className="border-gray-700 bg-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-sm font-medium">Folders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {folders.map((folder) => (
                  <button
                    key={folder}
                    onClick={() => setSelectedFolder(folder)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedFolder === folder
                        ? "bg-[#F97315] text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {folder}
                    {folder !== "All Zaps" && (
                      <span className="ml-auto text-xs">{mockZaps.filter((z) => z.folder === folder).length}</span>
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-sm font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Gmail to Slack completed</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Form to CRM completed</p>
                    <p className="text-xs text-gray-400">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Calendar reminder failed</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search zaps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#F97315]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredZaps.map((zap) => (
                <Card key={zap.id} className="border-gray-700 bg-gray-800 hover:bg-gray-750 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-white">{zap.name}</h3>
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs px-2 py-1">
                              {zap.folder}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-400">{zap.status === "active" ? "On" : "Off"}</span>
                              <Switch
                                checked={zap.status === "active"}
                                onCheckedChange={() => toggleZapStatus(zap.id)}
                                className="data-[state=checked]:bg-[#F97315]"
                              />
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  View History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3 min-w-0">
                            <div className="w-8 h-8 bg-[#F97315] rounded-lg flex items-center justify-center flex-shrink-0">
                              <zap.trigger.icon className="h-4 w-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white truncate">{zap.trigger.name}</p>
                              <p className="text-xs text-gray-400 truncate">{zap.trigger.description}</p>
                            </div>
                          </div>

                          <ArrowRight className="h-5 w-5 text-gray-500 flex-shrink-0" />

                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            {zap.actions.map((action, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3 min-w-0">
                                  <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <action.icon className="h-4 w-4 text-white" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{action.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{action.description}</p>
                                  </div>
                                </div>
                                {index < zap.actions.length - 1 && (
                                  <ArrowRight className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Activity className="h-4 w-4" />
                            <span>{zap.runs} runs</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>Last run: {zap.lastRun}</span>
                          </div>
                          <div
                            className={`flex items-center space-x-1 ${zap.success ? "text-green-400" : "text-red-400"}`}
                          >
                            <div className={`w-2 h-2 rounded-full ${zap.success ? "bg-green-400" : "bg-red-400"}`} />
                            <span>{zap.success ? "Success" : "Failed"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredZaps.length === 0 && (
              <div className="text-center py-12">
                <Workflow className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No zaps found</h3>
                <p className="text-gray-400 mb-4">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : selectedFolder !== "All Zaps"
                      ? `No zaps in ${selectedFolder} folder`
                      : "Create your first zap to get started"}
                </p>
                {!searchQuery && selectedFolder === "All Zaps" && (
                  <Link href="/create-workflow">
                    <Button className="bg-[#F97315] hover:bg-[#EA580C] text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Zap
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}