import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  authorUrl: varchar("authorUrl", { length: 500 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  publishedDate: timestamp("publishedDate").notNull(),
  status: mysqlEnum("status", ["draft", "submitted", "approved", "rejected", "published"]).default("draft").notNull(),
  submittedBy: varchar("submittedBy", { length: 255 }),
  submittedAt: timestamp("submittedAt"),
  rejectionReason: text("rejectionReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

export const lineups = mysqlTable("lineups", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 255 }).notNull().unique(),
  opponent: varchar("opponent", { length: 255 }).notNull(),
  matchDate: timestamp("matchDate").notNull(),
  lineup: text("lineup").notNull(),
  formation: varchar("formation", { length: 50 }),
  source: varchar("source", { length: 100 }).default("flashscore"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lineup = typeof lineups.$inferSelect;
export type InsertLineup = typeof lineups.$inferInsert;

export const fixtures = mysqlTable("fixtures", {
  id: int("id").autoincrement().primaryKey(),
  opponent: varchar("opponent", { length: 255 }).notNull(),
  homeAway: mysqlEnum("homeAway", ["home", "away"]).notNull(),
  matchDate: timestamp("matchDate").notNull(),
  kickOffTime: varchar("kickOffTime", { length: 50 }),
  competition: varchar("competition", { length: 255 }).notNull(),
  venue: varchar("venue", { length: 255 }),
  status: mysqlEnum("status", ["upcoming", "postponed", "cancelled"]).default("upcoming").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Fixture = typeof fixtures.$inferSelect;
export type InsertFixture = typeof fixtures.$inferInsert;

export const results = mysqlTable("results", {
  id: int("id").autoincrement().primaryKey(),
  opponent: varchar("opponent", { length: 255 }).notNull(),
  homeAway: mysqlEnum("homeAway", ["home", "away"]).notNull(),
  lincolnCityGoals: int("lincolnCityGoals").notNull(),
  opponentGoals: int("opponentGoals").notNull(),
  matchDate: timestamp("matchDate").notNull(),
  competition: varchar("competition", { length: 255 }).notNull(),
  venue: varchar("venue", { length: 255 }),
  goalscorers: text("goalscorers"),
  attendance: int("attendance"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Result = typeof results.$inferSelect;
export type InsertResult = typeof results.$inferInsert;

// Comment system tables
export const commentUsers = mysqlTable("commentUsers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull(),
  avatarUrl: varchar("avatarUrl", { length: 500 }).notNull().default("https://d2xsxph8kpxj0f.cloudfront.net/310519663459369152/U4uk4qUHrVwLe3aeYcVAQS/avatar-football-red-1-fah8CnpdjT3c5wey5oKUaC.png"),
  verificationCode: varchar("verificationCode", { length: 6 }),
  isVerified: int("isVerified").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CommentUser = typeof commentUsers.$inferSelect;
export type InsertCommentUser = typeof commentUsers.$inferInsert;

export const verificationCodes = mysqlTable("verificationCodes", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  code: varchar("code", { length: 6 }).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VerificationCode = typeof verificationCodes.$inferSelect;
export type InsertVerificationCode = typeof verificationCodes.$inferInsert;

export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;
