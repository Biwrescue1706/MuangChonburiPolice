import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start Seed");

  // ================= ADMIN =================
  const defaultPassword = "123456";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const admins = [
    {
      username: "Admin",
      name: "นายภูวณัฐ พาหะละ",
      position: "งาน นผ.3"
    },
    {
      username: "admin1",
      name: "บิวบอง",
      position: "งาน นผ.3"
    },
    {
      username: "BiwBoong",
      name: "บิวบอง",
      position: "งาน นผ.3"
    },
    {
      username: "Bank",
      name: "จ.ส.ต.ชาญณรงค์เดช กันตพัชรโรจน์",
      position: "งาน นผ. 1"
    },
    {
      username: "Max",
      name: "ส.ต.ต.ธาดา เสาวโค",
      position: "งาน นผ. 2"
    }
  ];

  for (const admin of admins) {
    await prisma.admin.upsert({
      where: { username: admin.username },
      update: {},
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

  // ผู้พิมพ์
  const firstName = "ธาดา";
  const lastName = "เสาวโค";
  const rank = "ส.ต.ต.";
  const position = "ผบ.หมู่ (ผช.พงส.) สภ.เมืองชลบุรี";

  const fullName = `${firstName} ${lastName}`;
  const fullNameWithRank = `${rank} ${fullName}`;

  // COMMANDER
  const commanderRank = "พ.ต.อ.";
  const commanderFullRank = "พันตำรวจเอก";
  const commanderFirstName = "สมชาย";
  const commanderLastName = "ทิวงษา";
  const commanderPosition = "ผกก.สภ.เมืองชลบุรี";
  const commanderFullPosition = "ผู้กำกับการสถานีตำรวจภูธรเมืองชลบุรี";

  const commanderFullName = `${commanderFirstName} ${commanderLastName}`;
  const commanderFullNameWithRank = `${commanderRank} ${commanderFullName}`;

  // FINANCE
  const financeRank = "ร.ต.ต.หญิง";
  const financeFirstName = "จันทิมา";
  const financeLastName = "เชื้อสกุล";
  const financePosition = "รอง สว.(ป.) สภ.เมืองชลบุรี";

  const financeFullName = `${financeFirstName} ${financeLastName}`;
  const financeFullNameWithRank = `${financeRank} ${financeFullName}`;

  // ===== upsert organization =====
  const org = await prisma.organization.upsert({
    where: { key: "MAIN" },
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
  await prisma.organizationCommander.upsert({
    where: { organizationId: org.organizationId },
    update: {
      rank: commanderRank,
      fullRank: commanderFullRank,
      firstName: commanderFirstName,
      lastName: commanderLastName,
      fullName: commanderFullName,
      fullNameWithRank: commanderFullNameWithRank,
      position: commanderPosition,
      fullPosition: commanderFullPosition
      // signatureImage: "/uploads/signatures/commander.png"
    },
    create: {
      organizationId: org.organizationId,
      rank: commanderRank,
      fullRank: commanderFullRank,
      firstName: commanderFirstName,
      lastName: commanderLastName,
      fullName: commanderFullName,
      fullNameWithRank: commanderFullNameWithRank,
      position: commanderPosition,
      fullPosition: commanderFullPosition
    }
  });

  // ================= FINANCE =================
  await prisma.organizationFinance.upsert({
    where: { organizationId: org.organizationId },
    update: {
      rank: financeRank,
      firstName: financeFirstName,
      lastName: financeLastName,
      fullName: financeFullName,
      fullNameWithRank: financeFullNameWithRank,
      position: financePosition
    },
    create: {
      organizationId: org.organizationId,
      rank: financeRank,
      firstName: financeFirstName,
      lastName: financeLastName,
      fullName: financeFullName,
      fullNameWithRank: financeFullNameWithRank,
      position: financePosition
    }
  });

  console.log("✅ Seed Organization + Commander + Finance สำเร็จ");
}

main()
  .then(() => {
    console.log("🌱 Seed Success");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });