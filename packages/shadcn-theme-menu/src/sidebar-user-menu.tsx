"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import {
  ChevronUp,
  User2,
  LogOut,
  CreditCard,
  Bell,
  Palette
} from 'lucide-react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CinematicThemeSwitcher from "./cinematic-theme-switcher"
import { themeNames, themeColors, formatThemeName } from "./theme-dropdown"

interface SettingsDialogProps {
  trigger: React.ReactNode;
}

function SettingsDialog({ trigger }: SettingsDialogProps) {
  return <>{trigger}</>;
}

export function SidebarUserMenu() {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user || { name: "Guest User", email: "guest@example.com", image: null }
  const [colorTheme, setColorTheme] = React.useState("modern-minimal")
  const [mounted, setMounted] = React.useState(false)
  const [previewTheme, setPreviewTheme] = React.useState<string | null>(null)

  React.useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("color-theme")
    if (saved && themeNames.includes(saved)) {
      setColorTheme(saved)
    }
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setColorTheme(newTheme)
    localStorage.setItem("color-theme", newTheme)
    document.cookie = `color-theme=${newTheme}; path=/; max-age=31536000`
    themeNames.forEach(t => document.documentElement.classList.remove(`theme-${t}`))
    document.documentElement.classList.add(`theme-${newTheme}`)
    setPreviewTheme(null)
  }

  const handleThemePreview = (themeName: string) => {
    setPreviewTheme(themeName)
    themeNames.forEach(t => document.documentElement.classList.remove(`theme-${t}`))
    document.documentElement.classList.add(`theme-${themeName}`)
  }

  const handlePreviewEnd = () => {
    if (previewTheme) {
      themeNames.forEach(t => document.documentElement.classList.remove(`theme-${t}`))
      document.documentElement.classList.add(`theme-${colorTheme}`)
      setPreviewTheme(null)
    }
  }

  const userInitials = user.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2) || "GU"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu onOpenChange={(open) => !open && handlePreviewEnd()}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user.name || "Guest"}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <ChevronUp className="ml-2 size-4 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name || "Guest"}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <SettingsDialog
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <User2 className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              }
            />
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette className="mr-2 h-4 w-4" />
                <span>Color Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="max-h-[400px] overflow-y-auto">
                  <div className="px-2 py-1.5 flex items-center justify-center">
                    <CinematicThemeSwitcher />
                  </div>
                  <DropdownMenuSeparator />
                  {themeNames.map((themeName) => {
                    const colors = themeColors[themeName];
                    return (
                      <DropdownMenuItem
                        key={themeName}
                        onClick={() => handleThemeChange(themeName)}
                        onMouseEnter={() => handleThemePreview(themeName)}
                        onMouseLeave={handlePreviewEnd}
                        className={colorTheme === themeName ? "bg-accent" : ""}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            {colors && (
                              <div className="flex items-center gap-1">
                                <div
                                  className="w-3 h-3 rounded-full border border-border"
                                  style={{ backgroundColor: colors.primary }}
                                />
                                <div
                                  className="w-3 h-3 rounded-full border border-border"
                                  style={{ backgroundColor: colors.secondary }}
                                />
                              </div>
                            )}
                            <span>{formatThemeName(themeName)}</span>
                          </div>
                          {colorTheme === themeName && (
                            <span className="text-xs">✓</span>
                          )}
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => {
              await signOut()
              router.push("/")
            }}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
