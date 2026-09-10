"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Link2,
  LogIn,
  LogOut,
  Menu,
  Palette,
  PanelLeftClose,
  Settings,
  X,
} from "lucide-react";

import { researchAgentUIConfig } from "../config";
import { useSession } from "../hooks/useSession";
import { siteLinksForPath } from "../lib/site-links";
import iconConfigure from "../icons/icon-configure.svg";

/**
 * The account and application controls previously hidden in the dock's
 * Settings menu.  It deliberately owns its open state so it works on every
 * surface that mounts the shared research workspace, including mobile.
 */
export function AppSidebar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, signIn, signOut } = useSession();
  const siteLinks = siteLinksForPath(
    researchAgentUIConfig.footerLinks,
    pathname,
  );

  const openSettings = () => {
    setOpen(false);
    if (!researchAgentUIConfig.onOpenSettings?.()) router.push("/settings");
  };

  const closeOnMobile = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed top-3 left-3 z-[60] inline-flex size-9 items-center justify-center rounded-md border bg-background/95 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:top-4 md:left-4"
        aria-label={
          open ? "Close application sidebar" : "Open application sidebar"
        }
        aria-expanded={open}
        aria-controls="application-sidebar"
      >
        {open ? (
          <PanelLeftClose className="size-4" />
        ) : (
          <Menu className="size-4" />
        )}
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close application sidebar"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
        />
      )}

      <aside
        id="application-sidebar"
        aria-label="Application sidebar"
        data-state={open ? "expanded" : "collapsed"}
        className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background text-foreground shadow-xl transition-transform duration-200 ease-linear data-[state=collapsed]:-translate-x-full md:data-[state=collapsed]:-translate-x-[calc(100%-3.75rem)]"
      >
        <div className="flex h-16 shrink-0 items-center gap-3 border-b px-4 pl-14">
          <Image
            src={iconConfigure}
            alt=""
            width={28}
            height={28}
            unoptimized
            aria-hidden
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Application</p>
            <p className="truncate text-xs text-muted-foreground">
              Preferences and links
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-auto inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
            aria-label="Close application sidebar"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto p-3"
          aria-label="Application controls"
        >
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Application
          </p>
          <button
            type="button"
            onClick={openSettings}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-accent"
          >
            <Settings className="size-4 shrink-0" />
            Settings
          </button>

          {siteLinks.length > 0 && (
            <div className="mt-6">
              <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Site links
              </p>
              <div className="space-y-1">
                {siteLinks.map(({ url, text }) => {
                  const external = url.startsWith("http");
                  const className =
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent";
                  return external ? (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      <Link2 className="size-4 shrink-0" />
                      {text}
                    </a>
                  ) : (
                    <Link
                      key={url}
                      href={url}
                      onClick={closeOnMobile}
                      className={className}
                    >
                      <Link2 className="size-4 shrink-0" />
                      {text}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        <div className="space-y-2 border-t p-3">
          <button
            type="button"
            onClick={() => (isAuthenticated ? signOut() : signIn())}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-accent"
          >
            {isAuthenticated ? (
              <LogOut className="size-4" />
            ) : (
              <LogIn className="size-4" />
            )}
            {isAuthenticated ? "Logout" : "Login"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              if (!researchAgentUIConfig.onOpenSettings?.("preferences")) {
                router.push("/settings/preferences");
              }
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-accent"
          >
            <Palette className="size-4" />
            Appearance &amp; theme
          </button>
        </div>
      </aside>
    </>
  );
}
