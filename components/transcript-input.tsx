"use client"

import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface TranscriptInputProps {
  value: string
  onChange: (value: string) => void
}

export function TranscriptInput({ value, onChange }: TranscriptInputProps) {
  const wordCount = value
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
  const charCount = value.length

  return (
    <div className="space-y-3">
      <Textarea
        placeholder="Type your notes or paste transcript here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-xs">
            {charCount} characters
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {wordCount} words
          </Badge>
        </div>
        {charCount > 0 && (
          <p className="text-xs text-slate-500">
            {charCount < 100 ? "Add more content for better summaries" : "Good length for analysis"}
          </p>
        )}
      </div>
    </div>
  )
}
