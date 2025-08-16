"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Send, X } from "lucide-react"

interface EmailShareModalProps {
  isOpen: boolean
  onClose: () => void
  summary: string
}

export function EmailShareModal({ isOpen, onClose, summary }: EmailShareModalProps) {
  const [recipients, setRecipients] = useState("")
  const [subject, setSubject] = useState("Meeting Summary")
  const [message, setMessage] = useState("Hi,\n\nPlease find the meeting summary below:\n\n")
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSend = async () => {
    if (!recipients.trim()) return

    setIsSending(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: recipients.split(",").map((email) => email.trim()),
          subject,
          message,
          summary,
        }),
      })

      if (response.ok) {
        setSent(true)
        setTimeout(() => {
          setSent(false)
          onClose()
          // Reset form
          setRecipients(recipients)
          setSubject("Meeting Summary")
          setMessage("Hi,\n\nPlease find the meeting summary below:\n\n")
        }, 2000)
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      // In a real app, you'd show an error message
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Share Meeting Summary
          </DialogTitle>
          <DialogDescription>Send this meeting summary to your team members via email</DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Email Sent Successfully!</h3>
            <p className="text-slate-600">Your meeting summary has been shared with the recipients.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <Input
                id="recipients"
                placeholder="Enter email addresses separated by commas"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
              <p className="text-xs text-slate-500">Separate multiple email addresses with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-slate-500">
                The meeting summary will be automatically included below your message
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                disabled={!recipients.trim() || isSending}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4 mr-1" />
                {isSending ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
