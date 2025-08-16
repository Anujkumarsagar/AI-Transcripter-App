import { htmlContent } from "@/lib/data"
import { transporter } from "@/lib/nodemailer"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { recipients, subject, message, summary } = await request.json()

        console.log("Received email request:", { recipients, subject, message, summary })

        if (!recipients || recipients.length === 0) {
            return new Response("Recipients are required", { status: 400 })
        }


        const html = htmlContent
            .replaceAll('{{subject}}', subject || 'No Subject')
            .replaceAll('{{message}}', message || 'No message provided')
            .replaceAll('{{summary}}', summary || 'No summary available')
            .replaceAll('{{sentBy}}', 'Team MyApp')


        const response = await transporter.sendMail({
            from: "",
            to: recipients.join(", "),
            subject: subject || "No Subject",
            text: message || "No message provided",
            html: html,
        })

        if (!response.accepted || response.accepted.length === 0) {
            return new Response("Failed to send email", { status: 500 })
        }

        console.log("Email sent successfully to:", recipients)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        return new Response(
            JSON.stringify({
                success: true,
                message: "Email sent successfully",

            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            },
        )
    } catch (error) {
        console.error("Error sending email:", error)
        return new Response("Failed to send email", { status: 500 })
    }
}
