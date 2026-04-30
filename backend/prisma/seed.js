import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start Seed");

  // ================= ADMIN =================
  const defaultPassword = "123456";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const admins = [
    { username: "Admin", name: "นายภูวณัฐ พาหะละ", position: "งาน นผ.3" },
    { username: "admin1", name: "บิวบอง", position: "งาน นผ.3" },
    { username: "BiwBoong", name: "บิวบอง", position: "งาน นผ.3" },
    { username: "Bank", name: "จ.ส.ต.ชาญณรงค์เดช กันตพัชรโรจน์", position: "งาน นผ. 1" },
    { username: "Max", name: "ส.ต.ต.ธาดา เสาวโค", position: "งาน นผ. 2" }
  ];

  for (const admin of admins) {
    await prisma.admin.upsert({
      where: { username: admin.username },
      update: {}, // ไม่แก้ของเดิม
      create: {
        username: admin.username,
        password: passwordHash,
        name: admin.name,
        position: admin.position
      }
    });
  }

  console.log("✅ Seed Admin สำเร็จ");

  // ================= ORGANIZATION =================
  const organizationName = "สถานีตำรวจภูธรเมืองชลบุรี";

  const firstName = "ธาดา";
  const lastName = "เสาวโค";
  const rank = "ส.ต.ต.";
  const position = "ผบ.หมู่ (ผช.พงส.) สภ.เมืองชลบุรี";

  const fullName = `${firstName} ${lastName}`;
  const fullNameWithRank = `${rank} ${fullName}`;

  // ===== upsert organization =====
  const org = await prisma.organization.upsert({
    where: { key: "MAIN" }, // ต้อง unique
    update: {
      organizationName,
      rank,
      firstName,
      lastName,
      fullName,
      fullNameWithRank,
      position
    },
    create: {
      key: "MAIN",
      organizationName,
      rank,
      firstName,
      lastName,
      fullName,
      fullNameWithRank,
      position
    }
  });

  // ================= COMMANDER =================
  const commander = {
    rank: "พ.ต.อ.",
    fullRank: "พันตำรวจเอก",
    firstName: "สมชาย",
    lastName: "ทิวงษา",
    position: "ผกก.สภ.เมืองชลบุรี",
    fullPosition: "ผู้กำกับการสถานีตำรวจภูธรเมืองชลบุรี"
  };

  const commanderFullName = `${commander.firstName} ${commander.lastName}`;
  const commanderFullNameWithRank = `${commander.rank} ${commanderFullName}`;

  await prisma.organizationCommander.upsert({
    where: { organizationId: org.organizationId },
    update: {
      ...commander,
      fullName: commanderFullName,
      fullNameWithRank: commanderFullNameWithRank
    },
    create: {
      organizationId: org.organizationId,
      ...commander,
      fullName: commanderFullName,
      fullNameWithRank: commanderFullNameWithRank
    }
  });

  // ================= FINANCE =================
  const finance = {
    rank: "ร.ต.ต.หญิง",
    firstName: "จันทิมา",
    lastName: "เชื้อสกุล",
    position: "รอง สว.(ป.) สภ.เมืองชลบุรี"
  };

  const financeFullName = `${finance.firstName} ${finance.lastName}`;
  const financeFullNameWithRank = `${finance.rank} ${financeFullName}`;

  await prisma.organizationFinance.upsert({
    where: { organizationId: org.organizationId },
    update: {
      ...finance,
      fullName: financeFullName,
      fullNameWithRank: financeFullNameWithRank
    },
    create: {
      organizationId: org.organizationId,
      ...finance,
      fullName: financeFullName,
      fullNameWithRank: financeFullNameWithRank
    }
  });

  console.log("✅ Seed Organization + Commander + Finance สำเร็จ");
}

main()
  .then(async () => {
    console.log("🌱 Seed Success");
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });