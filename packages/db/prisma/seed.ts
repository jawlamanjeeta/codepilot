import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding development data...");

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: "dev@codepilot.dev" },
    update: {},
    create: {
      name: "Dev User",
      email: "dev@codepilot.dev",
      emailVerified: new Date(),
    },
  });
  console.log(`✅ User: ${user.email} (${user.id})`);

  // Link a Codeforces account
  await prisma.linkedAccount.upsert({
    where: { userId_platform: { userId: user.id, platform: "CODEFORCES" } },
    update: {},
    create: {
      userId: user.id,
      platform: "CODEFORCES",
      handle: "tourist",
      status: "pending",
    },
  });
  console.log("✅ Linked Codeforces account: tourist");

  console.log("🎉 Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
