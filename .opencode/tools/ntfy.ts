import { tool } from "@opencode-ai/plugin"

export default tool({
  description:
    "Send a push notification via ntfy.sh (or a self-hosted ntfy server). " +
    "Use this to alert the user when a long-running task is done or when something important happens. " +
    "Requires NTFY_TOPIC to be set in the environment (optionally NTFY_SERVER and NTFY_TOKEN).",
  args: {
    message: tool.schema
      .string()
      .describe("The notification message body to send."),
    title: tool.schema
      .string()
      .optional()
      .describe("Optional notification title. Defaults to 'OpenCode'."),
    priority: tool.schema
      .enum(["min", "low", "default", "high", "urgent"])
      .optional()
      .describe(
        "Notification priority: min, low, default, high, or urgent. Defaults to 'default'.",
      ),
    tags: tool.schema
      .string()
      .optional()
      .describe(
        "Comma-separated list of tags/emoji short codes, e.g. 'tada,heavy_check_mark'.",
      ),
    topic: tool.schema
      .string()
      .optional()
      .describe(
        "ntfy topic to publish to. Overrides the NTFY_TOPIC environment variable.",
      ),
  },
  async execute(args) {
    const server = process.env.NTFY_SERVER?.replace(/\/$/, "") ?? "https://ntfy.sh"
    const topic = args.topic ?? process.env.NTFY_TOPIC

    if (!topic) {
      return "Error: no ntfy topic provided. Set the NTFY_TOPIC environment variable or pass the 'topic' argument."
    }

    const url = `${server}/${encodeURIComponent(topic)}`

    const headers: Record<string, string> = {
      "Content-Type": "text/plain",
      Title: args.title ?? "OpenCode",
      Priority: args.priority ?? "default",
    }

    if (args.tags) {
      headers["Tags"] = args.tags
    }

    const token = process.env.NTFY_TOKEN
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: args.message,
    })

    if (!response.ok) {
      const body = await response.text()
      return `Error: ntfy returned ${response.status} ${response.statusText}: ${body}`
    }

    return `Notification sent to ${server}/${topic} (priority: ${headers["Priority"]}, title: "${headers["Title"]}")`
  },
})
