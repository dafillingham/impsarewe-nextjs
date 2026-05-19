"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAdminPosts, updatePostStatus } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { Post } from "@/types";

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== "admin") {
      setError("You do not have permission to access this page");
      setIsLoading(false);
      return;
    }

    async function fetchPosts() {
      try {
        const data = await getAdminPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [user, authLoading]);

  const handleApprove = async (postId: number) => {
    try {
      await updatePostStatus(postId, "published");
      setPosts(posts.map((p) => (p.id === postId ? { ...p, status: "published" } : p)));
    } catch (err) {
      console.error("Failed to approve post:", err);
    }
  };

  const handleReject = async (postId: number, reason: string) => {
    try {
      await updatePostStatus(postId, "rejected", reason);
      setPosts(posts.map((p) => (p.id === postId ? { ...p, status: "rejected" } : p)));
    } catch (err) {
      console.error("Failed to reject post:", err);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="container py-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Pending Articles</h2>
        <p className="text-muted-foreground mb-6">
          Review and approve submitted articles
        </p>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No pending articles</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted by: {post.submittedBy}</p>
                    <p className="text-sm text-muted-foreground">
                      Submitted at: {post.submittedAt ? format(new Date(post.submittedAt), "MMM d, yyyy HH:mm") : "N/A"}
                    </p>
                  </div>
                  <p className="text-foreground">{post.excerpt}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(post.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(post.id, "Not appropriate")}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
