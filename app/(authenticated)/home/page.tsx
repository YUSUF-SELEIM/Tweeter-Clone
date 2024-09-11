"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TweetForm from '@/components/TweetForm';
import TweetCard from '@/components/TweetCard';
import { jwtDecode } from 'jwt-decode';
import { Tweet } from '@/types';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [authorId, setAuthorId] = useState<string | null>(null); 

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
          const decodedToken: { userId: string } = jwtDecode(token);
          setAuthorId(decodedToken.userId); // Set the userId from the token

          // Fetch tweets from the API
          const tweetsResponse = await fetch('/api/tweet');
          if (tweetsResponse.ok) {
            const tweetsData = await tweetsResponse.json();
            setTweets(tweetsData);
          } else {
            console.error('Failed to fetch tweets');
          }
        }
      } catch (err) {
        console.error('Error validating token:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full flex-col items-center md:px-80 px-2 py-4">
      {authorId && <TweetForm authorId={authorId} />}

      <div className="w-full mt-6 space-y-4">
        {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
