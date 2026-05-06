import { NextRequest, NextResponse } from "next/server";
import { sessions, users, hashPassword, verifyPassword, generateSessionId } from "@/lib/auth";
import { nanoid } from "nanoid";

const COOKIE_NAME = "auth-session";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const action = url.pathname.split("/").pop();

  if (action === "sign-up") {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    if (users.has(email)) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    users.set(email, { email, passwordHash: hashPassword(password) });
    const userId = nanoid();
    const sessionId = generateSessionId();

    sessions.set(sessionId, {
      userId,
      email,
      createdAt: Date.now(),
    });

    const response = NextResponse.json({
      user: { id: userId, email },
    });
    response.cookies.set(COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  }

  if (action === "sign-in") {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const user = users.get(email);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const userId = nanoid();
    const sessionId = generateSessionId();

    sessions.set(sessionId, {
      userId,
      email,
      createdAt: Date.now(),
    });

    const response = NextResponse.json({
      user: { id: userId, email },
    });
    response.cookies.set(COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }

  if (action === "sign-out") {
    const sessionId = request.cookies.get(COOKIE_NAME)?.value;
    if (sessionId) {
      sessions.delete(sessionId);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  if (action === "session") {
    const sessionId = request.cookies.get(COOKIE_NAME)?.value;

    if (!sessionId || !sessions.has(sessionId)) {
      return NextResponse.json(null, { status: 401 });
    }

    const session = sessions.get(sessionId)!;
    return NextResponse.json({
      id: session.userId,
      email: session.email,
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
