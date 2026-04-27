"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Palette, Monitor } from "lucide-react"
import { Button } from "./components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export const themeNames = [
  "modern-minimal",
  "elegant-luxury",
  "cyberpunk",
  "twitter",
  "mocha-mousse",
  "bubblegum",
  "amethyst-haze",
  "pink-lemonade",
  "notebook",
  "doom-64",
  "catppuccin",
  "graphite",
  "perpetuity",
  "kodama-grove",
  "cosmic-night",
  "tangerine",
  "quantum-rose",
  "nature",
  "bold-tech",
  "amber-minimal",
  "supabase",
  "neo-brutalism",
  "solar-dusk",
  "claymorphism",
  "pastel-dreams"
];

export const themeColors: Record<string, { primary: string; secondary: string }> = {
  "modern-minimal": { primary: "#3b82f6", secondary: "#f3f4f6" },
  "elegant-luxury": { primary: "#9b2c2c", secondary: "#fdf2d6" },
  "cyberpunk": { primary: "#ff00c8", secondary: "#f0f0ff" },
  "twitter": { primary: "#1e9df1", secondary: "#0f1419" },
  "mocha-mousse": { primary: "#A37764", secondary: "#BAAB92" },
  "bubblegum": { primary: "#d04f99", secondary: "#8acfd1" },
  "amethyst-haze": { primary: "#8a79ab", secondary: "#dfd9ec" },
  "pink-lemonade": { primary: "#a84370", secondary: "#f1c4e6" },
  "notebook": { primary: "#606060", secondary: "#dedede" },
  "doom-64": { primary: "#b71c1c", secondary: "#556b2f" },
  "catppuccin": { primary: "#8839ef", secondary: "#ccd0da" },
  "graphite": { primary: "#606060", secondary: "#e0e0e0" },
  "perpetuity": { primary: "#06858e", secondary: "#d9eaea" },
  "kodama-grove": { primary: "#8d9d4f", secondary: "#decea0" },
  "cosmic-night": { primary: "#6e56cf", secondary: "#e4dfff" },
  "tangerine": { primary: "#e05d38", secondary: "#f3f4f6" },
  "quantum-rose": { primary: "#e6067a", secondary: "#ffd6ff" },
  "nature": { primary: "#2e7d32", secondary: "#e8f5e9" },
  "bold-tech": { primary: "#8b5cf6", secondary: "#f3f0ff" },
  "amber-minimal": { primary: "#f59e0b", secondary: "#f3f4f6" },
  "supabase": { primary: "#72e3ad", secondary: "#fdfdfd" },
  "neo-brutalism": { primary: "#ff3333", secondary: "#ffff00" },
  "solar-dusk": { primary: "#B45309", secondary: "#E4C090" },
  "claymorphism": { primary: "#6366f1", secondary: "#d6d3d1" },
  "pastel-dreams": { primary: "#a78bfa", secondary: "#e9d8fd" }
};

export const formatThemeName = (name: string) => {
  return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}


interface ThemeDropdownProps {
  Button?: React.ComponentType<any>
  DropdownMenu?: any
  iconSrc?: string
  onColorThemeChange?: (theme: string) => void
  onModeChange?: (mode: string) => void
}

export function ThemeDropdown({
  Button: CustomButton,
  DropdownMenu: CustomDropdownMenu,
  iconSrc,
  onColorThemeChange,
  onModeChange
}: ThemeDropdownProps = {}) {
  const { theme, setTheme } = useTheme()
  const [colorTheme, setColorTheme] = useState("modern-minimal")
  const [mounted, setMounted] = useState(false)
  const [previewTheme, setPreviewTheme] = useState<string | null>(null)

  const ButtonComp = CustomButton || Button
  const MenuComp = CustomDropdownMenu || {
    Root: DropdownMenu,
    Trigger: DropdownMenuTrigger,
    Content: DropdownMenuContent,
    Item: DropdownMenuItem,
    Label: DropdownMenuLabel,
    Separator: DropdownMenuSeparator
  }

  useEffect(() => {
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

    // Remove all theme classes
    themeNames.forEach(t => document.documentElement.classList.remove(`theme-${t}`))
    // Add new theme class
    document.documentElement.classList.add(`theme-${newTheme}`)

    setPreviewTheme(null)
    onColorThemeChange?.(newTheme)
  }

  const handleModeChange = (mode: string) => {
    setTheme(mode)
    onModeChange?.(mode)
  }

  const handleThemePreview = (themeName: string) => {
    setPreviewTheme(themeName)
    // Remove all theme classes
    themeNames.forEach(t => document.documentElement.classList.remove(`theme-${t}`))
    // Add preview theme class
    document.documentElement.classList.add(`theme-${themeName}`)
  }

  const handlePreviewEnd = () => {
    if (previewTheme) {
      // Restore the actual selected theme
      themeNames.forEach(t => document.documentElement.classList.remove(`theme-${t}`))
      document.documentElement.classList.add(`theme-${colorTheme}`)
      setPreviewTheme(null)
    }
  }

  const formatThemeName = (name: string) => {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  if (!mounted) {
    return null
  }

  const Root = MenuComp.Root || MenuComp
  const Trigger = MenuComp.Trigger || DropdownMenuTrigger
  const Content = MenuComp.Content || DropdownMenuContent
  const Item = MenuComp.Item || DropdownMenuItem
  const Label = MenuComp.Label || DropdownMenuLabel
  const Separator = MenuComp.Separator || DropdownMenuSeparator

  return (
    <Root onOpenChange={(open: boolean) => !open && handlePreviewEnd()}>
      <Trigger asChild>
        <ButtonComp variant="ghost" size="icon" className="relative">
          {iconSrc ? (
            <img src={iconSrc} alt="Themes" width={32} height={32} />
          ) : (
            <Palette className="h-5 w-5" />
          )}
        </ButtonComp>
      </Trigger>
      <Content align="end" className="w-56 max-h-[400px] overflow-y-auto">
        <Label>Appearance</Label>
        <Separator />
        <Item onClick={() => handleModeChange("light")} className="cursor-pointer py-1 h-7">
          <Sun className="mr-2 h-3.5 w-3.5" />
          <span className="text-sm">Light</span>
          {theme === "light" && <span className="ml-auto text-xs">✓</span>}
        </Item>
        <Item onClick={() => handleModeChange("dark")} className="cursor-pointer py-1 h-7">
          <Moon className="mr-2 h-3.5 w-3.5" />
          <span className="text-sm">Dark</span>
          {theme === "dark" && <span className="ml-auto text-xs">✓</span>}
        </Item>
        <Item onClick={() => handleModeChange("system")} className="cursor-pointer py-1 h-7">
          <Monitor className="mr-2 h-3.5 w-3.5" />
          <span className="text-sm">System</span>
          {theme === "system" && <span className="ml-auto text-xs">✓</span>}
        </Item>
        <Separator />
        <Label>Color Theme</Label>
        <div className="text-xs text-muted-foreground px-2 py-1.5">
          Current: {formatThemeName(colorTheme)}
        </div>
        <Separator />
        {themeNames.map((themeName) => {
          const colors = themeColors[themeName];
          return (
            <Item
              key={themeName}
              onClick={() => handleThemeChange(themeName)}
              onMouseEnter={() => handleThemePreview(themeName)}
              onMouseLeave={handlePreviewEnd}
              className={`cursor-pointer ${colorTheme === themeName ? "bg-accent" : ""
                }`}
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
            </Item>
          );
        })}
      </Content>
    </Root>
  )
}
