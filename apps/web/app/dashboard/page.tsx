"use client";

import { useNavigation } from "@/contexts/navigation-context";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
import {
  ChevronDownIcon,
  VideoIcon,
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
  UserPlusIcon,
  MessageSquareIcon,
  BellIcon,
} from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  date: Date;
  type: "anonymous" | "exposed" | "scheduled";
  participants?: number;
  status?: "upcoming" | "completed" | "cancelled";
}

interface ActivityItem {
  id: string;
  type: "meeting" | "connection" | "message" | "system";
  title: string;
  description: string;
  timestamp: Date;
  icon: "video" | "user" | "message" | "bell" | "check" | "x";
  status?: "success" | "error" | "info";
}

export default function Page() {
  const { activeSection, activeSubSection } = useNavigation();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  // Mock data for upcoming meetings
  const upcomingMeetings: Meeting[] = [
    {
      id: "1",
      title: "Team Sync",
      date: new Date(2025, 11, 16, 10, 0),
      type: "scheduled",
      participants: 5,
      status: "upcoming",
    },
    {
      id: "2",
      title: "Quick Connect",
      date: new Date(2025, 11, 16, 14, 30),
      type: "anonymous",
      participants: 2,
      status: "upcoming",
    },
    {
      id: "3",
      title: "Client Review",
      date: new Date(2025, 11, 17, 15, 0),
      type: "exposed",
      participants: 3,
      status: "upcoming",
    },
  ];

  // Mock activity feed data
  const recentActivity: ActivityItem[] = [
    {
      id: "1",
      type: "meeting",
      title: "Meeting completed",
      description: "Team Sync with 5 participants completed successfully",
      timestamp: new Date(2025, 11, 15, 16, 30),
      icon: "check",
      status: "success",
    },
    {
      id: "2",
      type: "connection",
      title: "New connection",
      description: "Alex joined your network via exposed mode",
      timestamp: new Date(2025, 11, 15, 14, 20),
      icon: "user",
      status: "info",
    },
    {
      id: "3",
      type: "message",
      title: "New message",
      description: "Sarah sent you a message about the project review",
      timestamp: new Date(2025, 11, 15, 11, 45),
      icon: "message",
      status: "info",
    },
    {
      id: "4",
      type: "meeting",
      title: "Meeting cancelled",
      description: "Product Demo was cancelled by the organizer",
      timestamp: new Date(2025, 11, 15, 9, 15),
      icon: "x",
      status: "error",
    },
    {
      id: "5",
      type: "connection",
      title: "Anonymous session",
      description: "Connected anonymously with 2 people for 45 minutes",
      timestamp: new Date(2025, 11, 14, 18, 30),
      icon: "video",
      status: "success",
    },
  ];

  const getActivityIcon = (icon: ActivityItem["icon"]) => {
    const iconClass = "size-4";
    switch (icon) {
      case "video":
        return <VideoIcon className={iconClass} />;
      case "user":
        return <UserPlusIcon className={iconClass} />;
      case "message":
        return <MessageSquareIcon className={iconClass} />;
      case "bell":
        return <BellIcon className={iconClass} />;
      case "check":
        return <CheckCircle2Icon className={iconClass} />;
      case "x":
        return <XCircleIcon className={iconClass} />;
      default:
        return <BellIcon className={iconClass} />;
    }
  };

  const getStatusColor = (status?: ActivityItem["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "error":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    }
  };

  const formatActivityTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const goToMeet = (identity: "anonymous" | "exposed") => {
    router.push(`/meet?identity=${identity}`);
  };

  const formatMeetingTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatMeetingDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex h-[90vh] overflow-hidden bg-background/95 backdrop-blur-sm gap-0 md:gap-3">
      <div className="flex-1 flex flex-col space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your overview.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="lg">
              <VideoIcon className="size-4" />
              New Meeting
              <ChevronDownIcon className="size-4 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuItem onClick={() => goToMeet("anonymous")}>
              <UsersIcon className="size-4" />
              <div className="flex-1">
                <div className="font-medium">Anonymous Mode</div>
                <div className="text-xs text-muted-foreground">
                  Connect without showing identity
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => goToMeet("exposed")}>
              <VideoIcon className="size-4" />
              <div className="flex-1">
                <div className="font-medium">Exposed Mode</div>
                <div className="text-xs text-muted-foreground">
                  Connect with full profile visible
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-0 md:gap-3">
        {/* Left Column - Calendar & Upcoming */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Meetings */}
          <div className="bg-card/50 backdrop-blur-xl overflow-hidden border border-border/40 md:rounded-xl shadow-sm">
            <div className="p-4 md:p-5 border-b border-border/40 bg-gradient-to-b from-background/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ClockIcon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Upcoming</h2>
                    <p className="text-sm text-muted-foreground">
                      {upcomingMeetings.length} meetings scheduled
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="divide-y divide-border/40">
              {upcomingMeetings.length > 0 ? (
                upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="p-5 hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 text-center min-w-[60px]">
                        <div className="text-xs text-muted-foreground font-medium uppercase">
                          {formatMeetingDate(meeting.date)}
                        </div>
                        <div className="text-base font-semibold mt-0.5">
                          {formatMeetingTime(meeting.date)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                          {meeting.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted text-xs font-medium capitalize">
                            {meeting.type === "anonymous" && <UsersIcon className="size-3" />}
                            {meeting.type === "exposed" && <VideoIcon className="size-3" />}
                            {meeting.type === "scheduled" && <CalendarIcon className="size-3" />}
                            {meeting.type}
                          </span>
                          {meeting.participants && (
                            <span className="text-xs">
                              {meeting.participants} participants
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        Join
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <CalendarIcon className="size-10 mx-auto mb-2.5 opacity-30" />
                  <p className="text-sm">No upcoming meetings</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-card/50 backdrop-blur-xl overflow-hidden border border-border/40 md:rounded-xl shadow-sm">
            <div className="p-4 md:p-5 border-b border-border/40 bg-gradient-to-b from-background/80 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BellIcon className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Recent Activity</h2>
                  <p className="text-sm text-muted-foreground">
                    Your latest updates and notifications
                  </p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-border/40 max-h-[500px] overflow-y-auto">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-5 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex-shrink-0 p-2 rounded-lg ${getStatusColor(
                        activity.status
                      )}`}
                    >
                      {getActivityIcon(activity.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-0.5">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {activity.description}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatActivityTime(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-card/50 backdrop-blur-xl overflow-hidden border border-border/40 md:rounded-xl shadow-sm sticky top-6">
            <div className="p-4 md:p-5 border-b border-border/40 bg-gradient-to-b from-background/80 to-transparent">
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-5 text-primary" />
                <h2 className="font-semibold">Calendar</h2>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-xl w-full [--cell-size:--spacing(9)] md:[--cell-size:--spacing(10)]"
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
