'use client';

import { useEffect, useState } from 'react';
import { getUserInfo } from '@/lib/actions';
import { LoadingSpinner } from '@/components/ui/spinner';
import ProfileHeader from '@/components/ProfileHeader';
import { useAuth } from "@/context/AuthContext";

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
  const [error, setError] = useState<string | null>(null);

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
    <ProfileHeader
      username={userInfo?.username || ''}
      bio={userInfo?.bio}
      imageUrl={userInfo?.imageUrl || ''}
      bannerUrl={userInfo?.bannerUrl}
      currentUserId={authorId ?? ''} // Pass the current user's ID from useAuth with a default value of an empty string
      profileId={id} // Pass the profile user's ID from URL
    />
  );
}
