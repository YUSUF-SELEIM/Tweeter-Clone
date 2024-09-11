"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TweetForm from '@/components/TweetForm';
import TweetCard from '@/components/TweetCard';

// Dummy data for tweets (replace with API call)
const dummyTweets = [
  {
    id: '1',
    user: { name: 'John Doe', imageUrl: '/path/to/image.jpg' },
    content: 'This is a tweet!',
    imageUrl: '/path/to/tweet-image.jpg',
    likes: 12,
    retweets: 5,
    comments: 3,
  },
  // Add more dummy tweets here
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState(dummyTweets);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/'); 
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch('/api/auth/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          router.push('/'); 
        } else {
          setLoading(false); // Valid token, stop loading

          // Fetch tweets from API (replace with real API call)
          // const tweetsResponse = await fetch('/api/tweets');
          // const tweetsData = await tweetsResponse.json();
          // setTweets(tweetsData);
        }
      } catch (err) {
        console.error('Error validating token:', err);
        router.push('/');
      }
    };

    validateToken();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full flex-col items-center md:px-80 px-2 py-4 ">
      <TweetForm />

      <div className="w-full mt-6 space-y-4">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
