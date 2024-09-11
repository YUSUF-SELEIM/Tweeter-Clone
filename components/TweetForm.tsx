'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BsImage } from 'react-icons/bs';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

export default function TweetForm() {
  const [tweetContent, setTweetContent] = useState('');
  const [media, setMedia] = useState<File | null>(null);

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetContent(e.target.value);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMedia(e.target.files[0]);
    }
  };

  const handleTweet = () => {
    // Add tweet submission logic here
    console.log('Tweet:', tweetContent);
    if (media) console.log('Media:', media.name);
    setTweetContent('');
    setMedia(null);
  };

  return (
    <Card className="w-full border rounded-lg p-4 bg-background">
        <h2 className="text-sm font-semibold mb-2">Tweet something</h2>
        <Separator className="my-4" />

      <Textarea
        placeholder="What's happening?"
        value={tweetContent}
        onChange={handleTweetChange}
        className="w-full h-24 mb-2 resize-none"
      />
      <div className="flex items-center justify-between">
        <label htmlFor="media-upload" className="cursor-pointer ml-3">
          <BsImage size={16} className='text-blue-600'/>
        </label>
        <input
          id="media-upload"
          type="file"
          className="hidden"
          onChange={handleMediaChange}
        />
        <Button onClick={handleTweet}>Tweet</Button>
      </div>
    </Card>
  );
}
