'use client';
import TweetActions from './TweetActions';
import CommentsSection from './CommentsSection';

interface Comment {
  id: string;
  user: {
    name: string;
    imageUrl: string;
  };
  content: string;
}

interface Tweet {
  id: string;
  user: {
    name: string;
    imageUrl: string;
  };
  content: string;
  imageUrl?: string;
  likes: number;
  retweets: number;
  comments: number;
  commentsList: Comment[];
}

interface TweetCardProps {
  tweet: Tweet;
}

const dummyComments: Comment[] = [
  {
    id: '1',
    user: {
      name: 'Alice',
      imageUrl: 'https://via.placeholder.com/40',
    },
    content: 'Great tweet! Really enjoyed it.',
  },
  {
    id: '2',
    user: {
      name: 'Bob',
      imageUrl: 'https://via.placeholder.com/40',
    },
    content: 'Interesting perspective. Thanks for sharing!',
  },
  {
    id: '3',
    user: {
      name: 'Charlie',
      imageUrl: 'https://via.placeholder.com/40',
    },
    content: 'I disagree with your point. Here’s why...',
  },
];

export default function TweetCard({ tweet }: TweetCardProps) {
  return (
    <div className="w-full border rounded-lg p-4 bg-background">
      <div className="flex items-center mb-2">
        <img
          src={tweet.user.imageUrl}
          alt={tweet.user.name}
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="font-semibold">{tweet.user.name}</span>
      </div>
      
      <p className="mb-2">{tweet.content}</p>
      {tweet.imageUrl && (
        <img
          src={tweet.imageUrl}
          alt="Tweet media"
          className="w-full h-auto rounded-lg"
        />
      )}

      <TweetActions 
        comments={tweet.comments} 
        retweets={tweet.retweets} 
        likes={tweet.likes} 
      />
      
      <CommentsSection comments={dummyComments} />
    </div>
  );
}
