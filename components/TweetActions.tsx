import { AiOutlineComment, AiOutlineRetweet, AiOutlineLike, AiOutlineSave } from 'react-icons/ai';
import { Separator } from './ui/separator';
import React from 'react';

export default function TweetActions({ setShowComments }: { setShowComments: React.Dispatch<React.SetStateAction<boolean>>; }) {
  const handleCommentClick = () => {
    setShowComments(prev => !prev);
  };

  return (
    <div className="w-full flex flex-col">
      <Separator className="my-1" />
      <div className="flex w-full gap-1">
        <button
          className="flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200"
          onClick={handleCommentClick}
        >
          <AiOutlineComment size={16} className=" md:size-8" />
          <span className="hidden sm:inline text-xs">Comments</span>
        </button>
        <button className="flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200">
          <AiOutlineRetweet size={16} className=" md:size-8" />
          <span className="hidden sm:inline text-xs">Retweet</span>
        </button>
        <button className="flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200">
          <AiOutlineLike size={16} className=" md:size-8" />
          <span className="hidden sm:inline text-xs">Like</span>
        </button>
        <button className="flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200">
          <AiOutlineSave size={16} className=" md:size-8" />
          <span className="hidden sm:inline text-xs">Save</span>
        </button>
      </div>
      <Separator className="my-1" />
    </div>
  );
}
