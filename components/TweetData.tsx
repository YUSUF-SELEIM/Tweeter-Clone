"use client";

export default function TweetActions({ tweet }: { tweet: { comments?: number; likes?: number; retweets?: number } }) {
  const comments = tweet.comments ?? 0;
  const likes = tweet.likes ?? 0;
  const retweets = tweet.retweets ?? 0;

  return (
    <div className="w-full flex items-center justify-end p-1">
      <div className="flex space-x-4">
        <div className="text-gray-600 text-xs font-light">
          <span>{formatNumber(comments)} Comments</span>
        </div>
        <div className="text-gray-600 text-xs font-light">
          <span>{formatNumber(retweets)} Retweets</span>
        </div>
        <div className="text-gray-600 text-xs font-light">
          <span>{formatNumber(likes)} Likes</span>
        </div>
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}
