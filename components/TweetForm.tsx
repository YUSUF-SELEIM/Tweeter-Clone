'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BsImage } from 'react-icons/bs';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

export default function TweetForm({ authorId }: { authorId: string }) {
  const [tweetContent, setTweetContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetContent(e.target.value);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // Convert the image to a base64 string
      };
      reader.readAsDataURL(file);
    }
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
        <label htmlFor="media-upload" className="cursor-pointer ml-3">
          <BsImage size={16} className="text-blue-600" />
        </label>
        <input
          id="media-upload"
          type="file"
          className="hidden"
          onChange={handleMediaChange}
          disabled={loading}
        />
        <Button onClick={handleTweet} disabled={loading}>
          {loading ? 'Posting...' : 'Tweet'}
        </Button>
      </div>
    </Card>
  );
}
