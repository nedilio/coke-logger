import { db } from "@/db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { bearer, username } from "better-auth/plugins";
import * as schema from "@/db/schemas/auth-schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, { provider: "pg", schema }),
  plugins: [
    bearer(),
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30,
    }),
    nextCookies(),
  ],
});
