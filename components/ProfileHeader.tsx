"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import ProfileHeaderData from './ProfileHeaderData';
import { AiOutlineEdit } from "react-icons/ai";
import { updateUserBio } from '@/lib/actions';

interface ProfileHeaderProps {
  username: string;
  bio?: string;
  imageUrl: string;
  bannerUrl?: string;
  currentUserId: string;
  profileId: string;
  isFollowing?: boolean | null;
  followersCount?: number;
  followingCount?: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  bio,
  imageUrl,
  bannerUrl,
  currentUserId,
  profileId,
  isFollowing = null,
  followersCount = 0,
  followingCount = 0,
}) => {
  const [localIsFollowing, setLocalIsFollowing] = useState<boolean | null>(isFollowing);
  const [editBio, setEditBio] = useState<string>(bio || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleFollowClick = async () => {
    try {
      await fetch('/api/follow', { method: 'POST', body: JSON.stringify({ followingId: profileId, followerId: currentUserId }) });
      setLocalIsFollowing(prev => !prev);
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  const handleBioSave = async () => {
    try {
      await updateUserBio(profileId, editBio);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full h-48 sm:h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerUrl || 'https://random.imagecdn.app/2000/300'})` }}
      />
      
      <div className="relative flex flex-col md:flex-row justify-center md:justify-between items-center bg-white w-[80%] -mt-12 shadow-lg pb-12 rounded-lg p-5">
        <div className="relative -mt-16">
          <img
            src={imageUrl || `https://avatar.iran.liara.run/username?username=${username}`}
            alt={`${username}'s profile picture`}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white"
          />
        </div>

        <div className="mt-4 md:-mt-4 md:text-left px-5">
          <h1 className="text-2xl font-semibold text-center md:text-left">{username}</h1>
          <p className="text-gray-600 text-center">
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
          loading={false}
        />

        {currentUserId !== profileId && (
          <div className="mt-4 md:-mt-4 md:ml-auto">
            <Button
              onClick={handleFollowClick}
              className={`px-4 py-2 rounded-lg ${localIsFollowing ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            >
              {localIsFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
