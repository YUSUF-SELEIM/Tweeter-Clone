import { format } from 'date-fns';
import { Tweet } from '@/types';
import CommentsSection from './CommentsSection';
import TweetActions from './TweetActions';
import TweetData from './TweetData';
import { useState, forwardRef } from 'react';
import { useRouter } from 'next/navigation'; 

const TweetCard = forwardRef<HTMLDivElement, { tweet: Tweet, authorId: string }>(
  ({ tweet, authorId }, ref) => {
    const [showComments, setShowComments] = useState(false);
    const formattedDate = format(new Date(tweet.createdAt), "d MMMM 'at' HH:mm");
    const router = useRouter(); 

    const handleProfileClick = () => {
      router.push(`/profile/${tweet.author.id}`);
    };

    return (
      <div ref={ref} className="w-full border rounded-lg p-4 bg-background mb-6">
        <div className="flex items-center mb-2 cursor-pointer" onClick={handleProfileClick}>
          <img
            src={tweet.author.imageUrl || `https://avatar.iran.liara.run/username?username=${tweet.author.username}`}
            alt={tweet.author.username}
            className="w-12 h-12 mr-2"
          />
          <div className='flex flex-col'>
            <span className="font-medium">{tweet.author.username}</span>
            <span className="text-gray-500 text-xs">{formattedDate}</span>
          </div>
        </div>
        <p className="my-4 font-light">{tweet.content}</p>
        {tweet.imageUrl && (
          <img
            src={tweet.imageUrl || 'https://via.placeholder.com/40'}
            alt="Tweet media"
            className="w-full h-auto rounded-lg"
          />
        )}
        <TweetActions setShowComments={setShowComments} tweetId={tweet.id} authorId={authorId}/>
        <TweetData tweetId={tweet.id}/>
        <CommentsSection tweetId={tweet.id} authorId={authorId} showComments={showComments} />
      </div>
    );
  }
);

TweetCard.displayName = 'TweetCard';
export default TweetCard;
