import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

    console.log("🌱 Start Seed");

    // ADMIN
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
            position: "งาน นผ.3",

        },
        {
            username: "BiwBoong",
            name: "บิวบอง",
            position: "งาน นผ.3",

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
                position: admin.position
            }
        });

    }

    console.log(
        "✅ สร้าง Admin Users สำเร็จ : \n",
        admins.map(a =>
            ` - userName :${a.username}\n - ชื่อ :  ${a.name}\n - ตำแหน่ง :  ${a.position}\n`
        ).join("\n")
    );
    // ORGANIZATION PROFILE
    // 🔹 คนที่ 1 (ผู้ช่วย)
    const organizationName = "สถานีตำรวจภูธรเมืองชลบุรี";

    // 🔹 คนที่ 1 (ผู้พิมพ์)
    const firstName = "ธาดา";
    const lastName = "เสาวโค";
    const rank = "ส.ต.ต.";
    const position = "ผบ.หมู่ (ผช.พงส.) สภ.เมืองชลบุรี";

    const fullName = `${firstName} ${lastName}`;
    const fullNameWithRank = `${rank} ${fullName}`;

    // 🔹 คนที่ 2 (ผู้กำกับ)

    const commanderRank = "พ.ต.อ.";
    const commanderFullRank = "พันตำรวจเอก";
    const commanderFirstName = "สมชาย";
    const commanderLastName = "ทิวงษา";
    const commanderPosition = "ผกก.สภ.เมืองชลบุรี";
    const commanderFullPosition = "ผู้กำกับการสถานีตำรวจภูธรเมืองชลบุรี";

    const commanderFullName = `${commanderFirstName} ${commanderLastName}`;
    const commanderFullNameWithRank = `${commanderRank} ${commanderFullName}`;

    // 🔹 คนที่ 3 (การเงิน)
    const financeRank = "ร.ต.ต.หญิง";
    const financeFirstName = "จันทิมา";
    const financeLastName = "เชื้อสกุล";

    const financePosition = "รอง สว.(ป.) สภ.เมืองชลบุรี";

    const financeFullName = `${financeFirstName} ${financeLastName}`;
    const financeFullNameWithRank = `${financeRank} ${financeFullName}`;

    await prisma.organization.upsert({
        where: { key: "MAIN" },

        update: {
            organizationName,
            rank,
            firstName,
            lastName,
            fullName,
            fullNameWithRank,
            position,

            // คนที่ 2
            commanderRank,
            commanderFullRank,
            commanderFirstName,
            commanderLastName,
            commanderFullName,
            commanderFullNameWithRank,
            commanderPosition,
            commanderFullPosition,

            // คนที่ 3
            financeRank,
            financeFirstName,
            financeLastName,
            financeFullName,
            financeFullNameWithRank,
            financePosition,

        },

        create: {
            key: "MAIN",
            organizationName,
            rank,
            firstName,
            lastName,
            fullName,
            fullNameWithRank,
            position,

            // คนที่ 2
            commanderRank,
            commanderFullRank,
            commanderFirstName,
            commanderLastName,
            commanderFullName,
            commanderFullNameWithRank,
            commanderPosition,
            commanderFullPosition,

            // คนที่ 3
            financeRank,
            financeFirstName,
            financeLastName,
            financeFullName,
            financeFullNameWithRank,
            financePosition,
        }
    });

    console.log(
        `✅ สร้างโปรไฟล์องค์กรสำเร็จ :

องค์กร: ${organizationName}

ผู้รับ/จนท.พิมพ์ลายนิ้วมือ:
${fullNameWithRank}
${position}

ผกก.สภ.เมืองชลบุรี:
${commanderFullNameWithRank}
${commanderPosition}

ผู้จ่าย/จนท.การเงิน:
${financeFullNameWithRank}
${financePosition}
`
    );

}

main()
    .then(() => {
        console.log("🌱 Seed Success");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });