import { getServerSessionOrThrow } from "@/app/actions/session.action";
import { db } from "@/db";
import { accountInfo } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getServerSessionOrThrow();

    const userId = session?.user.id;
    const body = await req.json();

    // ✅ Insert into DB
    const inserted = await db.insert(accountInfo).values({
      userId: userId as string,
      primaryUseCases: body.primaryUseCases,
      primaryUseCaseOther: body.primaryUseCaseOther,
      role: body.role,
      roleOther: body.roleOther,
      industry: body.industry,
      teamSize: body.teamSize,
      country: body.country,
      primaryGoal: body.primaryGoal,
      hearAboutUs: body.hearAboutUs,
      hearAboutUsOther: body.hearAboutUsOther,
    });

    return NextResponse.json({
      success: true,
      message: "Account info saved successfully",
      data: inserted,
    });
  } catch (error) {
    console.error("Account info upload error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
