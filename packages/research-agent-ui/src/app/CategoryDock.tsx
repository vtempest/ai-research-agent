"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText } from "lucide-react"
import {
  CategoryDock as BaseCategoryDock,
  type DockNavItem,
} from "shadcn-app-dock"
import { useChat } from "../hooks/useChat"
import { researchAgentUIConfig } from "../config"
import { useMainView } from "./MainViewProvider"
// Both dock marks are SVGs, and next/image refuses to run SVG through the
// optimizer unless `dangerouslyAllowSVG` is on — the request 400s and the dock
// renders two broken-image glyphs. They are already tiny inline-able assets, so
// every <Image> below opts out of optimization (same as `renderImage` does for
// the app icon) and serves the file as-is.
import iconRead from "../icons/icon-read.svg"

export function CategoryDock() {
  const pathname = usePathname()
  const { newChat } = useChat()
  const { activeView, setActiveView, docsEnabled, requestFilesSidebar } = useMainView()

  // The Docs entry is only reachable in the build that bundles the REASON
  // editor — in the chat-only build there is no document surface to switch to.
  const NAV_ITEMS = [
    { href: "/", label: "Research", icon: researchAgentUIConfig.appIconUrl },
    ...(docsEnabled
      ? [
          {
            href: "/workspace",
            label: "Docs",
            icon: (
              <Image
                src={iconRead}
                alt="Docs"
                width={24}
                height={24}
                unoptimized
                className="w-full h-full"
              />
            ),
          },
        ]
      : []),
  ]

  const isOnResearch = pathname === "/" || pathname.startsWith("/c")

  const items: DockNavItem[] = [
    ...NAV_ITEMS.map(({ href, label, icon }) => ({
      key: href,
      label,
      icon,
      active:
        href === "/"
          ? activeView === "research"
          : activeView === "docs",
      onClick: () => {
        if (href === "/") {
          setActiveView("research")
          if (isOnResearch) {
            newChat()
          }
          return
        }

        setActiveView("docs")
      },
    })),
    ...(docsEnabled
      ? [
          {
            key: "files",
            label: "Files",
            icon: <FileText className="w-full h-full p-1" />,
            onClick: () => {
              setActiveView("docs")
              requestFilesSidebar()
            },
          },
        ]
      : []),

  ]

  // The "Files" shortcut only makes sense on mobile, where REASON's file
  // sidebar isn't otherwise reachable at a glance — on desktop it's always
  // visible in the persistent sidebar, so the dock icon would be redundant.
  const desktopItems = items.filter((item) => item.key !== "files")
  const renderImage = (src: string, alt: string, size: number) => (
    <Image src={src} alt={alt} width={size} height={size} unoptimized className="w-full h-full" />
  )

  return (
    <>
      <BaseCategoryDock
        items={desktopItems}
        enableKeyboardShortcuts
        placements={{ desktop: true, mobile: false }}
        renderImage={renderImage}
      />
      <BaseCategoryDock
        items={items}
        placements={{ desktop: false, mobile: true }}
        mobileAlign={activeView === "docs" ? "end" : "center"}
        renderImage={renderImage}
      />
    </>
  )
}
