"use client";

import { useEffect, useState } from "react";
import { getPosts, getPost, createPost as apiCreatePost } from "@/lib/api";
import type { Post } from "@/types";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = (await getPosts()) as any;
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const createPost = async (data: Partial<Post>) => {
    try {
      const newPost = (await apiCreatePost(data)) as any;
      setPosts([...posts, newPost]);
      return newPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
      throw err;
    }
  };

  return {
    posts,
    isLoading,
    error,
    createPost,
  };
}

export function usePost(id: number) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = (await getPost(id)) as any;
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch post");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  return {
    post,
    isLoading,
    error,
  };
}
