"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Workflow,
  Plus,
  ArrowRight,
  Copy,
} from "lucide-react"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"

const HOOKS_URL = process.env.NEXT_PUBLIC_HOOKS_URL || "http://localhost:3002"

export default function DashboardPage({ userId }: { userId: string }) {
  const [zaps, setZaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/zap", { withCredentials: true })
      .then((res) => {
        setZaps(res.data.zaps || [])
        setLoading(false)
      })
      .catch((err) => {
        setZaps([])
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">My Zaps</h1>
          <Link href="/create-workflow">
            <Button className="bg-[#F97315] hover:bg-[#EA580C] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Zap
            </Button>
          </Link>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : zaps.length === 0 ? (
            <div className="text-center py-12">
              <Workflow className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No zaps found</h3>
              <p className="text-gray-400 mb-4">
                Create your first zap to get started
              </p>
              <Link href="/create-workflow">
                <Button className="bg-[#F97315] hover:bg-[#EA580C] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Zap
                </Button>
              </Link>
            </div>
          ) : (
            zaps.map((zap) => (
              <Card key={zap.id} className="border-gray-700 bg-gray-800 hover:bg-gray-750 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-white">{zap.name || "Untitled Zap"}</h3>
                          <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs px-2 py-1">
                            {zap.trigger?.type?.name}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-400">On</span>
                            <Switch checked={true} className="data-[state=checked]:bg-[#F97315]" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3 min-w-0">
                          <div className="w-8 h-8 bg-[#F97315] rounded-lg flex items-center justify-center flex-shrink-0">
                            {zap.trigger?.type?.image ? (
                              <img src={zap.trigger.type.image} className="h-4 w-4" alt={zap.trigger.type.name} />
                            ) : (
                              <Workflow className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{zap.trigger?.type?.name}</p>
                          </div>
                        </div>

                        <ArrowRight className="h-5 w-5 text-gray-500 flex-shrink-0" />

                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          {zap.actions.map((action: any, index: number) => (
                            <div key={action.id} className="flex items-center space-x-2">
                              <div className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3 min-w-0">
                                <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                  {action.type?.image ? (
                                    <img src={action.type.image} className="h-4 w-4" alt={action.type.name} />
                                  ) : (
                                    <Workflow className="h-4 w-4 text-white" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-white truncate">{action.type?.name}</p>
                                </div>
                              </div>
                              {index < zap.actions.length - 1 && (
                                <ArrowRight className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {zap.trigger?.type?.name === "Webhook" && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-400">Webhook URL:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="text-sm text-white bg-gray-900 rounded px-2 py-1 break-all">
                              {`${HOOKS_URL}/hooks/catch/${zap.userId}/${zap.id}`}
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                navigator.clipboard.writeText(`${HOOKS_URL}/hooks/catch/${zap.userId}/${zap.id}`)
                                toast.success("Webhook URL copied!")
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}