# Better Auth Username Plugin - Quick Reference

## ✅ What Changed

We **refactored** from a custom username implementation to use **Better Auth's official username plugin**.

### Benefits:
- ✅ Proper TypeScript types (no more type assertions!)
- ✅ Built-in validation and normalization
- ✅ Username availability checking
- ✅ Display username support
- ✅ Sign in with username
- ✅ Cleaner, more maintainable code

---

## 📋 Server-Side Usage

### Get Session with Username
```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({ headers: await headers() });

// Fully typed - no assertions needed!
console.log(session.user.username);        // "johndoe"
console.log(session.user.displayUsername); // "JohnDoe" (original casing)
```

### Sign Up with Username
```typescript
await auth.api.signUpEmail({
  body: {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    username: "johndoe",           // Required
    displayUsername: "JohnDoe",    // Optional
  }
});
```

### Update Username
```typescript
await auth.api.updateUser({
  headers: await headers(),
  body: {
    username: "new_username",
  },
});
```

### Check Availability
```typescript
const result = await auth.api.isUsernameAvailable({
  body: { username: "testuser" }
});

console.log(result.available); // boolean
```

### Sign In with Username
```typescript
await auth.api.signInUsername({
  body: {
    username: "johndoe",
    password: "password123",
  },
});
```

---

## 🎨 Client-Side Setup (Required for Frontend)

### 1. Install Client Plugin
```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Your app URL
  plugins: [
    usernameClient(), // ⭐ Add this!
  ],
});
```

### 2. Use in Components
```typescript
import { authClient } from "@/lib/auth-client";

// Sign up
await authClient.signUp.email({
  email: "user@example.com",
  name: "Test User",
  password: "password",
  username: "testuser",
});

// Check availability
const { data } = await authClient.isUsernameAvailable({
  username: "testuser",
});

// Sign in with username
await authClient.signIn.username({
  username: "testuser",
  password: "password",
});
```

---

## 🗂️ Database Schema

### User Table
```typescript
{
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  username: string;        // Normalized (lowercase)
  displayUsername: string | null; // Original casing
  createdAt: Date;
  updatedAt: Date;
}
```

**Rules:**
- `username`: Unique, normalized to lowercase, 3-30 chars
- `displayUsername`: Optional, preserves original casing
- If only `username` provided, `displayUsername` = original input

---

## 🔧 Configuration Options

```typescript
// lib/auth.ts
import { username } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    username({
      minUsernameLength: 3,      // Default: 3
      maxUsernameLength: 30,     // Default: 30
      
      // Custom validator (optional)
      usernameValidator: (username) => {
        if (username === "admin") return false;
        return true;
      },
      
      // Custom normalization (optional)
      usernameNormalization: (username) => {
        return username.toLowerCase();
      },
    }),
  ],
});
```

---

## 📝 Validation Rules

### Username (normalized)
- **Min length**: 3 characters
- **Max length**: 30 characters
- **Allowed characters**: a-z, 0-9, underscore (_), dot (.)
- **Unique**: Must be unique across all users
- **Auto-normalized**: Converted to lowercase

### Display Username
- **Optional**: Can be null
- **No validation** by default
- **Preserves casing**: "JohnDoe123" stays as "JohnDoe123"

---

## 🎯 Common Patterns

### Display Username in UI
```typescript
// Always show displayUsername if available, fall back to username
const displayName = user.displayUsername || user.username;
```

### Public Feed with Usernames
```typescript
const logs = await getPublicCokeLogsAction();

logs.forEach(log => {
  console.log({
    user: log.user.displayUsername || log.user.username,
    cokeType: log.cokeType,
  });
});
```

### Real-time Availability Check
```typescript
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export function UsernameInput() {
  const [available, setAvailable] = useState<boolean | null>(null);
  
  const checkAvailability = async (username: string) => {
    const { data } = await authClient.isUsernameAvailable({ username });
    setAvailable(data?.available ?? null);
  };
  
  return (
    <input
      onBlur={(e) => checkAvailability(e.target.value)}
      placeholder="Username"
    />
  );
}
```

---

## 🚀 Server Actions (Our Custom Wrappers)

### Update Username (with revalidation)
```typescript
import { updateUsernameAction } from "@/server/username";

await updateUsernameAction("new_username");
// Auto-revalidates /settings and /profile
```

### Check Availability
```typescript
import { checkUsernameAvailabilityAction } from "@/server/username";

const result = await checkUsernameAvailabilityAction("testuser");
console.log(result.available);
```

---

## ⚠️ Migration Notes

### Files Removed
- ❌ `lib/validations/username.ts` (validation now in Better Auth)
- ❌ `lib/session-helpers.ts` (no longer needed)

### Files Updated
- ✅ `lib/auth.ts` - Now uses `username()` plugin
- ✅ `db/schemas/auth-schema.ts` - Added `displayUsername` field
- ✅ `server/username.ts` - Now wraps Better Auth methods
- ✅ `server/users.ts` - Simplified signup with username
- ✅ `server/coke-logs.ts` - Public feed includes displayUsername

### Database Migrations
- ✅ Migration 1: Added `username` (NOT NULL, UNIQUE)
- ✅ Migration 2: Added `displayUsername` (nullable)

---

## 🎉 Ready to Use!

The backend is fully configured with Better Auth's username plugin. All you need to do is:

1. **Set up the client plugin** (see Client-Side Setup above)
2. **Build your UI forms** (signup, settings, etc.)
3. **Use the server actions** for mutations
4. **Display usernames** in your public feed

Everything is typed, validated, and production-ready!

---

**Last Updated:** February 17, 2026  
**Better Auth Version:** v1.4.18  
**Status:** ✅ Production Ready
