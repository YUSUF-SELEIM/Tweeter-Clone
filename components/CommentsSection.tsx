'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input'; 

import { Textarea } from '@/components/ui/textarea'; 


interface Comment {
  id: string;
  user: {
    name: string;
    imageUrl: string;
  };
  content: string;
}

interface CommentsSectionProps {
  comments: Comment[];
}

export default function CommentsSection({ comments }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState<Comment[]>(comments);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObject: Comment = {
      id: (commentsList.length + 1).toString(), // Simple ID generation
      user: {
        name: 'LoggedInUser', // Replace with actual logged-in user info
        imageUrl: 'https://via.placeholder.com/40', // Replace with actual user image URL
      },
      content: newComment,
    };

    setCommentsList(prev => [...prev, newCommentObject]);
    setNewComment('');
  };

  return (
    <div className="mt-4 space-y-4">
        <Textarea
          className="w-full h-fit px-2 border rounded-lg resize-none"
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentChange}
        />
        {/* <Button onClick={handleAddComment}>Add Comment</Button> */}

      <div className="space-y-2">
        {commentsList.map(comment => (
          <div key={comment.id} className="flex items-start space-x-2 border-b py-2">
            <img
              src={comment.user.imageUrl}
              alt={comment.user.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <span className="font-semibold">{comment.user.name}</span>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
