import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create admin role
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      description: "Administrator with full access",
    },
  });
  console.log("✅ Admin role created/updated");

  // Create user role
  const userRole = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
      description: "Regular user",
    },
  });
  console.log("✅ User role created/updated");

  // Create super admin user
  const hashedPassword = await bcrypt.hash("Admin@123456", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@rcsbahrain.com" },
    update: {},
    create: {
      fullName: "Super Admin",
      email: "admin@rcsbahrain.com",
      password: hashedPassword,
      roleId: adminRole.id,
      isActive: true,
    },
  });

  console.log("✅ Super Admin created/updated");
  console.log("\n📋 Credentials:");
  console.log("   Email: admin@rcsbahrain.com");
  console.log("   Password: Admin@123456");
  console.log("\n⚠️  Change the default password after first login!\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
