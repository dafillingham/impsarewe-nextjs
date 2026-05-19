import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("API Routes", () => {
  describe("POST /api/register", () => {
    it("should register a new user", async () => {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          username: "testuser",
        }),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it("should reject duplicate email", async () => {
      await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "duplicate@example.com",
          username: "user1",
        }),
      });

      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "duplicate@example.com",
          username: "user2",
        }),
      });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/posts", () => {
    it("should return published posts", async () => {
      const response = await fetch("http://localhost:3000/api/posts");
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe("GET /api/comments", () => {
    it("should require postId parameter", async () => {
      const response = await fetch("http://localhost:3000/api/comments");
      expect(response.status).toBe(400);
    });

    it("should return comments for a post", async () => {
      const response = await fetch("http://localhost:3000/api/comments?postId=1");
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe("POST /api/contact", () => {
    it("should accept contact form submission", async () => {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          subject: "Test",
          message: "Test message",
        }),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it("should reject missing fields", async () => {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
        }),
      });

      expect(response.status).toBe(400);
    });
  });
});
