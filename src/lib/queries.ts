import { db } from "./db";
import {
  posts,
  comments,
  commentUsers,
  verificationCodes,
  users,
  fixtures,
  results,
  lineups,
} from "@/drizzle/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";

// ============================================================================
// Posts Queries
// ============================================================================

export async function getPublishedPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedDate));
}

export async function getPostById(id: number) {
  return db.select().from(posts).where(eq(posts.id, id)).limit(1);
}

export async function getSubmittedPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.status, "submitted"))
    .orderBy(desc(posts.submittedAt));
}

export async function createPost(data: typeof posts.$inferInsert) {
  return db.insert(posts).values(data);
}

export async function updatePostStatus(
  id: number,
  status: "draft" | "submitted" | "approved" | "rejected" | "published",
  rejectionReason?: string
) {
  return db
    .update(posts)
    .set({ status, rejectionReason, updatedAt: new Date() })
    .where(eq(posts.id, id));
}

// ============================================================================
// Comments Queries
// ============================================================================

export async function getCommentsByPostId(postId: number) {
  return db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt));
}

export async function getCommentsByUserId(userId: number) {
  return db
    .select()
    .from(comments)
    .where(eq(comments.userId, userId))
    .orderBy(desc(comments.createdAt));
}

export async function createComment(data: typeof comments.$inferInsert) {
  return db.insert(comments).values(data);
}

export async function updateComment(id: number, content: string) {
  return db
    .update(comments)
    .set({ content, updatedAt: new Date() })
    .where(eq(comments.id, id));
}

export async function deleteComment(id: number) {
  return db.delete(comments).where(eq(comments.id, id));
}

// ============================================================================
// Comment Users Queries
// ============================================================================

export async function getCommentUserByEmail(email: string) {
  return db
    .select()
    .from(commentUsers)
    .where(eq(commentUsers.email, email))
    .limit(1);
}

export async function createCommentUser(data: typeof commentUsers.$inferInsert) {
  return db.insert(commentUsers).values(data);
}

export async function updateCommentUser(
  id: number,
  data: Partial<typeof commentUsers.$inferInsert>
) {
  return db
    .update(commentUsers)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(commentUsers.id, id));
}

// ============================================================================
// Verification Codes Queries
// ============================================================================

export async function createVerificationCode(
  data: typeof verificationCodes.$inferInsert
) {
  return db.insert(verificationCodes).values(data);
}

export async function getVerificationCode(email: string, code: string) {
  return db
    .select()
    .from(verificationCodes)
    .where(
      and(
        eq(verificationCodes.email, email),
        eq(verificationCodes.code, code),
        gte(verificationCodes.expiresAt, new Date())
      )
    )
    .limit(1);
}

export async function deleteVerificationCode(email: string, code: string) {
  return db
    .delete(verificationCodes)
    .where(
      and(
        eq(verificationCodes.email, email),
        eq(verificationCodes.code, code)
      )
    );
}

// ============================================================================
// Users Queries
// ============================================================================

export async function getUserById(id: number) {
  return db.select().from(users).where(eq(users.id, id)).limit(1);
}

export async function getUserByOpenId(openId: string) {
  return db.select().from(users).where(eq(users.openId, openId)).limit(1);
}

export async function createUser(data: typeof users.$inferInsert) {
  return db.insert(users).values(data);
}

export async function updateUser(id: number, data: Partial<typeof users.$inferInsert>) {
  return db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, id));
}
