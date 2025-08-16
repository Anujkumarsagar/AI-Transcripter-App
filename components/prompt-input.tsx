"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, RotateCcw } from "lucide-react"

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
}

const PRESET_PROMPTS = [
  "Summarize the key points, action items, and decisions from this meeting in bullet points.",
  "Create an executive summary with main topics, decisions made, and next steps.",
  "Focus on action items with assigned owners and deadlines from this meeting.",
  "Provide a detailed analysis of problems discussed and proposed solutions.",
]

export function PromptInput({ value, onChange }: PromptInputProps) {
  const [showPresets, setShowPresets] = useState(false)

  const handlePresetSelect = (preset: string) => {
    onChange(preset)
    setShowPresets(false)
  }

  const handleReset = () => {
    onChange(PRESET_PROMPTS[0])
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Enter custom instructions for how you want the summary formatted..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {value.length} characters
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPresets(!showPresets)}
              className="text-xs text-slate-600 hover:text-blue-600"
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Presets
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-slate-600 hover:text-blue-600"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Preset Prompts */}
      {showPresets && (
        <div className="space-y-2 p-4 bg-slate-50 rounded-lg border">
          <h4 className="text-sm font-medium text-slate-900">Preset Instructions:</h4>
          <div className="space-y-2">
            {PRESET_PROMPTS.map((preset, index) => (
              <button
                key={index}
                onClick={() => handlePresetSelect(preset)}
                className="w-full text-left p-2 text-sm text-slate-700 hover:bg-white hover:shadow-sm rounded border border-transparent hover:border-slate-200 transition-all"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
