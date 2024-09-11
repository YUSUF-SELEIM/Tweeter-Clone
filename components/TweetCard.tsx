import { format } from 'date-fns';
import { Tweet } from '@/types';
import CommentsSection from './CommentsSection';
import TweetActions from './TweetActions';
import TweetData from './TweetData';

export default function TweetCard({ tweet }: { tweet: Tweet }) {
  const formattedDate = format(new Date(tweet.createdAt), "d MMMM 'at' HH:mm");

  return (
    <div className="w-full border rounded-lg p-4 bg-background">
      <div className="flex items-center mb-2">
        <img
          src={tweet.author.imageUrl || `https://avatar.iran.liara.run/username?username=${tweet.author.username}`}
          alt={tweet.author.username}
          className="w-12 h-12  mr-2"
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
      <TweetActions />
      <TweetData
        comments={tweet.comments}
        retweets={tweet.retweets}
        likes={tweet.likes}
      />
      <CommentsSection comments={tweet.commentsList} />
    </div>
  );
}
