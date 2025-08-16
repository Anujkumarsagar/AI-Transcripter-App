"use client"

import { useState } from "react"



import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, AlertCircle } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { TranscriptInput } from "@/components/transcript-input"
import { PromptInput } from "@/components/prompt-input"
import { SummaryDisplay } from "@/components/summary-display"

export default function HomePage() {
  const [transcript, setTranscript] = useState("")
  const [customPrompt, setCustomPrompt] = useState(
    "Summarize the key points, action items, and decisions from this meeting in bullet points.",
  )
  const [summary, setSummary] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const handleGenerateSummary = async () => {
    if (!transcript.trim()) {
      setError("Please provide a transcript before generating a summary.")
      return
    }

    setIsGenerating(true)
    setSummary("")
    setError("")

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript, customPrompt }),
      })

      if (!res.ok) {
        throw new Error("Failed to generate summary")
      }

      // Handle streaming response
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          fullResponse += chunk
          setSummary(fullResponse)
        }
      }
    } catch (error) {
      setError("Failed to generate summary. Please try again.")
      console.error("Error generating summary:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSummaryChange = (newSummary: string) => {
    setSummary(newSummary)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-[family-name:var(--font-montserrat)]">
              AI Meeting Summarizer
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Transform your meeting transcripts into clear, actionable summaries
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="p-6 md:p-8 space-y-8 shadow-sm border-slate-200">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Upload Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-montserrat)]">
                  Upload Transcript
                </h2>
                <FileUpload onFileContent={setTranscript} />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-slate-500 text-sm font-medium px-3 py-1 bg-slate-100 rounded-full">OR</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              {/* Text Input Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-montserrat)]">
                  Paste Transcript
                </h2>
                <TranscriptInput value={transcript} onChange={setTranscript} />
              </div>

              {/* Prompt Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-montserrat)]">
                  Custom Instructions
                </h2>
                <PromptInput value={customPrompt} onChange={setCustomPrompt} />
              </div>

              <Button
                onClick={handleGenerateSummary}
                disabled={!transcript.trim() || isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {isGenerating ? "Generating Summary..." : "Generate AI Summary"}
              </Button>
            </Card>
          </div>

          {/* Summary Section */}
          <div className="xl:sticky xl:top-24 xl:h-fit">
            <SummaryDisplay summary={summary} isGenerating={isGenerating} onSummaryChange={handleSummaryChange} />
          </div>
        </div>
      </main>
    </div>
  )
}
