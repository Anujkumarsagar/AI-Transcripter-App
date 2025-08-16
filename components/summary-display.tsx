"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, FileText, Edit3, Save, X, Mail } from "lucide-react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { EmailShareModal } from "./email-share-modal"

interface SummaryDisplayProps {
  summary: string
  isGenerating: boolean
  onSummaryChange?: (newSummary: string) => void
}

export function SummaryDisplay({ summary, isGenerating, onSummaryChange }: SummaryDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedSummary, setEditedSummary] = useState("")
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "meeting-summary.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleEdit = () => {
    setEditedSummary(summary)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (onSummaryChange) {
      onSummaryChange(editedSummary)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedSummary("")
    setIsEditing(false)
  }

  return (
    <>
      <Card className="border-slate-200 shadow-sm h-fit">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-900 font-montserrat flex items-center gap-2">
                <FileText className="h-5 w-5" />
                AI Generated Summary
                {isEditing && <span className="text-sm font-normal text-slate-500">(Editing)</span>}
              </CardTitle>
              <CardDescription>Your meeting insights and action items</CardDescription>
            </div>
            {summary && !isGenerating && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="text-slate-600 bg-transparent"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={handleEdit} className="text-slate-600 bg-transparent">
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCopy} className="text-slate-600 bg-transparent">
                      <Copy className="h-4 w-4 mr-1" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="text-slate-600 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEmailModalOpen(true)}
                      className="text-slate-600 bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="space-y-3">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
              <p className="text-sm text-slate-500">AI is analyzing your meeting...</p>
            </div>
          ) : summary ? (
            isEditing ? (
              <div className="space-y-4">
                <Textarea
                  value={editedSummary}
                  onChange={(e) => setEditedSummary(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Edit your summary here..."
                />
                <p className="text-xs text-slate-500">Tip: You can use Markdown formatting for better structure</p>
              </div>
            ) : (
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            )
          ) : (
            <div className="text-center py-8 text-slate-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p>Your AI-generated summary will appear here</p>
              <p className="text-sm mt-2">Upload a transcript and click "Generate AI Summary" to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      <EmailShareModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} summary={summary} />
    </>
  )
}
