/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { getUserSavedTweets } from "@/lib/actions";
import TweetCard from "@/components/TweetCard";

export default function Bookmarks({ params }: { params: { id: string } }) {
  const { id } = params;
  const [savedTweets, setSavedTweets] = useState<any[]>([]);

  useEffect(() => {
    const fetchSavedTweets = async () => {
      try {
        const data = await getUserSavedTweets(id);
        setSavedTweets(data);
      } catch (error) {
        console.error("Error fetching saved tweets:", error);
      }
    };

    fetchSavedTweets();
  }, [id]);

  if (!savedTweets) return <div>Loading...</div>;

  return (
    <div className="flex justify-between w-full px-2 py-4 md:px-24 bg-[#F2F2F2]">
      <div className="sticky bg-white shadow-md rounded-lg h-[10rem] top-20 hidden md:block w-2/5 mr-8">
        <div className="flex flex-col justify-center h-full">
          <button className="text-left py-2 px-4 font-medium  border-l-4 border-blue-500">
            Top
          </button>
          <button className="text-left py-2 px-4 font-medium text-gray-500">
            Latest
          </button>
          <button className="text-left py-2 px-4 font-medium text-gray-500">
            People
          </button>
          <button className="text-left py-2 px-4 font-medium text-gray-500">
            Media
          </button>
        </div>
      </div>
      <div className="w-full space-y-8">
        {savedTweets.length === 0 && <div>No saved tweets</div>}
        {savedTweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} authorId={tweet.author.id} />
        ))}
      </div>
    </div>
  );
}
