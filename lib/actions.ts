'use server';
import {prisma} from '@/lib/prisma';

export async function addComment(content: string, tweetId: string,  authorId: string) {
    return prisma.comment.create({
        data: {
            content,
            tweetId,
            authorId,
         
        }
    });
}
export async function getTweetComments(tweetId: string) {
    return prisma.comment.findMany({
        where: {
            tweetId
        },
        include: {
            author: true
        }
    });
}