import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

    console.log("🌱 Start Seed");

    // ADMIN
    const passwordHash =
        await bcrypt.hash("123456", 10);

    const admins = [
        {
            username: "admin1",
            name: "นายภูวณัฐ พาหะละ",
            position: "Administrator"
        },
        {
            username: "admin2",
            name: "ส.ต.ต.ธาดา เสาวโค",
            position: "งานนโยบายและแผนงาน"
        },
        {
            username: "admin3",
            name: "จ.ส.ต.ชาญณรงค์เดช กันตพัชรโรจน์",
            position: "งานนโยบายและแผนงาน"
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

    console.log("✅ สร้าง Admin Users สำเร็จ : ", admins.map(a => `${a.username} - ${a.name}`));

    // ORGANIZATION PROFILE

    const firstName = "ธาดา";
    const lastName = "เสาวโค";
    const rank = "ส.ต.ต.";
    const position = "ผบ.หมู่ (ผช.พงส.) ฯ";
    const organizationName = "สถานีตำรวจภูธรเมืองชลบุรี";

    const fullName =
        `${firstName} ${lastName}`;

    const fullNameWithRank =
        `${rank}${fullName}`;

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
        }
    });

    console.log("✅ Organization Profile Seeded");

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