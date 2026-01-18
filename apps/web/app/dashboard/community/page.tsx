"use client";

import { useNavigation } from "@/contexts/navigation-context";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { ThumbsUp, MessageSquare, Plus, Loader2 } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@workspace/ui/components/dialog";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";

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
  reactions: any[]; // Reactions by current user
}

export default function CommunityPage() {
  const { setActiveSection, setActiveSubSection } = useNavigation();
  const { data: session } = useSession();
  
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URI || "http://localhost:4001";

  useEffect(() => {
    setActiveSection("Community");
    setActiveSubSection("Discussions");
    fetchDiscussions();
  }, [setActiveSection, setActiveSubSection, session?.user?.id]);

  const fetchDiscussions = async () => {
    try {
      const res = await fetch(`${backendUrl}/discussions?userId=${session?.user?.id || ''}`);
      if (!res.ok) throw new Error("Failed to search");
      const data = await res.json();
      setDiscussions(data);
    } catch (e) {
      toast.error("Failed to load discussions");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${backendUrl}/discussions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          authorId: session?.user?.id
        }),
      });
      
      if (!res.ok) throw new Error("Failed");
      
      toast.success("Discussion started!", { description: "Your topic is now live." });
      setNewTitle("");
      setNewContent("");
      setIsCreateOpen(false);
      fetchDiscussions();
    } catch (e) {
        toast.error("Failed to create discussion");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleReaction = async (e: React.MouseEvent, id: string, hasReacted: boolean) => {
    e.preventDefault(); // Prevent card click
    if (!session?.user?.id) return toast.error("Please login first");

    // Optimistic Update
    setDiscussions(prev => prev.map(d => {
        if (d.id === id) {
            return {
                ...d,
                _count: { ...d._count, reactions: hasReacted ? d._count.reactions - 1 : d._count.reactions + 1 },
                reactions: hasReacted ? [] : [{ type: 'LIKE' }]
            };
        }
        return d;
    }));

    try {
        await fetch(`${backendUrl}/discussions/reactions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: session.user.id,
                targetId: id,
                targetType: "DISCUSSION",
                type: "LIKE"
            })
        });
    } catch (e) {
        // Revert on failure (could refetch, but silent fail usually ok for likes)
    }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight">Community Discussions</h1>
           <p className="text-muted-foreground mt-1">Connect, ask questions, and share knowledge with peers.</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Discussion
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Start a Discussion</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input 
                            placeholder="What's on your mind?" 
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content</label>
                        <Textarea 
                            placeholder="Elaborate your thoughts..." 
                            className="min-h-[150px]"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreate} disabled={isSubmitting || !newTitle || !newContent}>
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post Discussion"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : discussions.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
            <p>No discussions yet. Be the first to start one!</p>
        </div>
      ) : (
        <div className="grid gap-4">
            {discussions.map((post) => {
                const hasReacted = post.reactions && post.reactions.length > 0;
                return (
                    <Link href={`/dashboard/community/${post.id}`} key={post.id}>
                        <Card className="hover:border-primary/40 transition-colors cursor-pointer group">
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center gap-1 text-muted-foreground min-w-[3rem]">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className={`h-9 w-9 ${hasReacted ? 'text-blue-500 bg-blue-500/10' : 'group-hover:text-foreground'}`}
                                        onClick={(e) => handleReaction(e, post.id, hasReacted)}
                                    >
                                        <ThumbsUp className={`h-4 w-4 ${hasReacted ? 'fill-current' : ''}`} />
                                    </Button>
                                    <span className="text-sm font-medium">{post._count.reactions}</span>
                                </div>
                                
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage src={post.author.imageUrl || undefined} />
                                            <AvatarFallback>{post.author.username?.[0] || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <span>{post.author.username || 'Anonymous'}</span>
                                        <span>•</span>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                                    
                                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                                            <MessageSquare className="h-3.5 w-3.5" /> {post._count.comments} comments
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </div>
      )}
    </div>
  );
}
