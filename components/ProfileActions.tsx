import React, { useEffect } from 'react';
import { getUserTweetsAndRetweets, getUserLikedTweets } from '@/lib/actions'; 

interface ProfileActionsProps {
  userId: string; 
  setTweets: any;
  setLikes: any;
  setActiveTab: any;
  activeTab: 'tweets' | 'likes';
  setLoadingTweetsAndLikes: any;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ userId, activeTab,setActiveTab,setTweets , setLikes ,setLoadingTweetsAndLikes}) => {

  useEffect(() => {
    const fetchData = async () => {
        setLoadingTweetsAndLikes(true);
      try {
        if (activeTab === 'tweets') {
          const userTweets = await getUserTweetsAndRetweets(userId);
          setTweets(userTweets);
          console.log("liked "+userTweets);
        } else if (activeTab === 'likes') {
          const userLikes = await getUserLikedTweets(userId);
          userLikes.map((like) => console.log(like));
          console.log("likes "+userLikes);
          setLikes(userLikes);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingTweetsAndLikes(false);
      }
    };

    fetchData();
  }, [activeTab, userId]);

  const handleTabChange = (tab: 'tweets' | 'likes') => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-64 h-[10rem] md:sticky top-20 ">
      <div className="flex flex-col items-center justify-center h-full">
        <button
          onClick={() => handleTabChange('tweets')}
          className={`py-2 px-4 font-medium ${activeTab === 'tweets' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
        >
          Tweets
        </button>
        <button
          onClick={() => handleTabChange('likes')}
          className={`py-2 px-4 font-medium ${activeTab === 'likes' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
        >
          Likes
        </button>
      </div>
    </div>
  );
};

export default ProfileActions;
