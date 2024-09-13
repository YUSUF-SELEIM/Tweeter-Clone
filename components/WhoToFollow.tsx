import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllUsers, followUser, checkIfFollowing } from '@/lib/actions';
import Image from 'next/image';
import { Button } from './ui/button';
import { useAuth } from '@/context/AuthContext';

interface User {
    id: string;
    username: string;
    bio: string | null;
    imageUrl?: string | null;
}

export default function WhoToFollow() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { authorId } = useAuth();
    const router = useRouter();

    const [followingState, setFollowingState] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const fetchedUsers = await getAllUsers();

                // Exclude the current user from the list
                const filteredUsers = fetchedUsers.filter(user => user.id !== authorId);

                // Check if the current user is following any of the remaining users
                const followingStatusPromises = filteredUsers.map(user =>
                    checkIfFollowing(user.id, authorId ?? '')
                );
                const followingStatuses = await Promise.all(followingStatusPromises);

                // Set following states for users
                const updatedFollowingState = filteredUsers.reduce((acc, user, index) => {
                    acc[user.id] = followingStatuses[index];
                    return acc;
                }, {} as Record<string, boolean>);

                setUsers(filteredUsers);
                setFollowingState(updatedFollowingState);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        if (authorId) {
            fetchUsers();
        }
    }, [authorId]);

    const handleFollowClick = async (userId: string) => {
        try {
            await followUser(userId, authorId ?? '');
            setFollowingState(prevState => ({
                ...prevState,
                [userId]: !prevState[userId],
            }));
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
        }
    };

    const handleUserClick = (userId: string) => {
        router.push(`/profile/${userId}`); // Navigate to the user's profile
    };

    return (
        <div className="top-20 w-full md:w-64 bg-white shadow-lg rounded-lg p-4 mt-8">
            <h2 className="text-xl font-semibold mb-4">Who to follow</h2>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="space-y-4">
                    {users.slice(0, 3).map(user => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => handleUserClick(user.id)}
                        >
                            <div className="flex items-center space-x-3">
                                <Image
                                    src={user.imageUrl || `https://avatar.iran.liara.run/username?username=${user.username}`}
                                    alt={user.username}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <div>
                                    <h1 className="font-medium text-left">{user.username}</h1>
                                    <p className="text-gray-600 text-[0.6rem]">
                                        {user.bio}
                                    </p>
                                </div>
                            </div>
                            <Button
                                className={`text-sm mt-2 px-2 py-2 rounded-lg ${followingState[user.id] ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the user click event
                                    handleFollowClick(user.id);
                                }}
                            >
                                {followingState[user.id] ? 'Unfollow' : 'Follow'}
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
