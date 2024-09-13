/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { getUserInfo, getUserTweetsAndRetweets, getUserLikedTweets } from '@/lib/actions';
import { LoadingSpinner } from '@/components/ui/spinner';
import ProfileHeader from '@/components/ProfileHeader';
import { useAuth } from "@/context/AuthContext";
import ProfileActions from '@/components/ProfileActions';
import TweetCard from '@/components/TweetCard';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { authorId } = useAuth(); // Get current user's ID from context

  const [userInfo, setUserInfo] = useState<{
    username: string;
    bio: string;
    imageUrl: string;
    bannerUrl: string;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTweetsAndLikes, setLoadingTweetsAndLikes] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tweets' | 'likes'>('tweets');

  const [tweets, setTweets] = useState<any[]>([]); 
  const [likes, setLikes] = useState<any[]>([]);   
  const [hasFetchedTweets, setHasFetchedTweets] = useState<boolean>(false);  
  const [hasFetchedLikes, setHasFetchedLikes] = useState<boolean>(false);    

  // Fetch user info once
  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        if (id) {
          const data = await getUserInfo(id);
          if (data) {
            setUserInfo({
              username: data.username,
              bio: data.bio || '',
              imageUrl: data.imageUrl || '',
              bannerUrl: data.bannerUrl || '',
            });
          }
        } else {
          setError('User not found');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [id]);

  // Conditionally fetch tweets or likes based on the active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoadingTweetsAndLikes(true);
      try {
        if (activeTab === 'tweets' && !hasFetchedTweets) {
          const userTweets = await getUserTweetsAndRetweets(id);
          setTweets(userTweets);
          setHasFetchedTweets(true); // Mark tweets as fetched
        } else if (activeTab === 'likes' && !hasFetchedLikes) {
          const userLikes = await getUserLikedTweets(id);
          setLikes(userLikes);
          setHasFetchedLikes(true); // Mark likes as fetched
        }
      } catch (error) {
        console.error('Error fetching tweets/likes:', error);
      } finally {
        setLoadingTweetsAndLikes(false);
      }
    };

    fetchData();
  }, [activeTab, id, hasFetchedTweets, hasFetchedLikes]);

  // If still loading the user info, show spinner
  if (loading) {
    return (
      <div className='flex w-full flex-col items-center justify-center h-[90vh]'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ProfileHeader
        username={userInfo?.username || ''}
        bio={userInfo?.bio}
        imageUrl={userInfo?.imageUrl || ''}
        bannerUrl={userInfo?.bannerUrl}
        currentUserId={authorId ?? ''} // Pass the current user's ID from useAuth with a default value of an empty string
        profileId={id} // Pass the profile user's ID from URL
      />

      {/* Layout with ProfileActions on the left on md+ screens */}
      <div className="flex flex-col justify-center md:flex-row mt-20 md:gap-8 md:mx-[5rem]">
        <ProfileActions
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Display tweets or likes based on active tab */}
        <div className="w-full md:w-2/3 mt-4 md:mt-0">
          {loadingTweetsAndLikes ? (
            <div className="w-full h-64 bg-gray-300 animate-pulse rounded-md" />
          ) : (
            <div>
              {activeTab === 'tweets' ? (
                tweets.length > 0 ? (
                  tweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} authorId={authorId ?? ''} />)
                ) : (
                  <p>No tweets found.</p>
                )
              ) : (
                likes.length > 0 ? (
                  likes.map((like) => <TweetCard key={like.id} tweet={like} authorId={authorId ?? ''} />)
                ) : (
                  <p>No likes found.</p>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
