import { streamText } from "ai"
import { xai } from "@ai-sdk/xai"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { transcript, customPrompt } = await request.json()

    if (!transcript) {
      return new Response("Transcript is required", { status: 400 })
    }

    // Default prompt for meeting summarization
    const defaultPrompt = `Please analyze this meeting transcript and provide a comprehensive summary with the following sections:

1. **Key Discussion Points** - Main topics covered
2. **Decisions Made** - Any concrete decisions or agreements
3. **Action Items** - Tasks assigned with responsible parties
4. **Next Steps** - Follow-up actions or future meetings planned

Meeting Transcript:
${transcript}`

    const finalPrompt = customPrompt ? `${customPrompt}\n\nMeeting Transcript:\n${transcript}` : defaultPrompt

    const result = streamText({
      model: xai("grok-4", {
        apiKey: process.env.XAI_API_KEY,
      }),
      prompt: finalPrompt,
      system:
        "You are an expert meeting analyst. Provide clear, structured summaries that help teams stay organized and follow through on commitments. Format your response in markdown for better readability.",
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Error generating summary:", error)
    return new Response("Failed to generate summary", { status: 500 })
  }
}
