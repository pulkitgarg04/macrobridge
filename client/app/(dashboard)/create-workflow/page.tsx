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
  X,
  Save,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

interface WorkflowStep {
  id: string;
  type: "trigger" | "action";
  app: any;
  position: { x: number; y: number };
  metadata?: Record<string, string>;
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
  const [availableTriggers, setAvailableTriggers] = useState<any[]>([]);
  const [availableActions, setAvailableActions] = useState<any[]>([]);
  const [triggersLoading, setTriggersLoading] = useState(true);
  const [actionsLoading, setActionsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTriggers() {
      setTriggersLoading(true);
      try {
        const res = await fetch(`${SERVER_URL}/api/v1/trigger/available`);
        const data = await res.json();
        setAvailableTriggers(data.availableTriggers || []);
      } catch (err) {
        setAvailableTriggers([]);
      }
      setTriggersLoading(false);
    }
    async function fetchActions() {
      setActionsLoading(true);
      try {
        const res = await fetch(`${SERVER_URL}/api/v1/action/available`);
        const data = await res.json();
        setAvailableActions(data.availableActions || []);
      } catch (err) {
        setAvailableActions([]);
      }
      setActionsLoading(false);
    }
    fetchTriggers();
    fetchActions();
  }, []);

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
        metadata: {},
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

  const triggerSteps = workflowSteps.filter((step) => step.type === "trigger");
  const actionSteps = workflowSteps.filter((step) => step.type === "action");

  const handleSaveZap = async () => {
    setSaving(true);
    setError(null);
    try {
      const triggerStep = workflowSteps.find((step) => step.type === "trigger");
      const actionSteps = workflowSteps.filter((step) => step.type === "action");

      if (!triggerStep) {
        setError("Please add a trigger.");
        setSaving(false);
        return;
      }
      if (actionSteps.length === 0) {
        setError("Please add at least one action.");
        setSaving(false);
        return;
      }

      const payload = {
        name: workflowName,
        availableTriggerId: triggerStep.app.id,
        actions: actionSteps.map((step) => ({
          availableActionId: step.app.id,
          actionMetadata: step.metadata || {},
        })),
      };

      await axios.post(
        `${SERVER_URL}/api/v1/zap`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

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
                className="bg-[#F97315] hover:bg-[#EA580C] text-white"
                onClick={handleSaveZap}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Zap
                  </>
                )}
              </Button>
              {error && <div className="text-red-500 mt-2">{error}</div>}
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
                {triggersLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="animate-spin text-gray-400 h-6 w-6" />
                  </div>
                ) : (
                  availableTriggers.map((trigger) => (
                    <div
                      key={trigger.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, trigger, "trigger")}
                      className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-grab hover:bg-gray-750 transition-colors"
                    >
                      <img src={trigger.image} alt={trigger.name} className="w-10 h-10 rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {trigger.name}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wide">
                Actions
              </h3>
              <div className="space-y-3">
                {actionsLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="animate-spin text-gray-400 h-6 w-6" />
                  </div>
                ) : (
                  availableActions.map((action) => (
                    <div
                      key={action.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, action, "action")}
                      className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-grab hover:bg-gray-750 transition-colors"
                    >
                      <img src={action.image} alt={action.name} className="w-10 h-10 rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {action.name}
                        </p>
                      </div>
                    </div>
                  ))
                )}
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
                                <Badge className="bg-[#F97315]/20 text-white border-[#F97315]/30">
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
                                </div>
                              </div>
                              <form className="space-y-2 mt-4">
                                {step.app.name === "SendEmail" && (
                                  <>
                                    <div>
                                      <Label htmlFor={`email-${step.id}`} className="text-white text-xs">Email</Label>
                                      <Input
                                        id={`email-${step.id}`}
                                        type="email"
                                        placeholder="Recipient email"
                                        className="mt-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#F97315] focus:ring-[#F97315]"
                                        value={step.metadata?.email || ""}
                                        onChange={e => {
                                          const email = e.target.value;
                                          setWorkflowSteps(steps => steps.map(s => s.id === step.id ? { ...s, metadata: { ...s.metadata, email } } : s));
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`body-${step.id}`} className="text-white text-xs">Body</Label>
                                      <Input
                                        id={`body-${step.id}`}
                                        type="text"
                                        placeholder="Email body"
                                        className="mt-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#F97315] focus:ring-[#F97315]"
                                        value={step.metadata?.body || ""}
                                        onChange={e => {
                                          const body = e.target.value;
                                          setWorkflowSteps(steps => steps.map(s => s.id === step.id ? { ...s, metadata: { ...s.metadata, body } } : s));
                                        }}
                                      />
                                    </div>
                                  </>
                                )}
                                {step.app.name === "SendSol" && (
                                  <>
                                    <div>
                                      <Label htmlFor={`to-${step.id}`} className="text-white text-xs">Recipient</Label>
                                      <Input
                                        id={`to-${step.id}`}
                                        type="text"
                                        placeholder="Recipient address"
                                        className="mt-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#F97315] focus:ring-[#F97315]"
                                        value={step.metadata?.to || ""}
                                        onChange={e => {
                                          const to = e.target.value;
                                          setWorkflowSteps(steps => steps.map(s => s.id === step.id ? { ...s, metadata: { ...s.metadata, to } } : s));
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`amount-${step.id}`} className="text-white text-xs">Amount</Label>
                                      <Input
                                        id={`amount-${step.id}`}
                                        type="number"
                                        placeholder="Amount"
                                        className="mt-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#F97315] focus:ring-[#F97315]"
                                        value={step.metadata?.amount || ""}
                                        onChange={e => {
                                          const amount = e.target.value;
                                          setWorkflowSteps(steps => steps.map(s => s.id === step.id ? { ...s, metadata: { ...s.metadata, amount } } : s));
                                        }}
                                      />
                                    </div>
                                  </>
                                )}
                              </form>
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
    </div>
  );
}
