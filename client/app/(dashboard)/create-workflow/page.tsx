"use client";

import React from "react";

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
import { Badge } from "@/components/ui/badge";
import {
  Workflow,
  ArrowRight,
  Plus,
  Mail,
  MessageSquare,
  Calendar,
  Database,
  Webhook,
  FileText,
  Users,
  ShoppingCart,
  X,
  Settings,
  Play,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";

const availableTriggers = [
  {
    id: "gmail",
    name: "Gmail",
    description: "New Email",
    icon: Mail,
    service: "Gmail",
    color: "bg-red-500",
  },
  {
    id: "webhook",
    name: "Webhook",
    description: "Receive HTTP Request",
    icon: Webhook,
    service: "Webhook",
    color: "bg-blue-500",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "New Event",
    icon: Calendar,
    service: "Google Calendar",
    color: "bg-green-500",
  },
  {
    id: "form",
    name: "Form Submit",
    description: "New Form Submission",
    icon: FileText,
    service: "Forms",
    color: "bg-purple-500",
  },
];

const availableActions = [
  {
    id: "slack",
    name: "Slack",
    description: "Send Message",
    icon: MessageSquare,
    service: "Slack",
    color: "bg-purple-600",
  },
  {
    id: "discord",
    name: "Discord",
    description: "Send Message",
    icon: MessageSquare,
    service: "Discord",
    color: "bg-indigo-600",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Create Contact",
    icon: Users,
    service: "HubSpot",
    color: "bg-orange-600",
  },
  {
    id: "airtable",
    name: "Airtable",
    description: "Create Record",
    icon: Database,
    service: "Airtable",
    color: "bg-yellow-600",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Create Product",
    icon: ShoppingCart,
    service: "Shopify",
    color: "bg-green-600",
  },
  {
    id: "email",
    name: "Email",
    description: "Send Email",
    icon: Mail,
    service: "Email",
    color: "bg-blue-600",
  },
];

interface WorkflowStep {
  id: string;
  type: "trigger" | "action";
  app: any;
  position: { x: number; y: number };
}

export default function CreateWorkflowPage() {
  const [workflowName, setWorkflowName] = useState("Untitled Zap");
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [showAppSelector, setShowAppSelector] = useState<{
    type: "trigger" | "action";
    stepId?: string;
  } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (
    e: React.DragEvent,
    item: any,
    type: "trigger" | "action"
  ) => {
    setDraggedItem({ ...item, type });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!draggedItem || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newStep: WorkflowStep = {
        id: `${draggedItem.type}-${Date.now()}`,
        type: draggedItem.type,
        app: draggedItem,
        position: { x: Math.max(0, x - 100), y: Math.max(0, y - 50) },
      };

      setWorkflowSteps((prev) => [...prev, newStep]);
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const removeStep = (stepId: string) => {
    setWorkflowSteps((prev) => prev.filter((step) => step.id !== stepId));
  };

  const addStepAfter = (type: "trigger" | "action") => {
    setShowAppSelector({ type });
  };

  const selectApp = (app: any, type: "trigger" | "action") => {
    const newStep: WorkflowStep = {
      id: `${type}-${Date.now()}`,
      type,
      app,
      position: { x: 100 + workflowSteps.length * 200, y: 100 },
    };
    setWorkflowSteps((prev) => [...prev, newStep]);
    setShowAppSelector(null);
  };

  const triggerSteps = workflowSteps.filter((step) => step.type === "trigger");
  const actionSteps = workflowSteps.filter((step) => step.type === "action");

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Workflow className="h-8 w-8 text-[#F97315]" />
                <span className="text-xl font-bold text-white">
                  MacroBridge
                </span>
              </Link>
              <span className="text-gray-400">/</span>
              <Input
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="bg-transparent border-none text-white text-lg font-medium focus:bg-gray-800 focus:border-gray-700 w-64"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-[#F97315] hover:bg-[#EA580C] text-white">
                <Play className="h-4 w-4 mr-2" />
                Test Zap
              </Button>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        <div className="w-80 border-r border-gray-800 bg-gray-900 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6">
              Build Your Zap
            </h2>

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wide">
                Triggers
              </h3>
              <div className="space-y-3">
                {availableTriggers.map((trigger) => (
                  <div
                    key={trigger.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, trigger, "trigger")}
                    className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-grab hover:bg-gray-750 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 ${trigger.color} rounded-lg flex items-center justify-center`}
                    >
                      <trigger.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {trigger.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {trigger.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wide">
                Actions
              </h3>
              <div className="space-y-3">
                {availableActions.map((action) => (
                  <div
                    key={action.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, action, "action")}
                    className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-grab hover:bg-gray-750 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}
                    >
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {action.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {action.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div
            ref={canvasRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-full h-full bg-black relative overflow-auto"
            style={{
              backgroundImage: `radial-gradient(circle, #374151 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          >
            <div className="p-8">
              {workflowSteps.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Workflow className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Start Building Your Zap
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Drag and drop triggers and actions from the sidebar to
                    create your automation workflow.
                  </p>
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => addStepAfter("trigger")}
                      className="bg-[#F97315] hover:bg-[#EA580C] text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Trigger
                    </Button>
                    <Button
                      onClick={() => addStepAfter("action")}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Action
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center space-x-6 overflow-x-auto pb-4">
                    {triggerSteps.length > 0 ? (
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <Card className="w-64 border-gray-700 bg-gray-800">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <Badge className="bg-[#F97315]/20 text-[#F97315] border-[#F97315]/30">
                                  Trigger
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeStep(triggerSteps[0].id)}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-12 h-12 ${triggerSteps[0]?.app?.color} rounded-lg flex items-center justify-center`}
                                >
                                  {triggerSteps[0]?.app?.icon && (
                                    React.createElement(triggerSteps[0].app.icon, { className: "h-6 w-6 text-white" })
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-white">
                                    {triggerSteps[0].app.name}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    {triggerSteps[0].app.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-shrink-0">
                        <Button
                          onClick={() => addStepAfter("trigger")}
                          variant="outline"
                          className="w-64 h-24 border-2 border-dashed border-gray-600 text-gray-400 hover:border-[#F97315] hover:text-[#F97315]"
                        >
                          <Plus className="h-6 w-6 mr-2" />
                          Add Trigger
                        </Button>
                      </div>
                    )}

                    {triggerSteps.length > 0 && actionSteps.length > 0 && (
                      <ArrowRight className="h-6 w-6 text-gray-500 flex-shrink-0" />
                    )}

                    {actionSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className="flex items-center space-x-6"
                      >
                        <div className="flex-shrink-0">
                          <Card className="w-64 border-gray-700 bg-gray-800">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <Badge
                                  variant="secondary"
                                  className="bg-gray-700 text-gray-300"
                                >
                                  Action {index + 1}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeStep(step.id)}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-12 h-12 ${step.app.color} rounded-lg flex items-center justify-center`}
                                >
                                  {step.app.icon && (
                                    <step.app.icon className="h-6 w-6 text-white" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-white">
                                    {step.app.name}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    {step.app.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        {index < actionSteps.length - 1 && (
                          <ArrowRight className="h-6 w-6 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    ))}

                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => addStepAfter("action")}
                        variant="outline"
                        className="w-64 h-24 border-2 border-dashed border-gray-600 text-gray-400 hover:border-[#F97315] hover:text-[#F97315]"
                      >
                        <Plus className="h-6 w-6 mr-2" />
                        Add Action
                      </Button>
                    </div>
                  </div>

                  <Card className="border-gray-700 bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Workflow Summary
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Review your automation workflow
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white">Workflow Name</Label>
                          <Input
                            value={workflowName}
                            onChange={(e) => setWorkflowName(e.target.value)}
                            className="mt-1 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Steps</Label>
                          <div className="mt-2 space-y-2">
                            {triggerSteps.map((step) => (
                              <div
                                key={step.id}
                                className="flex items-center space-x-3 p-2 bg-gray-700 rounded"
                              >
                                <div
                                  className={`w-6 h-6 ${step.app.color} rounded flex items-center justify-center`}
                                >
                                  {step.app.icon && (
                                    <step.app.icon className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <span className="text-sm text-white">
                                  Trigger: {step.app.name}
                                </span>
                              </div>
                            ))}
                            {actionSteps.map((step, index) => (
                              <div
                                key={step.id}
                                className="flex items-center space-x-3 p-2 bg-gray-700 rounded"
                              >
                                <div
                                  className={`w-6 h-6 ${step.app.color} rounded flex items-center justify-center`}
                                >
                                  {step.app.icon && (
                                    <step.app.icon className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <span className="text-sm text-white">
                                  Action {index + 1}: {step.app.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAppSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 border-gray-700 bg-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                Choose{" "}
                {showAppSelector.type === "trigger" ? "Trigger" : "Action"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Select an app to{" "}
                {showAppSelector.type === "trigger"
                  ? "trigger"
                  : "perform an action in"}{" "}
                your workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {(showAppSelector.type === "trigger"
                ? availableTriggers
                : availableActions
              ).map((app) => (
                <button
                  key={app.id}
                  onClick={() => selectApp(app, showAppSelector.type)}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div
                    className={`w-10 h-10 ${app.color} rounded-lg flex items-center justify-center`}
                  >
                    {app.icon && <app.icon className="h-5 w-5 text-white" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-white">{app.name}</p>
                    <p className="text-sm text-gray-400">{app.description}</p>
                  </div>
                </button>
              ))}
            </CardContent>
            <div className="p-6 pt-0">
              <Button
                variant="ghost"
                onClick={() => setShowAppSelector(null)}
                className="w-full text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
