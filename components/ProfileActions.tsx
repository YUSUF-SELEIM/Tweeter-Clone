import React, { useEffect } from 'react';
import { getUserTweetsAndRetweets, getUserLikedTweets } from '@/lib/actions';

interface ProfileActionsProps {
  userId: string;
  setTweets: React.Dispatch<React.SetStateAction<unknown[]>>;
  setLikes: React.Dispatch<React.SetStateAction<unknown[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<'tweets' | 'likes'>>;
  activeTab: 'tweets' | 'likes';
  setLoadingTweetsAndLikes: React.Dispatch<React.SetStateAction<boolean>>; // Fixed type
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ userId, activeTab, setActiveTab, setTweets, setLikes, setLoadingTweetsAndLikes }) => {

  useEffect(() => {
    const fetchData = async () => {
      setLoadingTweetsAndLikes(true);
      try {
        if (activeTab === 'tweets') {
          const userTweets = await getUserTweetsAndRetweets(userId);
          setTweets(userTweets);
        } else if (activeTab === 'likes') {
          const userLikes = await getUserLikedTweets(userId);
          userLikes.map((like) => console.log(like));
          setLikes(userLikes);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingTweetsAndLikes(false);
      }
    };

    fetchData();
  }, [activeTab, userId, setTweets, setLikes, setLoadingTweetsAndLikes]);

  const handleTabChange = (tab: 'tweets' | 'likes') => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white shadow-md rounded-lg w-full md:w-64 h-[10rem] md:sticky top-20">
      <div className="flex flex-col justify-center h-full w-full">
        <button
          onClick={() => handleTabChange('tweets')}
          className={`py-2 px-4 font-medium ${activeTab === 'tweets' ? 'border-l-4 border-blue-500' : 'text-gray-500'}`}
        >
          Tweets
        </button>
        <button
          onClick={() => handleTabChange('likes')}
          className={`py-2 px-4 font-medium ${activeTab === 'likes' ? 'border-l-4 border-blue-500' : 'text-gray-500'}`}
        >
          Likes
        </button>
      </div>
    </div>
  );
};

export default ProfileActions;
