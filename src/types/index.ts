import type { User, Post, Comment, CommentUser } from "@/drizzle/schema";

export type { User, Post, Comment, CommentUser };

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface CommentWithUser extends Comment {
  user?: CommentUser;
}

export interface PostWithComments extends Post {
  comments?: CommentWithUser[];
  commentCount?: number;
}
