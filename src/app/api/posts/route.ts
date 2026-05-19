import { NextRequest, NextResponse } from "next/server";
import { getPublishedPosts, createPost } from "@/lib/queries";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = await createPost({
      ...body,
      status: "submitted",
      submittedBy: user.email,
      submittedAt: new Date(),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
