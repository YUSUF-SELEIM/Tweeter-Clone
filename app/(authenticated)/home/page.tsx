import TweetForm from '@/components/TweetForm';
import TweetCard from '@/components/TweetCard';
import { Tweet } from '@/types';
import Trends from '@/components/TrendsPanel';
import WhoToFollow from '@/components/WhoToFollow';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Server-side fetch of tweets using Prisma (no useEffect)
  const tweetsRaw = await prisma.tweet.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          imageUrl: true,
        },
      },
      comments: {
        select: {
          id: true,
          author: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
            },
          },
          content: true,
          createdAt: true,
        },
      },
      likes: true,
      retweets: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const tweets: Tweet[] = tweetsRaw.map((t) => ({
    id: t.id,
    content: t.content,
    imageUrl: t.imageUrl ?? undefined,
    author: {
      id: t.author.id,
      username: t.author.username,
      imageUrl: t.author.imageUrl ?? undefined,
    },
    likes: Array.isArray(t.likes) ? t.likes.length : 0,
    retweets: Array.isArray(t.retweets) ? t.retweets.length : 0,
    comments: Array.isArray(t.comments) ? t.comments.length : 0,
    commentsList: (t.comments || []).map((c) => ({
      id: c.id,
      user: {
        username: c.author.username,
        imageUrl: c.author.imageUrl || 'https://via.placeholder.com/40',
      },
      content: c.content,
      createdAt: c.createdAt,
    })),
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <div className="flex justify-between w-full px-2 py-4 md:px-24 bg-[##F2F2F2]">
      <div className="w-full space-y-8">
        <TweetForm />
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} authorId={""} />
        ))}
      </div>

      <div className="h-full sticky top-20 hidden md:block w-2/5 ml-8">
        <Trends />
        {/* Fetch users on the server and pass into the WhoToFollow component */}
        <WhoToFollow users={(await prisma.user.findMany({ select: { id: true, username: true, bio: true, imageUrl: true } })).filter(u => u.id !== '')} initialFollowingState={{}} />
      </div>
    </div>
  );
}
