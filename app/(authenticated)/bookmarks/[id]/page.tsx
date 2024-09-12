'use client'
import { useEffect, useState } from 'react';
import { getUserSavedTweets } from '@/lib/actions';
import TweetCard from '@/components/TweetCard';

export default function Bookmarks({ params }: { params: { id: string } }) {
  const { id } = params;
  const [savedTweets, setSavedTweets] =  useState<any[]>([]);

  useEffect(() => {
    const fetchSavedTweets = async () => {
      try {
        const data = await getUserSavedTweets(id);
        setSavedTweets(data);
      } catch (error) {
        console.error('Error fetching saved tweets:', error);
      }
    };

    fetchSavedTweets();
  }, [id]);

  if (!savedTweets) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col items-center md:px-80 px-2 py-4 bg-[##F2F2F2]">
      {savedTweets.length === 0 && <div>No saved tweets</div>}
      {savedTweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          authorId={tweet.author.id}
        />
      ))}
    </div>
  );
}
