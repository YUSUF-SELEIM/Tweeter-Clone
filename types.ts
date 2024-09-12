export interface Comment {
    id: string;
    user: {
      username: string;
      imageUrl: string;
    };
    content: string;
    createdAt: Date;
  }
  
  export interface Tweet {
    id: string;
    content: string;
    imageUrl?: string;
    author: {
      username: string;
      imageUrl?: string;
    };
    likes: number;
    retweets: number;
    comments: number;
    commentsList: Comment[];
    createdAt: string;
  }
  