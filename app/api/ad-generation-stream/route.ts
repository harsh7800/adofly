import { adGenerationGraph } from "@/services/langgraph/ad-generation-graph";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const stream = new ReadableStream({
    async start(controller) {
      await adGenerationGraph.invoke(body, {
        emit: (update) => {
          controller.enqueue(`data: ${JSON.stringify(update)}\n\n`);
        },
      });
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
