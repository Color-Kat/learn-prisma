import {PrismaClient, Post} from '@prisma/client';

import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']});

export default function Home({posts}: { posts: Post[] }) {


    return (
        <main className="">
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </main>
    );
}

// Fetch all posts (in /pages/index.tsx)
export async function getStaticProps() {
    const prisma = new PrismaClient();
    await prisma.$connect();

    // const post = await prisma.post.create({
    //     data: {
    //         title: 'Hello World 3',
    //         description: 'My first post',
    //         created_at: new Date(),
    //     }
    // });
    //
    // const comment = await prisma.comment.create({
    //     data: {
    //         postId: post.id,
    //     }
    // })

    const posts = await prisma.post.findMany({
        where: {
            // comments: {
            //     some: {
            //         id: 1
            //     }
            // }
        },
        select: {
            title: true,
            description: true,
            id: true,
            comments: true
        }
    });

    console.log(posts)

    return {
        props: {posts}
    };
}
