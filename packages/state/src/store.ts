import { create } from "zustand";
import React from "react";

type activeTabType = "friends" | "sent" | "received"
type activeSectionType = "Notifications" | "Playground" | "received" | string
type Team = { name: string, logo: React.ElementType, plan: string } | null;
const initialStates = {
    "Notifications": {
      emailNotif: true,
      pushNotif: true,
      smsNotif: false,
    },
    "Navigation": {
      navStyle: "compact",
      showIcons: true,
    },
    "Home": {
      homepage: "Dashboard",
      showGreeting: true,
      itemsPerPage: "10",
    },
    "Appearance": {
      theme: "dark",
      compactMode: false,
    },
    "Messages & media": {
      autoPlay: true,
      imageQuality: "High",
      enableGifs: true,
    },
    "Language & region": {
      language: "English",
      region: "United States",
      timezone: "UTC-8 (PST)",
    },
    "Accessibility": {
      reduceMotion: false,
      highContrast: false,
      fontSize: "Medium",
      screenReader: true,
    },
    "Mark as read": {
      readBehavior: "manual",
      readOnClick: true,
    },
    "Audio & video": {
      videoQuality: "720p",
      audioOutput: "Default",
      videoCaptions: true,
      microphone: "Default",
    },
    "Connected accounts": {},
    "Privacy & visibility": {
      profileVisibility: "public",
      showActivity: true,
      allowMessages: true,
    },
    "Advanced": {
      betaFeatures: false,
      logLevel: "Warning",
    },
}

interface state  {
    tourOpen: boolean;
    loadingOlderMessages: boolean;
    searchQuery: string;
    isLoadingMore: boolean;
    isLoading: boolean;
    activeTab: activeTabType;
    currentPage: number;
    open: boolean;
    settingsOpen: boolean;
    activeSection: activeSectionType;
    hasChanges: boolean;
    activeSubSection: string | null;
    openMobile: boolean;
    _open: boolean;
    portal: HTMLElement | null;
    arrow: HTMLSpanElement | null;
    footer: any;
    mounted: boolean;
    isMobile: boolean | undefined;
    activeTeam: Team | null;
    selectedChat: any | null;
    displayedChats: any[];
    states: any;
}

interface actions {
    setTourOpen: (value: boolean) => void;
    setLoadingOlderMessages: (value: boolean) => void;
    setSearchQuery: (value: string) => void;
    setIsLoadingMore: (value: boolean) => void;
    setIsLoading: (value: boolean) => void;
    setActiveTab: (value: activeTabType) => void;
    setCurrentPage: (value: number | ((prev: number) => number)) => void;
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
    setSettingsOpen: (value: boolean) => void;
    setActiveSection: (value: activeSectionType) => void;
    setActiveSectionState: (value: activeSectionType) => void;
    setHasChanges: (value: boolean) => void;
    setActiveSubSection: (value: string | null) => void;
    setOpenMobile: (value: boolean | ((prev: boolean) => boolean)) => void;
    _setOpen: (value: boolean) => void;
    setPortal: (value: HTMLElement | null) => void;
    setArrow: (value: HTMLSpanElement | null) => void;
    setFooter: (value: any) => void;
    setMounted: (value: boolean) => void;
    setIsMobile: (value: boolean | undefined) => void;
    setActiveTeam: (team: Team | null) => void;
    setSelectedChat: (chat: any | null) => void;
    setDisplayedChats: (value: any[] | ((prev: any[]) => any[])) => void;      
    setStates: (chat: any) => void;
}

export const useHelixque = create<state & actions>((set)=>({
    tourOpen: false,
    loadingOlderMessages: false,
    searchQuery: "",
    isLoadingMore: false,
    isLoading: false,
    activeTab: "friends",
    currentPage: 1,
    open: false,
    settingsOpen: false,
    activeSection: "Notifications",
    hasChanges: false,
    activeSubSection: "History",
    openMobile: false,
    _open: true,
    portal: null,
    arrow: null,
    footer: null,
    mounted: false,
    isMobile: undefined,
    activeTeam: null,
    selectedChat: null,
    displayedChats: [],
    states: initialStates,
    setTourOpen: (value: boolean) => set({ tourOpen: value }),
    setLoadingOlderMessages: (value: boolean) => set({ loadingOlderMessages: value }),
    setSearchQuery: (value: string) => set({ searchQuery: value }),
    setIsLoadingMore: (value: boolean) => set({ isLoadingMore: value }),
    setIsLoading: (value: boolean) => set({ isLoading: value }),
    setActiveTab: (value: activeTabType) => set({ activeTab: value }),
    setCurrentPage: (value) => set((state) => ({ currentPage: typeof value === "function" ? value(state.currentPage) : value })),
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => set((state) => ({ open: typeof value === "function" ? value(state.open) : value })),      
    setSettingsOpen: (value: boolean) => set({ settingsOpen: value }),
    setActiveSection: (value: activeSectionType) => set({ activeSection: value }),
    setActiveSectionState: (value: activeSectionType) => set({ activeSection: value }),
    setHasChanges: (value: boolean) => set({ hasChanges: value }),
    setActiveSubSection: (value: string | null) => set({ activeSubSection: value }),
    setOpenMobile: (value: boolean | ((prev: boolean) => boolean)) => set((state) => ({ openMobile: typeof value === 'function' ? value(state.openMobile) : value })),
    _setOpen: (value: boolean) => set({ _open: value }),
    setPortal: (value: HTMLElement | null) => set({ portal: value }),
    setArrow: (value: HTMLSpanElement | null) => set({ arrow: value }),
    setFooter: (value: any) => set({ footer: value }),
    setMounted: (value: boolean) => set({ mounted: value }),
    setIsMobile: (value: boolean | undefined) => set({ isMobile: value }),
    setActiveTeam: (value: Team | null) => set({ activeTeam: value }),
    setSelectedChat: (value) => set({ selectedChat: value }),
    setDisplayedChats: (value) => set((state) => ({ displayedChats: typeof value === "function" ? value(state.displayedChats) : value })),      
    setStates: (value: any) => set({ states: value }),
}))