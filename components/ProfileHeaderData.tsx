import React, { useEffect, useState } from 'react';
import { getUserFollowers } from '@/lib/actions';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import Link from 'next/link';

interface Follower {
  id: string;
  username: string;
  imageUrl?: string | null;
}

interface ProfileHeaderDataProps {
  followersCount: number;
  followingCount: number;
  userId: string;
  loading: boolean;
}

const ProfileHeaderData: React.FC<ProfileHeaderDataProps> = ({ followersCount, followingCount, userId, loading }) => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loadingFollowers, setLoadingFollowers] = useState<boolean>(false);

  useEffect(() => {
    const fetchFollowers = async () => {
      setLoadingFollowers(true);
      try {
        const data = await getUserFollowers(userId);
        console.log('Fetched followers:', data);
        setFollowers(data);
      } catch (error) {
        console.error('Error fetching followers:', error);
      } finally {
        setLoadingFollowers(false);
      }
    };

    if (userId) {
      fetchFollowers();
    }
  }, [userId]);

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
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className="text-md font-semibold">{followingCount}</span>
                <span className="text-gray-500 text-xs">Following</span>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {loadingFollowers ? (
                <div className="p-4">Loading followers...</div>
              ) : (
                <div className="space-y-2">
                  {followers.length === 0 ? (
                    <div>No following</div>
                  ) : (
                    followers.map((follower) => (
                      <Link className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md" key={follower.id} href={`/profile/${follower.id}`}>
                          <img
                            src={follower.imageUrl || `https://avatar.iran.liara.run/username?username=${follower.username}`}
                            alt={follower.username}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{follower.username}</h3>
                          </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  );
};

export default ProfileHeaderData;
