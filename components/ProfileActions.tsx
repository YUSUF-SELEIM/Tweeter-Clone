import React from 'react';

interface ProfileActionsProps {
  activeTab: 'tweets' | 'likes';
  setActiveTab: React.Dispatch<React.SetStateAction<'tweets' | 'likes'>>;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white shadow-md rounded-lg w-full md:w-64 h-[10rem] md:sticky top-20">
      <div className="flex flex-col justify-center h-full w-full ">
        <button
          onClick={() => setActiveTab('tweets')}
          className={`text-left py-2 px-4 font-medium ${activeTab === 'tweets' ? 'border-l-4 border-blue-500' : 'text-gray-500'}`}
        >
          Tweets
        </button>
        <button
          className="text-left py-2 px-4 font-medium text-gray-500"
        >
          Tweets & replies
        </button>
        <button
          className="text-left py-2 px-4 font-medium text-gray-500"
        >
          Media
        </button>
        <button
          onClick={() => setActiveTab('likes')}
          className={`text-left py-2 px-4 font-medium ${activeTab === 'likes' ? 'border-l-4 border-blue-500' : 'text-gray-500'}`}
        >
          Likes
        </button>
      </div>
    </div>
  );
};

export default ProfileActions;
