import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export async function GET(
  req: NextRequest,
  context: { params: any } 
) {
  try {
    const { sessionId } = context.params as { sessionId: string };
    console.log(`Getting chat history for session ${sessionId}`);

    const response = await fetch(
      `${BACKEND_API_URL}/chat/sessions/${sessionId}/history`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to get chat history:", error);
      return NextResponse.json(
        { error: error.error || "Failed to get chat history" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Chat history retrieved successfully:", data);

    // Format the response to match the frontend's expected format
    const formattedMessages = (data as unknown[]).map((msg) => {
        if (
          typeof msg === "object" &&
          msg !== null &&
          "role" in msg &&
          "content" in msg &&
          "timestamp" in msg
        ) {
          const { role, content, timestamp } = msg as {
            role: string;
            content: string;
            timestamp: string | number | Date;
          };
          return { role, content, timestamp };
        }
        throw new Error("Invalid message format");
      });

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error getting chat history:", error);
    return NextResponse.json(
      { error: "Failed to get chat history" },
      { status: 500 }
    );
  }
}