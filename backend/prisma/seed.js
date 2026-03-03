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
            username : "admin1",
            name : "บิวบอง",
            position : "งาน นผ.3",

        },
                {
            username: "admin2",
            name: "จ.ส.ต.ชาญณรงค์เดช กันตพัชรโรจน์",
            position: "งาน นผ. 1"
        },
        {
            username: "admin3",
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
    const firstName = "ธาดา";
    const lastName = "เสาวโค";
    const rank = "ส.ต.ต.";
    const position = "ผบ.หมู่ (ผช.พงส.) สภ.เมืองชลบุรี";
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

console.log(
  "✅ สร้างโปรไฟล์องค์กรสำเร็จ :\n",
  "\nองค์กร:", organizationName,
  "\nชื่อ:", fullNameWithRank,
  "\nตำแหน่ง:", position
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