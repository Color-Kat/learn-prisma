import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
        data: {
            name: "ColorKat",
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

    console.log(user)
}

main()
    .catch(e => {
        console.log(e.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });