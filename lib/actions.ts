'use server';
import { prisma } from '@/lib/prisma';

export async function comment(content: string, tweetId: string, authorId: string) {
    return prisma.comment.create({
        data: {
            content,
            tweetId,
            authorId,
        },
    });
}
export async function like(tweetId: string, userId: string) {
    // Check if the like already exists
    const existingLike = await prisma.like.findFirst({
        where: {
            tweetId,
            userId
        }
    });

    if (existingLike) {
        // If the like exists, remove it
        return prisma.like.delete({
            where: {
                id: existingLike.id
            }
        });
    } else {
        // If the like does not exist, create it
        return prisma.like.create({
            data: {
                tweetId,
                userId
            }
        });
    }
}

export async function retweet(tweetId: string, userId: string) {
    const existingRetweet = await prisma.retweet.findFirst({
        where: {
            tweetId,
            userId,
        },
    });

    if (existingRetweet) {
        // Remove the retweet if it already exists
        return prisma.retweet.delete({
            where: {
                id: existingRetweet.id,
            },
        });
    } else {
        // Add a new retweet if it doesn't exist
        return prisma.retweet.create({
            data: {
                tweetId,
                userId,
            },
        });
    }
}

export async function saveTweet(tweetId: string, userId: string) {
    const existingSave = await prisma.saveTweet.findFirst({
        where: {
            tweetId,
            userId,
        },
    });

    if (existingSave) {
        // Remove the save if it already exists
        return prisma.saveTweet.delete({
            where: {
                id: existingSave.id,
            },
        });
    } else {
        // Add a new save if it doesn't exist
        return prisma.saveTweet.create({
            data: {
                tweetId,
                userId,
            },
        });
    }
}
export async function getLikeStatus(tweetId: string, userId: string) {
    const existingLike = await prisma.like.findFirst({
        where: {
            tweetId,
            userId
        }
    });

    return !!existingLike; // Return true if a like exists, otherwise false
}

export async function getRetweetStatus(tweetId: string, userId: string) {
    const existingRetweet = await prisma.retweet.findFirst({
        where: {
            tweetId,
            userId
        }
    });

    return !!existingRetweet; // Return true if a retweet exists, otherwise false
}


export async function getSaveTweetStatus(tweetId: string, userId: string) {
    const existingSavedTweet = await prisma.saveTweet.findFirst({
        where: {
            tweetId,
            userId
        }
    });

    return !!existingSavedTweet; // Return true if the tweet is saved, otherwise false
}

export async function getTweetComments(tweetId: string) {
    return prisma.comment.findMany({
        where: {
            tweetId,
        },
        include: {
            author: true,
        },
    });
}

export async function getNumberOfCommentsOfTweet(tweetId: string) {
    return prisma.comment.count({
        where: {
            tweetId,
        },
    });
}

export async function getNumberOfLikesOfTweet(tweetId: string) {
    return prisma.like.count({
        where: {
            tweetId,
        },
    });
}

export async function getNumberOfRetweetsOfTweet(tweetId: string) {
    return prisma.retweet.count({
        where: {
            tweetId,
        },
    });
}

export async function likeAComment(commentId: string, userId: string) {
    const existingLike = await prisma.commentLike.findFirst({
        where: {
            commentId,
            userId
        }
    });

    if (existingLike) {
        // If the like exists, remove it
        return prisma.commentLike.delete({
            where: {
                id: existingLike.id
            }
        });
    } else {
        // If the like does not exist, create it
        return prisma.commentLike.create({
            data: {
                commentId,
                userId
            }
        });
    }
}   
export async function getCommentLikes(commentId: string) {
    return prisma.commentLike.count({
        where: {
            commentId
        }
    });
}

export async function getLikeStatusOfComment(commentId: string, userId: string) {
    const existingLike = await prisma.commentLike.findFirst({
        where: {
            commentId,
            userId
        }
    });

    return !!existingLike; // Return true if a like exists, otherwise false
}

export async function getUserInfo(userId: string) {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    });
}
export async function followUser(followingId: string, followerId: string) {
    const existingFollow = await prisma.follow.findFirst({
        where: {
            followingId: followingId,//followingId: The ID of the user to be followed.
            followerId: followerId //followerId: The ID of the user performing the follow action.

        }
    });

    if (existingFollow) {
        // If the follow exists, remove it
        return prisma.follow.delete({
            where: {
                id: existingFollow.id
            }
        });
    } else {
        // If the follow does not exist, create it
        return prisma.follow.create({
            data: {
                followingId: followingId,
                followerId: followerId
            }
        });
    }
}

export async function checkIfFollowing(followingId: string, followerId: string) {
    const existingFollow = await prisma.follow.findFirst({
        where: {
            followingId,
            followerId
        }
    });

    return !!existingFollow; // Return true if a follow exists, otherwise false
}

export async function getNumberOfFollowers(userId: string) {
    return prisma.follow.count({
        where: {
            followingId: userId
        }
    });
}

export async function getNumberOfFollowing(userId: string) {
    return prisma.follow.count({
        where: {
            followerId: userId
        }
    });
}