<script lang="ts">
  import { toggleMode } from "mode-watcher";
// @ts-ignore
  let { children, user } = $props();
  
  import { Sun, Moon, CircleUser, CreditCard, Lock, LogOut, Settings } from "lucide-svelte";

  import { Input } from "$components/ui/input";
  import { Button } from "$components/ui/button";
    import * as DropdownMenu from "$components/ui/dropdown-menu";
  import * as Avatar from "$components/ui/avatar";

  // import { enhance } from "$app/forms";

  import { Separator } from "$components/ui/separator";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/app/settings/profile"
  },
  {
    title: "Account",
    href: "/app/settings/account"
  },
  {
    title: "Notifications",
    href: "/app/settings/notifications"
  }
];
  let initials = $state("");

  $effect(() => {
    initials = user.name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  });

</script>
{@render children?.()}

