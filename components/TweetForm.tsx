'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BsImage } from 'react-icons/bs';
import { FaGlobe } from 'react-icons/fa'; // Earth icon
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'; // Adjust path as necessary
import { IoMdPerson } from 'react-icons/io'; // Person icon

export default function TweetForm({ authorId }: { authorId: string }) {
  const [tweetContent, setTweetContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [replyOption, setReplyOption] = useState<'everyone' | 'following'>('everyone');

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetContent(e.target.value);
  };

  const handleMediaChange = () => {
    // Handle media change logic here
  };

  const handleTweet = async () => {
    if (!tweetContent.trim()) {
      alert('Please write something before tweeting!');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        authorId,
        content: tweetContent,
        imageUrl,
        replyOption, // Include the reply option in the payload
      };

      const response = await fetch('/api/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setTweetContent('');
        setImageUrl(null);
        console.log('Tweet successfully created');
        location.reload();
      } else {
        console.error('Failed to create tweet');
      }
    } catch (error) {
      console.error('Error creating tweet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full border rounded-lg p-4 bg-background">
      <h2 className="text-sm font-semibold">Tweet something</h2>
      <Separator className="my-2" />
      <Textarea
        placeholder="What's happening?"
        value={tweetContent}
        onChange={handleTweetChange}
        className="w-full h-24 mb-2 resize-none"
        disabled={loading}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label htmlFor="media-upload" className="cursor-pointer">
            <BsImage size={16} className="text-blue-600" />
          </label>
          <input
            id="media-upload"
            type="file"
            className="hidden"
            onChange={handleMediaChange}
            disabled={loading}
          />
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center cursor-pointer">
                <FaGlobe size={16} className="text-blue-600" />
                <span className="ml-1 text-blue-600">{replyOption === 'everyone' ? 'Everyone can reply' : 'People you follow can reply'}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-2 bg-white border border-gray-300 rounded-md shadow-lg">
              <div className='font-semibold text-gray-600'>Who Can Reply?</div>
              <div className='text-gray-600 text-sm font-light mb-2'>Choose who can reply to this tweet.</div>
              <div className="flex flex-col">
                <button
                  onClick={() => setReplyOption('everyone')}
                  className={`flex items-center p-2 rounded-md mb-1 hover:bg-gray-200 ${replyOption === 'everyone' ? 'bg-gray-100' : ''}`}
                >
                  <FaGlobe className="mr-2 text-gray-600" />
                  <div className="text-gray-600">Everyone</div>
                </button>
                <button
                  onClick={() => setReplyOption('following')}
                  className={`flex items-center p-2 rounded-md hover:bg-gray-200 ${replyOption === 'following' ? 'bg-gray-100' : ''}`}
                >
                  <IoMdPerson className="mr-2 text-gray-600" />
                  <div className="text-gray-600">People you follow</div>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={handleTweet} disabled={loading}>
          {loading ? 'Posting...' : 'Tweet'}
        </Button>
      </div>
    </Card>
  );
}
