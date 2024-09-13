import React from 'react';
import { Separator } from './ui/separator';

interface Trend {
  hashtag: string;
  tweetCount: number;
}

const trends: Trend[] = [
  { hashtag: '#Programming', tweetCount: 221312 },
  { hashtag: '#JavaScript', tweetCount: 183092 },
  { hashtag: '#ReactJS', tweetCount: 132881 },
  { hashtag: '#TypeScript', tweetCount: 105999 },
  { hashtag: '#NextJS', tweetCount: 87012 },
];

export default function Trends() {
  return (
    <div className="top-20 w-full md:w-64 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-sm font-semibold ">Trends for you</h2>
      <Separator className="my-2 mb-4" />
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex flex-col space-y-2 justify-between">
            <div className="font-medium">{trend.hashtag}</div>
            <div className="text-gray-500 text-xs">{`${trend.tweetCount.toLocaleString()} Tweets`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
