import { NextRequest, NextResponse } from "next/server";
import { getVerificationCode, deleteVerificationCode, getCommentUserByEmail, updateCommentUser } from "@/lib/queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 }
      );
    }

    // Verify the code
    const verification = await getVerificationCode(email, code);
    if (!verification || verification.length === 0) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    // Update comment user as verified
    const commentUser = await getCommentUserByEmail(email);
    if (commentUser && commentUser.length > 0) {
      await updateCommentUser(commentUser[0].id, { isVerified: 1 });
    }

    // Delete the verification code
    await deleteVerificationCode(email, code);

    return NextResponse.json({ success: true, message: "Email verified" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}
