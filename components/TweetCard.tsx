import { Tweet } from '@/types';
import CommentsSection from './CommentsSection';
import TweetActions from './TweetActions';

export default function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <div className="w-full border rounded-lg p-4 bg-background">
      <div className="flex items-center mb-2">
        {tweet.imageUrl && (
          <img
            src={tweet.author.imageUrl || 'https://via.placeholder.com/40'}
            alt={tweet.author.username}
            className="w-10 h-10 rounded-full mr-2"
          />
        )}
        <span className="font-semibold">{tweet.author.username}</span>
      </div>
      
      <p className="mb-2">{tweet.content}</p>
      {tweet.imageUrl && (
        <img
          src={tweet.imageUrl || 'https://via.placeholder.com/40'}
          alt="Tweet media"
          className="w-full h-auto rounded-lg"
        />
      )}

      <TweetActions 
        comments={tweet.comments} 
        retweets={tweet.retweets} 
        likes={tweet.likes} 
      />
      
      <CommentsSection comments={tweet.commentsList} />
    </div>
  );
}
