'use client';
import { AiOutlineComment, AiOutlineRetweet, AiOutlineLike, AiOutlineSave } from 'react-icons/ai';

interface TweetActionsProps {
  comments: number;
  retweets: number;
  likes: number;
}

export default function TweetActions({ comments, retweets, likes }: TweetActionsProps) {
  return (
    <div className="flex space-x-4 text-muted-foreground">
      <button className="flex items-center gap-1 hover:text-blue-600">
        <AiOutlineComment size={20} />
        {comments}
      </button>
      <button className="flex items-center gap-1 hover:text-blue-600">
        <AiOutlineRetweet size={20} />
        {retweets}
      </button>
      <button className="flex items-center gap-1 hover:text-blue-600">
        <AiOutlineLike size={20} />
        {likes}
      </button>
      <button className="flex items-center gap-1 hover:text-blue-600">
        <AiOutlineSave size={20} />
      </button>
    </div>
  );
}
