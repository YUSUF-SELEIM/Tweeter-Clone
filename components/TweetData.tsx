import { getTweetStats } from "@/lib/actions"; 
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from './ui/skeleton'; 

export default function TweetActions({ tweetId }: { tweetId: string }) {
  const [tweetStats, setTweetStats] = useState<{ comments: number, likes: number, retweets: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTweetData = useCallback(async () => {
    try {
      const { comments, likes, retweets } = await getTweetStats(tweetId); 
      setTweetStats({ comments, likes, retweets });
    } catch (error) {
      console.error("Error fetching tweet data:", error);
      setTweetStats({ comments: 0, likes: 0, retweets: 0 }); // Fallback to zero if error
    } finally {
      setLoading(false); // Stop loading
    }
  }, [tweetId]);

  useEffect(() => {
    fetchTweetData();
  }, [fetchTweetData]);

  return (
    <div className="w-full flex items-center justify-end p-1">
      <div className="flex space-x-4">
        {loading ? (
          <>
            <Skeleton className="w-12 h-4" />
            <Skeleton className="w-12 h-4" />
            <Skeleton className="w-12 h-4" />
          </>
        ) : (
          <>
            <div className="text-gray-600 text-xs font-light">
              <span>{formatNumber(tweetStats?.comments ?? 0)} Comments</span>
            </div>
            <div className="text-gray-600 text-xs font-light">
              <span>{formatNumber(tweetStats?.retweets ?? 0)} Retweets</span>
            </div>
            <div className="text-gray-600 text-xs font-light">
              <span>{formatNumber(tweetStats?.likes ?? 0)} Likes</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}
