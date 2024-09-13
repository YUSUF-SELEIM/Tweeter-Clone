import { useState, useEffect, useCallback } from 'react';
import { AiOutlineComment, AiOutlineRetweet, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton'; 
import { like, retweet, saveTweet, getLikeStatus, getRetweetStatus, getSaveTweetStatus } from '@/lib/actions'; 

export default function TweetActions({ setShowComments, tweetId, authorId }: { setShowComments: React.Dispatch<React.SetStateAction<boolean>>; tweetId: string; authorId: string }) {
  const [statuses, setStatuses] = useState({
    liked: false,
    retweeted: false,
    saved: false,
  });
  const [loading, setLoading] = useState(true);

  // Concurrently fetch the initial like, retweet, and save statuses
  const fetchInitialState = useCallback(async () => {
    try {
      const [isLiked, isRetweeted, isSaved] = await Promise.all([
        getLikeStatus(tweetId, authorId),
        getRetweetStatus(tweetId, authorId),
        getSaveTweetStatus(tweetId, authorId),
      ]);
      
      setStatuses({ liked: isLiked, retweeted: isRetweeted, saved: isSaved });
    } catch (error) {
      console.error('Error fetching initial state:', error);
    } finally {
      setLoading(false);
    }
  }, [tweetId, authorId]);

  useEffect(() => {
    fetchInitialState();
  }, [fetchInitialState]);

  const handleCommentClick = useCallback(() => {
    setShowComments(prev => !prev);
  }, [setShowComments]);

  const handleLikeClick = useCallback(async () => {
    try {
      await like(tweetId, authorId);
      setStatuses(prev => ({ ...prev, liked: !prev.liked }));
    } catch (error) {
      console.error('Error liking tweet:', error);
    }
  }, [tweetId, authorId]);

  const handleRetweetClick = useCallback(async () => {
    try {
      await retweet(tweetId, authorId);
      setStatuses(prev => ({ ...prev, retweeted: !prev.retweeted }));
    } catch (error) {
      console.error('Error retweeting tweet:', error);
    }
  }, [tweetId, authorId]);

  const handleSaveClick = useCallback(async () => {
    try {
      await saveTweet(tweetId, authorId);
      setStatuses(prev => ({ ...prev, saved: !prev.saved }));
    } catch (error) {
      console.error('Error saving tweet:', error);
    }
  }, [tweetId, authorId]);

  return (
    <div className="w-full flex flex-col">
      <Separator className="my-1" />
      <div className="flex w-full gap-1">
        {loading ? (
          <>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
          </>
        ) : (
          <>
            <button
              className="flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200"
              onClick={handleCommentClick}
            >
              <AiOutlineComment size={16} className="md:size-8" />
              <span className="hidden sm:inline text-xs">Comments</span>
            </button>
            <button
              className={`flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200 ${statuses.retweeted ? 'text-green-600' : ''}`}
              onClick={handleRetweetClick}
            >
              <AiOutlineRetweet size={16} className="md:size-8" />
              <span className="hidden sm:inline text-xs">Retweet</span>
            </button>
            <button
              className={`flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200 ${statuses.liked ? 'text-red-600' : ''}`}
              onClick={handleLikeClick}
            >
              <AiOutlineHeart size={16} className="md:size-8" />
              <span className="hidden sm:inline text-xs">{statuses.liked ? 'Liked' : 'Like'}</span>
            </button>
            <button
              className={`flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200 ${statuses.saved ? 'text-blue-600' : ''}`}
              onClick={handleSaveClick}
            >
              <AiOutlineStar size={16} className="md:size-8" />
              <span className="hidden sm:inline text-xs">{statuses.saved ? 'Saved' : 'Save'}</span>
            </button>
          </>
        )}
      </div>
      <Separator className="my-1" />
    </div>
  );
}
