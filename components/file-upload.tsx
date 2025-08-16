"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Upload, type File, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileContent?: (content: string) => void
}

export function FileUpload({ onFileContent }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const processFile = async (file: File) => {
    setIsProcessing(true)
    try {
      const text = await file.text()
      if (onFileContent) {
        onFileContent(text)
      }
    } catch (error) {
      console.error("Error reading file:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
      // Process the first file automatically
      if (newFiles[0]) {
        processFile(newFiles[0])
      }
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
      // Process the first file automatically
      if (newFiles[0]) {
        processFile(newFiles[0])
      }
    }
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 md:p-8 text-center transition-all duration-200",
          dragActive
            ? "border-blue-400 bg-blue-50 scale-[1.02]"
            : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50",
          isProcessing && "opacity-50 pointer-events-none",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".txt,.doc,.docx,.pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />

        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className={cn("w-6 h-6 text-blue-600", isProcessing && "animate-pulse")} />
          </div>

          <div className="space-y-2">
            <p className="text-slate-900 font-medium">
              {isProcessing ? "Processing file..." : "Drag and drop your meeting transcript here"}
            </p>
            <p className="text-slate-600 text-sm">or click to browse files</p>
            <p className="text-slate-500 text-xs">Supports TXT, DOC, DOCX, PDF files (max 10MB)</p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-900">Uploaded Files:</h3>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {isProcessing && index === 0 ? (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-slate-500 hover:text-red-600 flex-shrink-0"
                disabled={isProcessing}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
