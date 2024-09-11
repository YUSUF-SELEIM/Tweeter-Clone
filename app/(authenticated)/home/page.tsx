"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/'); 
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch('/api/auth/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          router.push('/'); 
        } else {
          setLoading(false); // Valid token, stop loading
        }
      } catch (err) {
        console.error('Error validating token:', err);
        router.push('/');
      }
    };

    validateToken();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex  w-full flex-col">
   Home
    </div>
  );
}
