'use client';

import { useEffect, useState } from 'react';
import TweetCard from '@/components/TweetCard';
import { Tweet } from '@/types';
import { LoadingSpinner } from '@/components/ui/spinner';
import { useAuth } from '@/context/AuthContext';
import { FiSearch } from 'react-icons/fi';


export default function Explore() {
    const { authorId, loading } = useAuth();
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTweets, setFilteredTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await fetch('/api/tweet');
                if (response.ok) {
                    const tweetsData = await response.json();
                    setTweets(tweetsData);
                    setFilteredTweets(tweetsData);
                } else {
                    console.error('Failed to fetch tweets');
                }
            } catch (error) {
                console.error('Error fetching tweets:', error);
            }
        };

        fetchTweets();
    }, []);

    useEffect(() => {
        const results = tweets.filter(tweet =>
            tweet.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTweets(results);
    }, [searchTerm, tweets]);

    if (loading) {
        return (
            <div className='flex w-full flex-col items-center justify-center h-[90vh]'>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex justify-between w-full px-2 py-4 md:px-24 bg-[#F2F2F2]">
            <div className="bg-white shadow-md rounded-lg h-[10rem] top-20 hidden md:block w-2/5 mr-8">
                <div className="flex flex-col justify-center h-full">
                    <button
                        className="text-left py-2 px-4 font-medium  border-l-4 border-blue-500"
                    >
                        Top
                    </button>
                    <button
                        className="text-left py-2 px-4 font-medium text-gray-500"
                    >
                        Latest
                    </button>
                    <button
                        className="text-left py-2 px-4 font-medium text-gray-500"
                    >
                        People
                    </button>
                    <button
                        className="text-left py-2 px-4 font-medium text-gray-500"
                    >
                        Media
                    </button>
                </div>
            </div>
            <main className="w-full space-y-8">
                <div className="mb-4 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiSearch className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tweets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-24 py-2 border border-gray-300 rounded-lg"
                    />

                </div>
                <div>
                    {filteredTweets.length > 0 ? (
                        filteredTweets.map((tweet) => (
                            <TweetCard key={tweet.id} tweet={tweet} authorId={authorId ?? ''} />
                        ))
                    ) : (
                        <p>No tweets found.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
