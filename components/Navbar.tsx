'use client';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AiFillHome,
  AiFillCompass,
  AiFillBook,
  AiOutlineUser,
  AiOutlineWechat,
  AiOutlineSetting,
  AiOutlineLogout
} from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { getUserInfo } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; 

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <span
        className={`px-4 py-5 text-muted-foreground transition-colors hover:text-foreground ${
          isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
        }`}
      >
        {children}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { authorId } = useAuth(); 
  const router = useRouter();
  const pathname = usePathname();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (authorId) {
        setFetching(true);  // Start fetching
        const data = await getUserInfo(authorId);
        if (data) {
          setUsername(data.username);
          setImageUrl(data.imageUrl);
        }
        setFetching(false);  // End fetching
      }
    };
    fetchUserInfo(); 
  }, [authorId]); 
  
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    router.push('/'); 
  };

  return (
    <>
      <header className="sticky w-full top-0 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
          Tweeter
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-lg font-medium">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/explore">Explore</NavLink>
          <NavLink href="/bookmarks">Bookmarks</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {fetching ? (
                  <Skeleton className="w-8 h-8 rounded-full" />  
                ) : (
                  <img
                    src={imageUrl || `https://avatar.iran.liara.run/username?username=${username}`}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="px-4 py-2 ">
              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2"
                onSelect={() => router.push(`/profile/${authorId}`)}
              >
                <AiOutlineUser size={16} />
                <span>{fetching ? <Skeleton className="w-20 h-4" /> : 'My Profile'}</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2">
                <AiOutlineWechat size={16} />
                <span>Group Chat</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2">
                <AiOutlineSetting size={16} />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center gap-2 text-red-600 hover:bg-red-100 px-3 py-2"
                onSelect={handleLogout}
              >
                <AiOutlineLogout size={16} />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-between bg-background p-4 border-t md:hidden">
        <Link href="/home" className="flex flex-col items-center justify-center text-sm">
          <AiFillHome
            size={24}
            className={`transition-colors ${pathname === '/home' ? 'text-blue-600' : 'text-muted-foreground'}`}
          />
        </Link>
        <Link href="/explore" className="flex flex-col items-center justify-center text-sm">
          <AiFillCompass
            size={24}
            className={`transition-colors ${pathname === '/explore' ? 'text-blue-600' : 'text-muted-foreground'}`}
          />
        </Link>
        <Link href="/bookmarks" className="flex flex-col items-center justify-center text-sm">
          <AiFillBook
            size={24}
            className={`transition-colors ${pathname === '/bookmarks' ? 'text-blue-600' : 'text-muted-foreground'}`}
          />
        </Link>
      </nav>
    </>
  );
}
