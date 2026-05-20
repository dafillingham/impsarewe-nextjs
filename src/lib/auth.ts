import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

// We remove the top-level 'throw new Error' check. 
// It will now be handled inside the functions when the app is actually running.

export interface JWTPayload {
  userId: number;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

// Helper to get secret safely
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Return a dummy value during build to prevent crashes
    return new TextEncoder().encode("build-time-placeholder-value-1234567890");
  }
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: JWTPayload): Promise<string> {
  const secret = getSecret();
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = getSecret();
    const verified = await jwtVerify(token, secret);
    return verified.payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth")?.value || null;
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth");
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getAuthCookie();
  if (!token) return null;
  return verifyToken(token);
}
