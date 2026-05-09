"use client";

import React, { useMemo, useState } from 'react';
import TweetCard from './TweetCard';
import { Tweet } from '@/types';
import { FiSearch } from 'react-icons/fi';

export default function SearchTweets({ tweets, authorId }: { tweets: Tweet[]; authorId?: string }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    return tweets.filter((t) => t.content.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, tweets]);

  return (
    <div className="w-full">
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
        {filtered.length > 0 ? (
          filtered.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} authorId={authorId ?? ''} />
          ))
        ) : (
          <p>No tweets found.</p>
        )}
      </div>
    </div>
  );
}
