import { getNumberOfCommentsOfTweet, getNumberOfLikesOfTweet, getNumberOfRetweetsOfTweet } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Skeleton } from './ui/skeleton'; // Import Skeleton

export default function TweetActions({ tweetId }: { tweetId: string }) {
  const [comments, setComments] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [retweets, setRetweets] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweetData = async () => {
      try {
        const comments = await getNumberOfCommentsOfTweet(tweetId);
        const likes = await getNumberOfLikesOfTweet(tweetId);
        const retweets = await getNumberOfRetweetsOfTweet(tweetId);
        setComments(comments);
        setLikes(likes);
        setRetweets(retweets);
      } catch (error) {
        console.error("Error fetching tweet data:", error);
      } finally {
        setLoading(false); // Data fetching complete
      }
    };
    fetchTweetData();
  }, [tweetId]);

  return (
    <div className="w-full flex items-center justify-end p-1">
      <div className="flex space-x-4">
        <div className="text-gray-600 text-xs font-light">
          {loading ? <Skeleton className="w-12 h-4" /> : <span>{formatNumber(comments ?? 0)} Comments</span>}
        </div>
        <div className="text-gray-600 text-xs font-light">
          {loading ? <Skeleton className="w-12 h-4" /> : <span>{formatNumber(retweets ?? 0)} Retweets</span>}
        </div>
        <div className="text-gray-600 text-xs font-light">
          {loading ? <Skeleton className="w-12 h-4" /> : <span>{formatNumber(likes ?? 0)} Likes</span>}
        </div>
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}
