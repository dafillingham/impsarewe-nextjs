import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { commentUsers, verificationCodes } from "@/drizzle/schema";
import { eq, and, gt } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 }
      );
    }

    // Find verification code
    const verification = await db
      .select()
      .from(verificationCodes)
      .where(
        and(
          eq(verificationCodes.email, email),
          eq(verificationCodes.code, code),
          gt(verificationCodes.expiresAt, new Date())
        )
      );

    if (!verification || verification.length === 0) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    // Mark comment user as verified
    await db
      .update(commentUsers)
      .set({ isVerified: 1, updatedAt: new Date() })
      .where(eq(commentUsers.email, email));

    // Delete verification code
    await db
      .delete(verificationCodes)
      .where(eq(verificationCodes.email, email));

    return NextResponse.json(
      { success: true, message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}
