import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
        data: {
            name: "ColorKat2",
            email: "coco@co.co",
            age: 18,
            userPreference: {
                create: {
                    emailNews: true
                }
            }
        },
        select: {
            name: true,
            userPreference: { select: { emailNews: true } }
        }
    });

    const usersCount = await prisma.user.createMany({
        data: [
            {name: "Admin", age: 10, email: "admin@admin.admin"},
            {name: "Masha", age: 17, email: "maria@mail.ru"},
            {name: "Gustov", age: 34, email: "gustov@han.hrestian"},
        ],
    });

    console.log(usersCount);

    const updatedUser = await prisma.user.update({
       where: {
           email: "admin@admin.admin",
       },
        data: {
            age: 20
        }
    });

    console.log('updatedUser', updatedUser);

    const users = await prisma.user.findMany({
        where: {
            name: {
                not: "ColorKat"
            },
            age: {
                lte: 17
            }
        }
    })

    console.log(users)
}

main()
    .catch(e => {
        console.log(e.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });