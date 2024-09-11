export interface Comment {
    id: string;
    user: {
      username: string; // Ensure this matches
      imageUrl: string;
    };
    content: string;
  }
  
  export interface Tweet {
    id: string;
    content: string;
    imageUrl?: string;
    author: { // Changed from `user` to `author` to match Prisma query
      username: string;
      imageUrl?: string; // Made optional to match Prisma query
    };
    likes: number;
    retweets: number;
    comments: number;
    commentsList: Comment[];
  }
  