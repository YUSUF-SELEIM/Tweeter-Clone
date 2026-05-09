"use client";

import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileActions from './ProfileActions';
import TweetCard from './TweetCard';
import { useAuth } from '@/context/AuthContext';
import { Tweet } from '@/types';

export default function ProfileClient({
  userInfo,
  tweets,
  likes,
  followersCount,
  followingCount,
  isFollowing,
  profileId,
}: {
  userInfo: { username: string; bio: string; imageUrl: string; bannerUrl?: string } | null;
  tweets: Tweet[];
  likes: Tweet[];
  followersCount: number;
  followingCount: number;
  isFollowing: boolean | null;
  profileId: string;
}) {
  const { authorId } = useAuth();
  const [activeTab, setActiveTab] = useState<'tweets' | 'likes'>('tweets');

  return (
    <div>
      <ProfileHeader
        username={userInfo?.username || ''}
        bio={userInfo?.bio}
        imageUrl={userInfo?.imageUrl || ''}
        bannerUrl={userInfo?.bannerUrl}
        currentUserId={authorId ?? ''}
        profileId={profileId}
        isFollowing={isFollowing}
        followersCount={followersCount}
        followingCount={followingCount}
      />

      <div className="flex flex-col justify-center md:flex-row mt-20 md:gap-8 md:mx-[5rem]">
        <ProfileActions activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="w-full md:w-2/3 mt-4 md:mt-0">
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
        </div>
      </div>
    </div>
  );
}
