import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
};

type ApiMessage = {
  role: string;
  content: string;
  timestamp: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } } 
) {
  try {
    const { sessionId } = params;
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

    const data = (await response.json()) as ApiMessage[];
    console.log("Chat history retrieved successfully:", data);

    // Format the response to match the frontend's expected format
    const formattedMessages: ChatMessage[] = data.map((msg) => ({
      role: msg.role as ChatMessage["role"],
      content: msg.content,
      timestamp: msg.timestamp,
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error getting chat history:", error);
    return NextResponse.json(
      { error: "Failed to get chat history" },
      { status: 500 }
    );
  }
}