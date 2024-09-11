import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; 
import { Textarea } from '@/components/ui/textarea'; 
import { Comment } from '@/types';

interface CommentsSectionProps {
  comments: Comment[];
}

export default function CommentsSection({ comments }: CommentsSectionProps) {  
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState<Comment[]>(comments || []); 

  useEffect(() => {
    setCommentsList(comments || []);
  }, [comments]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
   console.log('Adding comment:', newComment);
  };

  return (
    <div className="mt-4 space-y-4">
      <Textarea
        className="w-full h-fit px-2 border rounded-lg resize-none"
        placeholder="Add a comment..."
        value={newComment}
        onChange={handleCommentChange}
      />
      <Button onClick={handleAddComment}>Add Comment</Button>

      <div className="space-y-2">
        {commentsList.length > 0 ? ( 
          commentsList.map(comment => (
            <div key={comment.id} className="flex items-start space-x-2 border-b py-2">
              <img
                src={comment.user.imageUrl || 'https://via.placeholder.com/40'} 
                alt={comment.user.username}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <span className="font-semibold">{comment.user.username}</span>
                <p>{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
