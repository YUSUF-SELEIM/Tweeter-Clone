import TweetCard from "@/components/TweetCard";
import { prisma } from '@/lib/prisma';
import { Tweet } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Bookmarks({ params }: { params: { id: string } }) {
  const { id } = params;

  const savedRaw = await prisma.tweet.findMany({
    where: { saves: { some: { userId: id } } },
    include: { author: true, comments: { include: { author: true } }, likes: true, retweets: true },
  });

  const savedTweets: Tweet[] = savedRaw.map((t) => ({
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
      <div className="w-full space-y-8">
        {savedTweets.length === 0 && <div>No saved tweets</div>}
        {savedTweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} authorId={tweet.author.id} />
        ))}
      </div>
    </div>
  );
}
