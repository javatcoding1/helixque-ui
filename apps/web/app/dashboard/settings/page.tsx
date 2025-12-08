"use client"

import * as React from "react"
import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { useNavigation } from "@/contexts/navigation-context"

const data = {
  nav: [
    { name: "Notifications", icon: Bell },
    { name: "Navigation", icon: Menu },
    { name: "Home", icon: Home },
    { name: "Appearance", icon: Paintbrush },
    { name: "Messages & media", icon: MessageCircle },
    { name: "Language & region", icon: Globe },
    { name: "Accessibility", icon: Keyboard },
    { name: "Mark as read", icon: Check },
    { name: "Audio & video", icon: Video },
    { name: "Connected accounts", icon: Link },
    { name: "Privacy & visibility", icon: Lock },
    { name: "Advanced", icon: Settings },
  ],
}

// Settings Content Components
function NotificationsSettings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="email-notif">Email Notifications</Label>
        <input type="checkbox" id="email-notif" defaultChecked className="w-4 h-4" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="push-notif">Push Notifications</Label>
        <input type="checkbox" id="push-notif" defaultChecked className="w-4 h-4" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="sms-notif">SMS Notifications</Label>
        <input type="checkbox" id="sms-notif" className="w-4 h-4" />
      </div>
    </div>
  )
}

function NavigationSettings() {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-3 block">Navigation Style</Label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="radio" id="nav-compact" name="nav-style" value="compact" defaultChecked />
            <Label htmlFor="nav-compact" className="ml-2 font-normal cursor-pointer">Compact</Label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="nav-expanded" name="nav-style" value="expanded" />
            <Label htmlFor="nav-expanded" className="ml-2 font-normal cursor-pointer">Expanded</Label>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="show-icons">Show Icons</Label>
        <input type="checkbox" id="show-icons" defaultChecked className="w-4 h-4" />
      </div>
    </div>
  )
}

function HomeSettings() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="homepage" className="mb-2 block">Homepage</Label>
        <select id="homepage" className="w-full px-3 py-2 border rounded-md bg-background">
          <option>Dashboard</option>
          <option>Explore</option>
          <option>Trending</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="show-greeting">Show Greeting</Label>
        <input type="checkbox" id="show-greeting" defaultChecked className="w-4 h-4" />
      </div>
      <div>
        <Label htmlFor="items-per-page" className="mb-2 block">Items Per Page</Label>
        <Input id="items-per-page" type="number" defaultValue="10" min="5" max="50" />
      </div>
    </div>
  )
}

function AppearanceSettings() {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-3 block">Theme</Label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="radio" id="theme-light" name="theme" value="light" />
            <Label htmlFor="theme-light" className="ml-2 font-normal cursor-pointer">Light</Label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="theme-dark" name="theme" value="dark" defaultChecked />
            <Label htmlFor="theme-dark" className="ml-2 font-normal cursor-pointer">Dark</Label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="theme-system" name="theme" value="system" />
            <Label htmlFor="theme-system" className="ml-2 font-normal cursor-pointer">System</Label>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="accent-color" className="mb-2 block">Accent Color</Label>
        <div className="flex gap-2">
          <input type="color" id="accent-color" defaultValue="#3b82f6" className="w-12 h-10 rounded cursor-pointer" />
          <Input type="text" defaultValue="#3b82f6" readOnly />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="compact-mode">Compact Mode</Label>
        <input type="checkbox" id="compact-mode" className="w-4 h-4" />
      </div>
    </div>
  )
}

function MessagesMediaSettings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="auto-play">Auto-play Media</Label>
        <input type="checkbox" id="auto-play" defaultChecked className="w-4 h-4" />
      </div>
      <div>
        <Label htmlFor="image-quality" className="mb-2 block">Image Quality</Label>
        <select id="image-quality" className="w-full px-3 py-2 border rounded-md bg-background">
          <option>Low</option>
          <option>Medium</option>
          <option selected>High</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="enable-gifs">Enable GIFs</Label>
        <input type="checkbox" id="enable-gifs" defaultChecked className="w-4 h-4" />
      </div>
    </div>
  )
}

function LanguageRegionSettings() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="language" className="mb-2 block">Language</Label>
        <select id="language" className="w-full px-3 py-2 border rounded-md bg-background">
          <option selected>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Japanese</option>
        </select>
      </div>
      <div>
        <Label htmlFor="region" className="mb-2 block">Region</Label>
        <select id="region" className="w-full px-3 py-2 border rounded-md bg-background">
          <option selected>United States</option>
          <option>United Kingdom</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>Germany</option>
        </select>
      </div>
      <div>
        <Label htmlFor="timezone" className="mb-2 block">Timezone</Label>
        <select id="timezone" className="w-full px-3 py-2 border rounded-md bg-background">
          <option selected>UTC-8 (PST)</option>
          <option>UTC-5 (EST)</option>
          <option>UTC (GMT)</option>
          <option>UTC+1 (CET)</option>
          <option>UTC+9 (JST)</option>
        </select>
      </div>
    </div>
  )
}

function AccessibilitySettings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="reduce-motion">Reduce Motion</Label>
        <input type="checkbox" id="reduce-motion" className="w-4 h-4" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="high-contrast">High Contrast</Label>
        <input type="checkbox" id="high-contrast" className="w-4 h-4" />
      </div>
      <div>
        <Label htmlFor="font-size" className="mb-2 block">Font Size</Label>
        <select id="font-size" className="w-full px-3 py-2 border rounded-md bg-background">
          <option>Small</option>
          <option selected>Medium</option>
          <option>Large</option>
          <option>Extra Large</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="screen-reader">Screen Reader Support</Label>
        <input type="checkbox" id="screen-reader" defaultChecked className="w-4 h-4" />
      </div>
    </div>
  )
}

function MarkAsReadSettings() {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-3 block">Mark as Read Behavior</Label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="radio" id="read-manual" name="read-behavior" value="manual" defaultChecked />
            <Label htmlFor="read-manual" className="ml-2 font-normal cursor-pointer">Manual</Label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="read-auto" name="read-behavior" value="auto" />
            <Label htmlFor="read-auto" className="ml-2 font-normal cursor-pointer">Automatic</Label>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="read-on-click">Mark Read on Click</Label>
        <input type="checkbox" id="read-on-click" defaultChecked className="w-4 h-4" />
      </div>
    </div>
  )
}

function AudioVideoSettings() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="video-quality" className="mb-2 block">Video Quality</Label>
        <select id="video-quality" className="w-full px-3 py-2 border rounded-md bg-background">
          <option>360p</option>
          <option>480p</option>
          <option selected>720p</option>
          <option>1080p</option>
        </select>
      </div>
      <div>
        <Label htmlFor="audio-output" className="mb-2 block">Audio Output</Label>
        <select id="audio-output" className="w-full px-3 py-2 border rounded-md bg-background">
          <option selected>Default</option>
          <option>Speaker</option>
          <option>Headphones</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="video-captions">Video Captions</Label>
        <input type="checkbox" id="video-captions" defaultChecked className="w-4 h-4" />
      </div>
      <div>
        <Label htmlFor="microphone" className="mb-2 block">Microphone</Label>
        <select id="microphone" className="w-full px-3 py-2 border rounded-md bg-background">
          <option selected>Default</option>
          <option>Built-in Microphone</option>
          <option>External Microphone</option>
        </select>
      </div>
    </div>
  )
}

function ConnectedAccountsSettings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <p className="font-medium">Google</p>
          <p className="text-sm text-muted-foreground">user@gmail.com</p>
        </div>
        <Button variant="outline" size="sm">Disconnect</Button>
      </div>
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <p className="font-medium">GitHub</p>
          <p className="text-sm text-muted-foreground">Not connected</p>
        </div>
        <Button size="sm">Connect</Button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Discord</p>
          <p className="text-sm text-muted-foreground">Not connected</p>
        </div>
        <Button size="sm">Connect</Button>
      </div>
    </div>
  )
}

function PrivacyVisibilitySettings() {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-3 block">Profile Visibility</Label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="radio" id="visibility-public" name="visibility" value="public" defaultChecked />
            <Label htmlFor="visibility-public" className="ml-2 font-normal cursor-pointer">Public</Label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="visibility-friends" name="visibility" value="friends" />
            <Label htmlFor="visibility-friends" className="ml-2 font-normal cursor-pointer">Friends Only</Label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="visibility-private" name="visibility" value="private" />
            <Label htmlFor="visibility-private" className="ml-2 font-normal cursor-pointer">Private</Label>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="show-activity">Show Activity Status</Label>
        <input type="checkbox" id="show-activity" defaultChecked className="w-4 h-4" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="allow-messages">Allow Messages from Anyone</Label>
        <input type="checkbox" id="allow-messages" defaultChecked className="w-4 h-4" />
      </div>
    </div>
  )
}

function AdvancedSettings() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="api-key" className="mb-2 block">API Key</Label>
        <Input id="api-key" type="password" value="••••••••••••••••" readOnly />
        <Button variant="outline" size="sm" className="mt-2">Regenerate</Button>
      </div>
      <div>
        <Label className="mb-2 block">Cache & Storage</Label>
        <Button variant="outline" className="w-full justify-start">Clear Cache</Button>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="beta-features">Beta Features</Label>
        <input type="checkbox" id="beta-features" className="w-4 h-4" />
      </div>
      <div>
        <Label htmlFor="log-level" className="mb-2 block">Log Level</Label>
        <select id="log-level" className="w-full px-3 py-2 border rounded-md bg-background">
          <option>Error</option>
          <option selected>Warning</option>
          <option>Info</option>
          <option>Debug</option>
        </select>
      </div>
    </div>
  )
}

const settingsContent: Record<string, () => React.ReactNode> = {
  "Notifications": NotificationsSettings,
  "Navigation": NavigationSettings,
  "Home": HomeSettings,
  "Appearance": AppearanceSettings,
  "Messages & media": MessagesMediaSettings,
  "Language & region": LanguageRegionSettings,
  "Accessibility": AccessibilitySettings,
  "Mark as read": MarkAsReadSettings,
  "Audio & video": AudioVideoSettings,
  "Connected accounts": ConnectedAccountsSettings,
  "Privacy & visibility": PrivacyVisibilitySettings,
  "Advanced": AdvancedSettings,
}

export default function SettingsPage() {
  const { setActiveSection } = useNavigation()
  const [activeSection, setActiveSectionState] = React.useState("Notifications")

  React.useEffect(() => {
    setActiveSection("Settings")
  }, [setActiveSection])

  const ContentComponent = settingsContent[activeSection] as React.ComponentType | undefined

  return (
    <div className="flex gap-6">
      <aside className="hidden lg:flex lg:w-64 flex-col">
        <Sidebar collapsible="none" className="border rounded-lg">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.nav.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        isActive={item.name === activeSection}
                        onClick={() => setActiveSectionState(item.name)}
                      >
                        <item.icon />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </aside>

      <main className="flex-1">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{activeSection}</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Configure your {activeSection.toLowerCase()} preferences.
            </p>
          </div>

          <div className="max-w-2xl border rounded-lg p-6">
            {ContentComponent && <ContentComponent />}
          </div>

          <div className="flex gap-3 max-w-2xl">
            <Button>Save Changes</Button>
            <Button variant="outline">Reset to Default</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
