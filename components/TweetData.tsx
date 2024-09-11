interface TweetActionsProps {
    comments: number;
    retweets: number;
    likes: number;
  }
  
  export default function TweetActions({ comments, retweets, likes }: TweetActionsProps) {
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
  