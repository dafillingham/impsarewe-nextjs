"use client";

import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function ArticlesPage() {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Latest Articles</h1>
        <p className="text-muted-foreground">
          Stay updated with Lincoln City FC news and updates
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/articles/${post.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>
                        By {post.author} • {format(new Date(post.publishedDate), "MMM d, yyyy")}
                      </CardDescription>
                    </div>
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground line-clamp-2">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
