import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { authorId,content, imageUrl } = await req.json();
  if (!content || !authorId) {
    return NextResponse.json({ error: 'Content and authorId are required' }, { status: 400 });
  }

  try {
    const tweet = await prisma.tweet.create({
      data: {
     
        content,
        imageUrl: imageUrl || null, // Image is optional
        authorId,
      },
    });

    return NextResponse.json(tweet, { status: 200 });
  } catch (error) { 
     console.error('Error creating tweet:', error); 
    return NextResponse.json({ error: 'Failed to create tweet' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tweets = await prisma.tweet.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
        comments: {
          select: {
            id: true,
            author: {
              select: {
                id: true,
                username: true,
                imageUrl: true,
              },
            },
            content: true,
          },
        },
        likes: true,
        retweets: true,
      },
    });
    
    

    return NextResponse.json(tweets, { status: 200 });
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 });
  }
}