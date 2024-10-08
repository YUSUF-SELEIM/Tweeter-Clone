import { format } from 'date-fns';
import { Tweet } from '@/types';
import CommentsSection from './CommentsSection';
import TweetActions from './TweetActions';
import TweetData from './TweetData';
import { useState, forwardRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import LazyLoad from 'react-lazyload';

const TweetCard = forwardRef<HTMLDivElement, { tweet: Tweet; authorId: string }>(
  ({ tweet, authorId }, ref) => {
    const [showComments, setShowComments] = useState(false);
    const router = useRouter();

    // Memoize formatted date to prevent recalculations on every render
    const formattedDate = useMemo(() => {
      return format(new Date(tweet.createdAt), "d MMMM 'at' HH:mm");
    }, [tweet.createdAt]);

    // Memoize handleProfileClick to prevent creating a new function on every render
    const handleProfileClick = useCallback(() => {
      if (tweet.author?.id) {
        router.push(`/profile/${tweet.author.id}`);
      }
    }, [tweet.author?.id, router]);

    return (
      <div ref={ref} className="w-full border rounded-lg p-4 bg-background mb-6">
        <div className="flex items-center mb-2 cursor-pointer" onClick={handleProfileClick}>
          {/* Lazy-load the profile image */}
          <LazyLoad height={48} once>
            <img
              src={tweet.author?.imageUrl || `https://avatar.iran.liara.run/username?username=${tweet.author?.username || 'default'}`}
              alt={tweet.author?.username || 'Default User'}
              className="w-12 h-12 mr-2 rounded-full"
            />
          </LazyLoad>
          <div className="flex flex-col">
            <span className="font-medium">{tweet.author?.username || 'Unknown User'}</span>
            <span className="text-gray-500 text-xs">{formattedDate}</span>
          </div>
        </div>
        <p className="my-4 font-light">{tweet.content}</p>

        {/* Lazy-load tweet media if present */}
        {tweet.imageUrl && (
          <LazyLoad height={200} once>
            <img
              src={tweet.imageUrl || 'https://via.placeholder.com/40'}
              alt="Tweet media"
              className="w-full h-auto rounded-lg"
            />
          </LazyLoad>
        )}

        <TweetActions setShowComments={setShowComments} tweetId={tweet.id} authorId={authorId} />
        <TweetData tweetId={tweet.id} />
        <CommentsSection tweetId={tweet.id} authorId={authorId} showComments={showComments} />
      </div>
    );
  }
);

TweetCard.displayName = 'TweetCard';
export default TweetCard;
