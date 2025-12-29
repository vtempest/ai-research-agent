<script lang="ts">
  import { cn } from "$components/utils";
  import { Motion } from "svelte-motion";
  import {
    Search,
    History,
    BookmarkIcon,
    Settings,
    Menu,
    X,
    ChevronsUpDown,
    Globe,
    FileText,
    TrendingUp,
  } from "lucide-svelte";
  import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "$lib/components/ui/dropdown-menu";
  import { Separator } from "$lib/components/ui/separator";
  import { Badge } from "$lib/components/ui/badge";
  import { onMount } from "svelte";
  import grab from "grab-url";

  let { isCollapsed = $bindable(true), user = null } = $props();

  let sidebarRef: HTMLDivElement;
  let isMobile = $state(false);

  async function handleSignOut() {
    try {
      await grab("auth/sign-out", { post: true });
      window.location.reload();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  }

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  const navigationLinks = [
    {
      label: "Search",
      icon: Search,
      href: "#search",
    },
    {
      label: "History",
      icon: History,
      href: "#history",
    },
    {
      label: "Bookmarks",
      icon: BookmarkIcon,
      href: "#bookmarks",
    },
  ];

  const toolLinks = [
    {
      label: "Web Search",
      icon: Globe,
      href: "#web-search",
      badge: "NEW",
    },
    {
      label: "Documents",
      icon: FileText,
      href: "#documents",
    },
    {
      label: "Trending",
      icon: TrendingUp,
      href: "#trending",
    },
  ];

  function handleMouseEnter() {
    if (!isMobile) {
      isCollapsed = false;
    }
  }

  function handleMouseLeave() {
    if (!isMobile) {
      isCollapsed = true;
    }
  }
</script>

<!-- Desktop Sidebar -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={sidebarRef}
  class="hidden md:flex md:flex-col h-full"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <Motion
    let:motion
    animate={{
      width: isCollapsed ? "60px" : "240px",
    }}
    transition={{
      type: "tween",
      ease: "easeOut",
      duration: 0.2,
    }}
  >
    <div
      use:motion
      class={cn(
        "sidebar fixed left-0 z-40 h-full shrink-0 border-r border-border bg-background",
      )}
    >
      <div
        class="relative z-40 flex text-muted-foreground h-full shrink-0 flex-col transition-all"
      >
        <ul class="flex h-full flex-col">
          <div class="flex grow flex-col items-center">
            <!-- Header -->
            <div
              class="flex h-[54px] w-full shrink-0 border-b border-border p-2"
            >
              <div class="mt-[1.5px] flex w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger class="w-full" asChild>
                    {#snippet children({ builder })}
                      <Button
                        builders={[builder]}
                        variant="ghost"
                        size="sm"
                        class="flex w-fit items-center gap-2 px-2"
                      >
                        <Avatar class="rounded size-4">
                          <AvatarFallback>SW</AvatarFallback>
                        </Avatar>
                        {#if !isCollapsed}
                          <div class="flex w-fit items-center gap-2">
                            <p class="text-sm font-medium">SearchWeb</p>
                            <ChevronsUpDown
                              class="h-4 w-4 text-muted-foreground/50"
                            />
                          </div>
                        {/if}
                      </Button>
                    {/snippet}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild>
                      <a
                        href="/app/settings/profile"
                        class="flex items-center gap-2"
                      >
                        <Settings class="h-4 w-4" /> Preferences
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem class="flex items-center gap-2">
                      <Globe class="h-4 w-4" /> Language
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <!-- Navigation Links -->
            <div class="flex h-full w-full flex-col">
              <div class="flex grow flex-col gap-4">
                <div class="h-16 grow p-2 overflow-y-auto">
                  <div class="flex w-full flex-col gap-1">
                    {#each navigationLinks as link}
                      <a
                        href={link.href}
                        class={cn(
                          "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                        )}
                      >
                        <svelte:component
                          this={link.icon}
                          class="h-4 w-4 shrink-0"
                        />
                        {#if !isCollapsed}
                          <p class="ml-2 text-sm font-medium">{link.label}</p>
                        {/if}
                      </a>
                    {/each}
                    <Separator class="w-full my-2" />
                    {#each toolLinks as link}
                      <a
                        href={link.href}
                        class={cn(
                          "flex h-8 flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                        )}
                      >
                        <svelte:component
                          this={link.icon}
                          class="h-4 w-4 shrink-0"
                        />
                        {#if !isCollapsed}
                          <div class="ml-2 flex items-center gap-2">
                            <p class="text-sm font-medium">{link.label}</p>
                            {#if link.badge}
                              <Badge
                                class={cn(
                                  "flex h-fit w-fit items-center gap-1.5 rounded border-none bg-primary/10 px-1.5 text-primary text-[10px]",
                                )}
                                variant="outline"
                              >
                                {link.badge}
                              </Badge>
                            {/if}
                          </div>
                        {/if}
                      </a>
                    {/each}
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="flex flex-col p-2">
                <a
                  href="/app/settings/profile"
                  class="mt-auto flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary"
                >
                  <Settings class="h-4 w-4 shrink-0" />
                  {#if !isCollapsed}
                    <p class="ml-2 text-sm font-medium">Settings</p>
                  {/if}
                </a>
                {#if user}
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger class="w-full" asChild>
                        {#snippet children({ builder })}
                          <Button
                            builders={[builder]}
                            variant="ghost"
                            class="flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary"
                          >
                            <Avatar class="size-4">
                              {#if user?.image}
                                <img
                                  src={user.image}
                                  alt={user.name}
                                  class="h-full w-full object-cover"
                                />
                              {/if}
                              <AvatarFallback>
                                {user?.name ? user.name[0].toUpperCase() : "U"}
                              </AvatarFallback>
                            </Avatar>
                            {#if !isCollapsed}
                              <div class="flex w-full items-center gap-2">
                                <p class="text-sm font-medium">
                                  {user?.name || "User"}
                                </p>
                                <ChevronsUpDown
                                  class="ml-auto h-4 w-4 text-muted-foreground/50"
                                />
                              </div>
                            {/if}
                          </Button>
                        {/snippet}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent sideOffset={5}>
                        <div class="flex flex-row items-center gap-2 p-2">
                          <Avatar class="size-6">
                            {#if user?.image}
                              <img
                                src={user.image}
                                alt={user.name}
                                class="h-full w-full object-cover"
                              />
                            {/if}
                            <AvatarFallback>
                              {user?.name ? user.name[0].toUpperCase() : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div class="flex flex-col text-left">
                            <span class="text-sm font-medium">
                              {user?.name || "User"}
                            </span>
                            <span
                              class="line-clamp-1 text-xs text-muted-foreground"
                            >
                              {user?.email || "user@searchweb.com"}
                            </span>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <a
                            href="/app/settings/profile"
                            class="flex items-center gap-2"
                          >
                            <Settings class="h-4 w-4" /> Account Settings
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          class="flex items-center gap-2 cursor-pointer"
                          onclick={handleSignOut}
                        >
                          Sign out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </Motion>
</div>

<!-- Mobile Sidebar -->
<div class="md:hidden">
  <div
    class={cn(
      "h-14 px-4 py-4 flex flex-row items-center justify-between bg-background border-b border-border w-full",
    )}
  >
    <div class="flex justify-between items-center z-20 w-full">
      <span class="font-semibold text-lg">SearchWeb</span>
      <button
        class="text-foreground cursor-pointer"
        onclick={() => (isCollapsed = !isCollapsed)}
      >
        {#if isCollapsed}
          <Menu class="h-5 w-5" />
        {:else}
          <X class="h-5 w-5" />
        {/if}
      </button>
    </div>
  </div>

  {#if !isCollapsed}
    <Motion
      let:motion
      animate={{
        x: 0,
        opacity: 1,
      }}
      initial={{
        x: "-100%",
        opacity: 0,
      }}
      transition={{
        duration: 1.0,
        ease: "easeInOut",
      }}
    >
      <div
        use:motion
        class="fixed h-full w-full inset-0 bg-background p-10 z-[100] flex flex-col justify-between"
      >
        <div class="flex flex-col gap-4">
          {#each navigationLinks as link}
            <a
              href={link.href}
              class="flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary"
              onclick={() => (isCollapsed = true)}
            >
              <svelte:component this={link.icon} class="h-4 w-4 shrink-0" />
              <p class="ml-2 text-sm font-medium">{link.label}</p>
            </a>
          {/each}
          <Separator class="w-full my-2" />
          {#each toolLinks as link}
            <a
              href={link.href}
              class="flex h-8 flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary"
              onclick={() => (isCollapsed = true)}
            >
              <svelte:component this={link.icon} class="h-4 w-4 shrink-0" />
              <div class="ml-2 flex items-center gap-2">
                <p class="text-sm font-medium">{link.label}</p>
                {#if link.badge}
                  <Badge
                    class={cn(
                      "flex h-fit w-fit items-center gap-1.5 rounded border-none bg-primary/10 px-1.5 text-primary text-[10px]",
                    )}
                    variant="outline"
                  >
                    {link.badge}
                  </Badge>
                {/if}
              </div>
            </a>
          {/each}
        </div>
      </div>
    </Motion>
  {/if}
</div>

<style>
  .sidebar {
    transition: width 0.2s ease-out;
  }
</style>
