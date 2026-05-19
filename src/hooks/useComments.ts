"use client";

import { useEffect, useState } from "react";
import { getComments, createComment as apiCreateComment } from "@/lib/api";
import type { Comment } from "@/types";

export function useComments(postId: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const data = (await getComments(postId)) as any;
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch comments");
      } finally {
        setIsLoading(false);
      }
    }

    fetchComments();
  }, [postId]);

  const createComment = async (userId: number, content: string) => {
    try {
      const newComment = (await apiCreateComment({
        postId,
        userId,
        content,
      })) as any;
      setComments([...comments, newComment]);
      return newComment;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create comment");
      throw err;
    }
  };

  return {
    comments,
    isLoading,
    error,
    createComment,
  };
}
