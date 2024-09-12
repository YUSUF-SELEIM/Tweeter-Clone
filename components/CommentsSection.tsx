import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Comment } from '@/types';
import { comment, getTweetComments } from '@/lib/actions';
import { format } from 'date-fns';
import CommentActions from './CommentActions';

export default function CommentsSection({ tweetId, authorId, showComments }: { tweetId: string, authorId: string, showComments: boolean }) {
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const commentsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (!showComments) return;

      setLoading(true);
      setError(null);
      try {
        const comments = await getTweetComments(tweetId);
        const commentsWithUser = comments.map(comment => ({
          ...comment,
          user: {
            username: comment.author.username,
            imageUrl: comment.author.imageUrl || 'https://via.placeholder.com/40',
          },
        }));
        setCommentsList(commentsWithUser);
      } catch (err) {
        setError('Error fetching comments. Please try again later.');
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [tweetId, showComments]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('Please write something before commenting!');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await comment(newComment, tweetId, authorId);
      setNewComment('');

      // Refetch comments to update the list
      const updatedComments = await getTweetComments(tweetId);
      const commentsWithUser = updatedComments.map(comment => ({
        ...comment,
        user: {
          username: comment.author.username,
          imageUrl: comment.author.imageUrl || 'https://via.placeholder.com/40',
        },
      }));
      setCommentsList(commentsWithUser);
    } catch (error) {
      setError('Error adding comment. Please try again later.');
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showComments && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showComments]);

  return (
    <>
      {showComments && (
        <div ref={commentsRef} className="flex flex-col mt-2 p-2 sm:p-4">
          <Textarea
            className="w-full border rounded-md text-sm sm:text-base resize-none"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
            disabled={loading}
          />
          <Button className="mt-2 text-xs sm:text-sm" onClick={handleAddComment} disabled={loading}>
            {loading ? 'Posting...' : 'Comment'}
          </Button>

          {loading && <div className="mt-4 text-xs sm:text-sm">Loading comments...</div>}
          {error && <div className="mt-4 text-red-500 text-xs sm:text-sm">{error}</div>}

          {commentsList.length === 0 && !loading && !error && (
            <div className="mt-4 text-gray-500 text-xs sm:text-sm">No comments yet. Be the first to comment!</div>
          )}

          <div className="space-y-2 mt-4 text-xs sm:text-sm">
            {commentsList.map(comment => (
              <div key={comment.id} className="flex flex-col h-full w-full border-b">
                <div  className="flex items-start py-2  space-x-2 ">
                  <img
                    src={comment.user.imageUrl || 'https://via.placeholder.com/40'}
                    alt={comment.user.username}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div className='bg-[#FAFAFA] px-3 py-2 w-full'>
                    <div className="flex justify-between w-full">
                      <span className="font-semibold">{comment.user.username}</span>
                      <span className="text-gray-500 text-xs ml-2">
                        {format(new Date(comment.createdAt), "d MMMM 'at' HH:mm")}
                      </span>
                    </div>
                    <p className='font-light'>{comment.content}</p>
                  </div>
                </div>
                 <CommentActions commentId={comment.id} authorId={authorId} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
