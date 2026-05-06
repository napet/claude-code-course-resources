// In-memory session store for demo purposes
interface SessionData {
  userId: string;
  email: string;
  createdAt: number;
}

const sessions = new Map<string, SessionData>();
const users = new Map<string, { email: string; passwordHash: string }>();

function hashPassword(password: string): string {
  // Simple hash for demo - use bcrypt in production
  return Buffer.from(password).toString("base64");
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Initialize with test account
const TEST_EMAIL = "test@example.com";
const TEST_PASSWORD = "testpassword";
users.set(TEST_EMAIL, { email: TEST_EMAIL, passwordHash: hashPassword(TEST_PASSWORD) });

export { sessions, users, hashPassword, verifyPassword, generateSessionId, TEST_EMAIL, TEST_PASSWORD };
