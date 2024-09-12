'use client';

import { useEffect, useState } from 'react';
import { getUserInfo } from '@/lib/actions';
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
  const [loadingTweetsAndLikes, setLoadingTweetsAndLikes] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tweets' | 'likes'>('tweets');
  const [tweets, setTweets] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
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

  if (loading) return (
    <div className='flex w-full flex-col items-center justify-center h-[90vh]'>
      <LoadingSpinner />
    </div>
  );

  if (error) return <div>{error}</div>;

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
    <div className="flex flex-col justify-center md:flex-row mt-20 md:gap-8 mx-[5rem]">
      <ProfileActions
        userId={id}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setTweets={setTweets}
        setLikes={setLikes}
        setLoadingTweetsAndLikes={setLoadingTweetsAndLikes}
      />

      {/* Display tweets or likes in the right column on larger screens */}
      <div className="w-full md:w-2/3 mt-4 md:mt-0">
        {loadingTweetsAndLikes ? (
          <div className="w-full h-64 bg-gray-300 animate-pulse rounded-md" />
        ) : (
          <div>
            {activeTab === 'tweets' ? (
              tweets.length > 0 ? (
                tweets.map(tweet => <TweetCard key={tweet.id} tweet={tweet} authorId={authorId ?? ''} />)
              ) : (
                <p>No tweets found.</p>
              )
            ) : (
              likes.length > 0 ? (
                likes.map(like => <TweetCard key={like.id} tweet={like} authorId={authorId ?? ''} />)
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
