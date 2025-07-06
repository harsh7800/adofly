"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Fetches the current authenticated session on the server.
 * Throws an error if no valid session is found.
 */
export async function getServerSessionOrThrow() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized: No valid session found");
  }

  return session;
}
