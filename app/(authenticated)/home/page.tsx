'use client';

import TweetForm from '@/components/TweetForm';
import TweetCard from '@/components/TweetCard';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { Tweet } from '@/types';
import { LoadingSpinner } from '@/components/ui/spinner';

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
    <div className="flex w-full flex-col items-center md:px-80 px-2 py-4 bg-[##F2F2F2]">
      {authorId && <TweetForm authorId={authorId} />}

      <div className="w-full mt-6 space-y-8">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} authorId={authorId ?? ''} />
        ))}
      </div>
    </div>
  );
}
