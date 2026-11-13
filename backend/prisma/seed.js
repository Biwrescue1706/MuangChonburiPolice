import prisma from "../src/neon.js";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  const admins = [
    {
      username: "BiwBoong",
      name: "บิวบอง",
      position: "งาน นผ.3",
    },
    {
      username: "Bank",
      name: "จ.ส.ต.ชาญณรงค์เดช กันตพัชรโรจน์",
      position: "งาน นผ. 1",
    },
    {
      username: "Max",
      name: "ส.ต.ต.ธาดา เสาวโค",
      position: "งาน นผ. 2",
    },
  ];

  for (const admin of admins) {
    await prisma.admin.upsert({
      where: { username: admin.username },
      update: {},
      create: {
        username: admin.username,
        password: passwordHash,
        name: admin.name,
        position: admin.position,
      },
    });
  }

  const organizationName = "สถานีตำรวจภูธรเมืองชลบุรี";
  const firstName = "ธาดา";
  const lastName = "เสาวโค";
  const rank = "ส.ต.ต.";
  const position = "ผบ.หมู่ (ผช.พงส.) สภ.เมืองชลบุรี";
  const fullName = `${firstName} ${lastName}`;
  const fullNameWithRank = `${rank} ${fullName}`;

  let org = await prisma.organization.findFirst();

  if (org) {
    org = await prisma.organization.update({
      where: { organizationId: org.organizationId },
      data: {
        organizationName,
        rank,
        firstName,
        lastName,
        fullName,
        fullNameWithRank,
        position,
      },
    });
  } else {
    org = await prisma.organization.create({
      data: {
        key: "MAIN",
        organizationName,
        rank,
        firstName,
        lastName,
        fullName,
        fullNameWithRank,
        position,
      },
    });
  }

  const commander = {
    rank: "พ.ต.อ.",
    fullRank: "พันตำรวจเอก",
    firstName: "สมชาย",
    lastName: "ทิวงษา",
    position: "ผกก.สภ.เมืองชลบุรี",
    fullPosition: "ผู้กำกับการสถานีตำรวจภูธรเมืองชลบุรี",
  };

  const commanderFullName =
    `${commander.firstName} ${commander.lastName}`;

  const commanderFullNameWithRank =
    `${commander.rank} ${commanderFullName}`;

  await prisma.organizationCommander.upsert({
    where: { organizationId: org.organizationId },
    update: {
      ...commander,
      fullName: commanderFullName,
      fullNameWithRank: commanderFullNameWithRank,
    },
    create: {
      organizationId: org.organizationId,
      ...commander,
      fullName: commanderFullName,
      fullNameWithRank: commanderFullNameWithRank,
    },
  });

  const finance = {
    rank: "ร.ต.ต.หญิง",
    firstName: "จันทิมา",
    lastName: "เชื้อสกุล",
    position: "รอง สว.(ป.) สภ.เมืองชลบุรี",
  };

  const financeFullName =
    `${finance.firstName} ${finance.lastName}`;

  const financeFullNameWithRank =
    `${finance.rank} ${financeFullName}`;

  await prisma.organizationFinance.upsert({
    where: { organizationId: org.organizationId },
    update: {
      ...finance,
      fullName: financeFullName,
      fullNameWithRank: financeFullNameWithRank,
    },
    create: {
      organizationId: org.organizationId,
      ...finance,
      fullName: financeFullName,
      fullNameWithRank: financeFullNameWithRank,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });