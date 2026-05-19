"use client";

import { usePost } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { createComment } from "@/lib/api";

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const [postId, setPostId] = useState<number | null>(null);
  const { post, isLoading, error } = usePost(postId || 0);
  const { comments, isLoading: commentsLoading } = useComments(postId || 0);
  const { user, isAuthenticated } = useAuth();
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      setPostId(parseInt(id));
    });
  }, [params]);

  if (postId === null) {
    return (
      <div className="container py-8">
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-8">
        <p className="text-destructive">Article not found</p>
      </div>
    );
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentContent.trim()) return;

    setIsSubmitting(true);
    try {
      await createComment({
        postId,
        userId: user.id,
        content: commentContent,
      });
      setCommentContent("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <article className="max-w-3xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-muted-foreground mb-4">
            <div>
              <p>By {post.author}</p>
              <p>{format(new Date(post.publishedDate), "MMMM d, yyyy")}</p>
            </div>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded">
              {post.category}
            </span>
          </div>
        </div>

        {/* Article Image */}
        {post.imageUrl && (
          <div className="mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-lg text-foreground whitespace-pre-wrap">{post.content}</p>
        </div>

        {/* Comments Section */}
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

          {/* Comment Form */}
          {isAuthenticated && user ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add a Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitComment}>
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground mb-4 min-h-24"
                  />
                  <Button type="submit" disabled={isSubmitting || !commentContent.trim()}>
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8 bg-muted">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Please log in to leave a comment
                </p>
              </CardContent>
            </Card>
          )}

          {/* Comments List */}
          {commentsLoading ? (
            <p className="text-muted-foreground">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">Anonymous</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(comment.createdAt), "MMM d, yyyy")}
                        </p>
                        <p className="mt-2 text-foreground">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
