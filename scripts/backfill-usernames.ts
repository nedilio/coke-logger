import "dotenv/config";
import { db } from "../db/drizzle";
import { user } from "../db/schemas";
import { isNull, eq } from "drizzle-orm";

// Helper function to generate username from name
function generateUsername(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "") // Remove non-alphanumeric
    .substring(0, 20); // Max length
}

// Backfill usernames for existing users
async function backfillUsernames() {
  console.log("🔍 Checking for users without usernames...");

  const usersWithoutUsername = await db.query.user.findMany({
    where: isNull(user.username),
  });

  if (usersWithoutUsername.length === 0) {
    console.log("✅ All users already have usernames!");
    return;
  }

  console.log(`📝 Found ${usersWithoutUsername.length} users without username\n`);

  for (const u of usersWithoutUsername) {
    let baseUsername = generateUsername(u.name);
    
    // Ensure minimum length
    if (baseUsername.length < 3) {
      baseUsername = `user${baseUsername}`;
    }
    
    let username = baseUsername;
    let suffix = 1;

    // Check for duplicates and add suffix
    while (true) {
      const existing = await db.query.user.findFirst({
        where: eq(user.username, username),
      });

      if (!existing) break;

      suffix++;
      username = `${baseUsername}${suffix}`;
    }

    // Update user with generated username
    await db.update(user)
      .set({ username })
      .where(eq(user.id, u.id));

    console.log(`✓ ${u.name} → ${username}`);
  }

  console.log("\n✅ Username backfill complete!");
  console.log("\n💡 Note: Username field is currently nullable in the database.");
  console.log("   If you want to make it NOT NULL, run:");
  console.log("   ALTER TABLE \"user\" ALTER COLUMN \"username\" SET NOT NULL;");
}

backfillUsernames()
  .then(() => {
    console.log("\n🎉 Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });
