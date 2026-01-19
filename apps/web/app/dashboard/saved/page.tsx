"use client";

import { useNavigation } from "@/contexts/navigation-context";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { DiscussionCard } from "@/components/discussion-card";

interface Discussion {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string | null;
    imageUrl: string | null;
  };
  _count: {
    comments: number;
    reactions: number;
  };
  reactions: any[];
  isSaved?: boolean;
}

export default function SavedPage() {
  const { setActiveSection, setActiveSubSection } = useNavigation();
  const { data: session } = useSession();
  
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URI || "http://localhost:4001";

  useEffect(() => {
    setActiveSection("Resources");
    setActiveSubSection("Saved Items");
    if (session?.user?.id) {
        fetchSavedDiscussions();
    } else {
        setLoading(false);
    }
  }, [setActiveSection, setActiveSubSection, session?.user?.id]);

  const fetchSavedDiscussions = async () => {
    try {
      const res = await fetch(`${backendUrl}/discussions/saved?userId=${session?.user?.id}`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setDiscussions(data);
    } catch (e) {
      toast.error("Failed to load saved items");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToggle = (postId: string, isSaved: boolean) => {
      if (!isSaved) {
          setDiscussions(prev => prev.filter(p => p.id !== postId));
      }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto p-6 space-y-6">
      <div>
         <h1 className="text-3xl font-bold tracking-tight">Saved Items</h1>
         <p className="text-muted-foreground mt-1">Your collection of bookmarked discussions.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : discussions.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
            <p>You haven't saved any items yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
            {discussions.map((post) => (
                <DiscussionCard key={post.id} post={post} onSaveToggle={handleSaveToggle} />
            ))}
        </div>
      )}
    </div>
  );
}
