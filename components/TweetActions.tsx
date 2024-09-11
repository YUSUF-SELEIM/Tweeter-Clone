import { useState, useEffect } from 'react';
import { AiOutlineComment, AiOutlineRetweet, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton'; // Import Skeleton from ShadCN
import { like, retweet, saveTweet, getLikeStatus, getRetweetStatus, getSaveTweetStatus } from '@/lib/actions'; 

export default function TweetActions({ setShowComments, tweetId, authorId }: { setShowComments: React.Dispatch<React.SetStateAction<boolean>>; tweetId: string; authorId: string }) {
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the initial like, retweet, and save statuses
    const fetchInitialState = async () => {
      try {
        const isLiked = await getLikeStatus(tweetId, authorId); 
        const isRetweeted = await getRetweetStatus(tweetId, authorId); 
        const isSaved = await getSaveTweetStatus(tweetId, authorId);

        setLiked(isLiked);
        setRetweeted(isRetweeted);
        setSaved(isSaved);
      } catch (error) {
        console.error('Error fetching initial state:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialState();
  }, [tweetId, authorId]);

  const handleCommentClick = () => {
    setShowComments(prev => !prev);
  };

  const handleLikeClick = async () => {
    try {
      await like(tweetId, authorId);
      setLiked(prev => !prev);
    } catch (error) {
      console.error('Error liking tweet:', error);
    }
  };

  const handleRetweetClick = async () => {
    try {
      await retweet(tweetId, authorId);
      setRetweeted(prev => !prev);
    } catch (error) {
      console.error('Error retweeting:', error);
    }
  };

  const handleSaveClick = async () => {
    try {
      await saveTweet(tweetId, authorId);
      setSaved(prev => !prev);
    } catch (error) {
      console.error('Error saving tweet:', error);
    }
  };

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
              className={`flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200 ${retweeted ? 'text-green-600' : ''}`}
              onClick={handleRetweetClick}
            >
              <AiOutlineRetweet size={16} className="md:size-8" />
              <span className="hidden sm:inline text-xs">Retweet</span>
            </button>
            <button
              className={`flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200 ${liked ? 'text-red-600' : ''}`}
              onClick={handleLikeClick}
            >
              <AiOutlineHeart size={16} className="md:size-8" />
              <span className="hidden sm:inline text-xs">{liked ? 'Liked' : 'Like'}</span>
            </button>
            <button
              className={`flex items-center justify-center gap-1 w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md transition duration-200 ${saved ? 'text-blue-600' : ''}`}
              onClick={handleSaveClick}
            >
              <AiOutlineStar size={16} className="md:size-8" />
              <span className="hidden sm:inline text-xs">{saved ? 'Saved' : 'Save'}</span>
            </button>
          </>
        )}
      </div>
      <Separator className="my-1" />
    </div>
  );
}
