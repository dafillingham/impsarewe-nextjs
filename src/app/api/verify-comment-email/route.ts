import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { commentUsers, verificationCodes } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username } = body;

    if (!email || !username) {
      return NextResponse.json(
        { error: "Email and username are required" },
        { status: 400 }
      );
    }

    // Check if comment user already exists
    const existingUser = await db
      .select()
      .from(commentUsers)
      .where(eq(commentUsers.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email already registered for comments" },
        { status: 400 }
      );
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create verification code record
    await db.insert(verificationCodes).values({
      email,
      code: verificationCode,
      expiresAt,
      createdAt: new Date(),
    });

    // Create comment user (unverified)
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
    await db.insert(commentUsers).values({
      email,
      username,
      avatarUrl,
      isVerified: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // TODO: Send verification email with code
    // For now, return the code (in production, send via email)

    return NextResponse.json(
      {
        success: true,
        message: "Verification code sent to your email. Check your inbox.",
        verificationCode, // Remove in production
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment user:", error);
    return NextResponse.json(
      { error: "Failed to create comment user" },
      { status: 500 }
    );
  }
}
