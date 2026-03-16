import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const adminEmail = "admin@onlineexam.com";
  const adminPassword = "adminpassword123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.create({
      data: {
        name: "System Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        admin: {
          create: {}
        }
      },
    });
    console.log("Admin user created:", admin.email);
  } else {
    console.log("Admin user already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
