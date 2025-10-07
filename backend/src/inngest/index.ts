import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ai-therapy-agent",
    eventKey: "pdR4A1rNuMFTYIlwgvXiBo-Hf0uClDZxkMecq4r8R8MQG9YhesC_lOxYqTRgyVst1NdnDJKLcsA9S176iDZ7sA"
 });

// Create an empty array where we'll export future Inngest functions
export const functions = [];