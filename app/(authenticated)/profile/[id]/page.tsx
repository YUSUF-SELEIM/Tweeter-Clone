import { prisma } from '@/lib/prisma';
import ProfileClient from '@/components/ProfileClient';
import { Tweet } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch user info and related data on the server
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, bio: true, imageUrl: true, bannerUrl: true },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  const [tweetsRaw, likesRaw, followingCount, followersCount] = await Promise.all([
    prisma.tweet.findMany({ where: { authorId: id }, include: { author: true, comments: { include: { author: true } }, likes: true, retweets: true }, orderBy: { createdAt: 'desc' } }),
    prisma.tweet.findMany({ where: { likes: { some: { userId: id } } }, include: { author: true, comments: { include: { author: true } }, likes: true, retweets: true } }),
    prisma.follow.count({ where: { followerId: id } }),
    prisma.follow.count({ where: { followingId: id } }),
  ]);

  const tweets: Tweet[] = tweetsRaw.map((t) => ({
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

  const likes: Tweet[] = likesRaw.map((t) => ({
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

  // Determine if the current viewer is following this profile by checking token (best-effort)
  // We don't have viewer id on server side reliably here; mark as null.
  const isFollowing = null;

  return (
    <ProfileClient
      userInfo={{ username: user.username, bio: user.bio || '', imageUrl: user.imageUrl || '', bannerUrl: user.bannerUrl || '' }}
      tweets={tweets}
      likes={likes}
      followersCount={followersCount}
      followingCount={followingCount}
      isFollowing={isFollowing}
      profileId={id}
    />
  );
}
