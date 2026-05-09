import { prisma } from '@/lib/prisma';
import SearchTweets from '@/components/SearchTweets';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Explore() {
  // Server-side fetch of tweets
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
            select: { id: true, username: true, imageUrl: true },
          },
          content: true,
          createdAt: true,
        },
      },
      likes: true,
      retweets: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const tweets = tweetsRaw.map((t) => ({
    id: t.id,
    content: t.content,
    imageUrl: t.imageUrl ?? undefined,
    author: { id: t.author.id, username: t.author.username, imageUrl: t.author.imageUrl ?? undefined },
    likes: Array.isArray(t.likes) ? t.likes.length : 0,
    retweets: Array.isArray(t.retweets) ? t.retweets.length : 0,
    comments: Array.isArray(t.comments) ? t.comments.length : 0,
    commentsList: (t.comments || []).map((c) => ({ id: c.id, user: { username: c.author.username, imageUrl: c.author.imageUrl || 'https://via.placeholder.com/40' }, content: c.content, createdAt: c.createdAt })),
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <div className="flex justify-between w-full px-2 py-4 md:px-24 bg-[#F2F2F2]">
      <div className="sticky bg-white shadow-md rounded-lg h-[10rem] top-20 hidden md:block w-2/5 mr-8">
        <div className="flex flex-col justify-center h-full">
          <button className="text-left py-2 px-4 font-medium  border-l-4 border-blue-500">Top</button>
          <button className="text-left py-2 px-4 font-medium text-gray-500">Latest</button>
          <button className="text-left py-2 px-4 font-medium text-gray-500">People</button>
          <button className="text-left py-2 px-4 font-medium text-gray-500">Media</button>
        </div>
      </div>

      <main className="w-full space-y-8">
        <SearchTweets tweets={tweets} authorId={""} />
      </main>
    </div>
  );
}
