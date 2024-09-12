import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { followUser, checkIfFollowing, getNumberOfFollowers, getNumberOfFollowing, updateUserBio } from '@/lib/actions';
import ProfileHeaderData from './ProfileHeaderData';
import { AiOutlineEdit } from "react-icons/ai";

interface ProfileHeaderProps {
  username: string;
  bio?: string;
  imageUrl: string;
  bannerUrl?: string;
  currentUserId: string;
  profileId: string;
}

export default function ProfileHeader({
  username,
  bio,
  imageUrl,
  bannerUrl,
  currentUserId,
  profileId
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [editBio, setEditBio] = useState<string>(bio || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const isFollowingStatus = await checkIfFollowing(profileId, currentUserId);
        setIsFollowing(isFollowingStatus);

        const followers = await getNumberOfFollowers(profileId);
        const following = await getNumberOfFollowing(profileId);

        setFollowersCount(followers);
        setFollowingCount(following);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUserId, profileId]);

  const handleFollowClick = async () => {
    try {
      await followUser(profileId, currentUserId);
      setIsFollowing(prev => prev === true ? false : true);
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  const handleBioSave = async () => {
    try {
      await updateUserBio(profileId, editBio);
      setIsEditing(false);
      // Optionally use window.location.reload() for a full page reload
      window.location.reload();
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {bannerUrl ? (
        <div className="w-full h-48 sm:h-64 bg-cover bg-center" style={{ backgroundImage: `url(${bannerUrl})` }} />
      ) : (
        <div className="w-full h-48 sm:h-64 bg-cover bg-center" style={{ backgroundImage: `url(https://random.imagecdn.app/2000/300)` }} />
      )}

      <div className="relative flex flex-col md:flex-row justify-center md:justify-between items-center bg-white w-[80%] -mt-12 shadow-lg pb-12 rounded-lg p-5">
        <div className="relative -mt-16">
          <img
            src={imageUrl || `https://avatar.iran.liara.run/username?username=${username}`}
            alt={`${username}'s profile picture`}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white"
          />
        </div>

        <div className="mt-4 md:-mt-4 md:text-left px-5">
          <h1 className="text-2xl font-semibold">{username}</h1>
          <p className="text-gray-600">
            {bio}
            {currentUserId === profileId && (
              <Popover open={isEditing} onOpenChange={setIsEditing}>
                <PopoverTrigger>
                  <button className="ml-2 text-blue-500 hover:underline">
                    <AiOutlineEdit className="w-5 h-5 inline" />
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={4}
                    className="w-full p-2 border rounded-md"
                    placeholder="Edit your bio"
                  />
                  <div className="flex justify-end mt-2">
                    <Button onClick={handleBioSave} className="bg-blue-500 text-white">
                      Save
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </p>
        </div>

        <ProfileHeaderData
          followersCount={followersCount}
          followingCount={followingCount}
          loading={loading}
          userId={currentUserId}
        />

        {/* Conditionally render the follow button based on the currentUserId and profileId */}
        {currentUserId !== profileId && (
          <div className="mt-4 md:-mt-4 md:ml-auto">
            {loading ? (
              <div className="w-24 h-8 bg-gray-300 animate-pulse rounded-lg" />
            ) : (
              <Button
                onClick={handleFollowClick}
                className={`px-4 py-2 rounded-lg ${isFollowing ? 'bg-red-500' : 'bg-blue-500'} text-white`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
