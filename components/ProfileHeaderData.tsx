import React from 'react';

interface ProfileHeaderDataProps {
  followersCount: number;
  followingCount: number;
  loading: boolean; // Added loading prop
}

const ProfileHeaderData: React.FC<ProfileHeaderDataProps> = ({ followersCount, followingCount, loading }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4 md:-mt-4 md:mx-auto">
      {loading ? (
        <>
          <div className="flex items-center space-x-1">
            <div className="w-12 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-12 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-1">
            <span className="text-md font-semibold">{followersCount}</span>
            <span className="text-gray-500 text-xs">Followers</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-md font-semibold">{followingCount} </span>
            <span className="text-gray-500 text-xs">Following</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileHeaderData;
