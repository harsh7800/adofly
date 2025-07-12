/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdGenerationStep } from "@/interfaces/ad-annotations";
import { adGenerationReducer } from "@/reducers/ad-generation";
import { useEffect, useReducer, useState } from "react";

const initialSteps: AdGenerationStep[] = [
  { id: "ad-copy", title: "Generating Ad Copy", status: "pending" },
  {
    id: "target-audience",
    title: "Generating Target Audience",
    status: "pending",
  },
  { id: "budget", title: "Generating Budget Suggestions", status: "pending" },
  { id: "finalizing", title: "Finalizing Ad Creative", status: "pending" },
];

export function useAdGeneration(payload: any) {
  const [steps, dispatch] = useReducer(adGenerationReducer, initialSteps);
  const [finalData, setFinalData] = useState<any>(null);

  useEffect(() => {
    dispatch({ type: "RESET", initial: initialSteps });

    const eventSource = new EventSource("/api/generate-ad-stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.step) {
        // Map step titles to IDs as per your backend emit design
        if (data.step.includes("Ad Copy"))
          dispatch({ type: "START_STEP", id: "ad-copy" });
        if (data.step.includes("Target Audience"))
          dispatch({ type: "START_STEP", id: "target-audience" });
        if (data.step.includes("Budget"))
          dispatch({ type: "START_STEP", id: "budget" });
        if (data.step.includes("Finalizing"))
          dispatch({ type: "START_STEP", id: "finalizing" });
      } else {
        setFinalData(data);
        eventSource.close();
      }
    };

    eventSource.onerror = (err) => {
      console.error(err);
      eventSource.close();
    };

    fetch("/api/generate-ad-stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return () => eventSource.close();
  }, [payload]);

  return { steps, finalData };
}
