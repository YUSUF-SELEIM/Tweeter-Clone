import { useState, useEffect } from 'react';
import { likeAComment, getLikeStatusOfComment, getCommentLikes } from '@/lib/actions';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 
import { Skeleton } from '@/components/ui/skeleton';

export default function CommentActions({ commentId, authorId }: { commentId: string, authorId: string }) {
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [likeStatus, likesCount] = await Promise.all([
          getLikeStatusOfComment(commentId, authorId),
          getCommentLikes(commentId)
        ]);
        setLiked(likeStatus);
        setLikes(likesCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [commentId, authorId]);

  const handleLikeClick = async () => {
    setLoading(true);
    try {
      if (liked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      setLiked(!liked);
      await likeAComment(commentId, authorId);
    } catch (error) {
      console.error('Error liking comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center p-2 ml-8">
      <button 
        onClick={handleLikeClick} 
        className="flex items-center gap-1 text-xs"
        disabled={loading}
      >
        {loading ? (
          <Skeleton className="w-4 h-4 rounded-full" />
        ) : (
          liked ? (
            <AiFillHeart size={14} className="text-red-500" />  
          ) : (
            <AiOutlineHeart size={14} className="text-gray-500" /> 
          )
        )}
        {loading ? (
          <Skeleton className="w-16 h-4 rounded" />
        ) : (
          <>
            <span className="text-gray-500">{liked ? 'Liked' : 'Like'}</span>
            <span className="mx-2">.</span> 
            <span className="text-gray-500">{likes} Likes</span>
          </>
        )}
      </button>
    </div>
  );
}
