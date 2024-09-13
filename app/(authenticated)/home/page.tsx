'use client';
import TweetForm from '@/components/TweetForm';
import TweetCard from '@/components/TweetCard';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { Tweet } from '@/types';
import { LoadingSpinner } from '@/components/ui/spinner';
import Trends from '@/components/TrendsPanel';
import WhoToFollow from '@/components/WhoToFollow';

export default function Home() {
  const { authorId, loading } = useAuth();
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('/api/tweet');
        if (response.ok) {
          const tweetsData = await response.json();
          setTweets(tweetsData);
        } else {
          console.error('Failed to fetch tweets');
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  if (loading) {
    return <div className='flex w-full flex-col items-center justify-center h-[90vh]'>
      <LoadingSpinner />
    </div>;
  }

  return (
    <div className="flex justify-between w-full px-2 py-4 md:px-24 bg-[##F2F2F2]">
      <div className="w-full space-y-8">
        {authorId && <TweetForm authorId={authorId} />}
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} authorId={authorId ?? ''} />
        ))}
      </div>

   <div className="h-full sticky hidden md:block w-2/5 ml-8">
        <Trends />
        <WhoToFollow />
    </div>
    </div>
  );
}
