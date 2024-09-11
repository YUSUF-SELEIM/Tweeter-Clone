'use client';
import { AiOutlineComment, AiOutlineRetweet, AiOutlineLike, AiOutlineSave } from 'react-icons/ai';
import { Separator } from './ui/separator';

export default function TweetActions() {
  return (
    <div className="w-full flex flex-col">
      <Separator className="my-1" />
      <div className="flex w-full">
        <button className="flex items-center justify-center gap-1 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition duration-200">
          <AiOutlineComment size={20} />
          <span>Comments</span>
        </button>
        <button className="flex items-center justify-center gap-1 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition duration-200">
          <AiOutlineRetweet size={20} />
          <span>Retweet</span>
        </button>
        <button className="flex items-center justify-center gap-1 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition duration-200">
          <AiOutlineLike size={20} />
          <span>Like</span>
        </button>
        <button className="flex items-center justify-center gap-1 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition duration-200">
          <AiOutlineSave size={20} />
          <span>Save</span>
        </button>
      </div>
      <Separator className="my-1" />

    </div>
  );
}
