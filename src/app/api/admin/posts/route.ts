import { NextRequest, NextResponse } from "next/server";
import { getSubmittedPosts, updatePostStatus } from "@/lib/queries";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await getSubmittedPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching submitted posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { postId, status, rejectionReason } = body;

    if (!postId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const validStatuses = ["draft", "submitted", "approved", "rejected", "published"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    await updatePostStatus(postId, status, rejectionReason);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating post status:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
