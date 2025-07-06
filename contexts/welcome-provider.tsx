import { getServerSessionOrThrow } from "@/app/actions/session.action";
import { db } from "@/db";
import OnboardingForm from "@/components/shared/onboard-form";

import { accountInfo } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const WelcomeProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSessionOrThrow();
  if (!session?.user.id) return redirect("/login");

  const accountSetup = await db
    .select()
    .from(accountInfo)
    .where(eq(accountInfo.userId, session.user.id));
  return (
    <main>
      {session && accountSetup.length === 0 && <OnboardingForm />}
      {children}
    </main>
  );
};

export default WelcomeProvider;
