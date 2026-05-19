import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { signToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Get user from database by username
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (!userList || userList.length === 0) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const user = userList[0];

    // TODO: Verify password hash in production
    // For now, accept any password (NOT SECURE - for demo only)
    // In production, use bcrypt to hash and verify passwords

    // Create JWT token
    const token = await signToken({
      userId: user.id,
      email: user.email ?? "",
      role: user.role as "user" | "admin",
    });

    // Set cookie
    const response = NextResponse.json(
      { success: true, user },
      { status: 200 }
    );

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}
