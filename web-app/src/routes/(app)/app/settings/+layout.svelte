<script lang="ts">
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

</script>

<div class="container mt-8 hidden space-y-6 rounded-lg border p-10 pb-16 md:block">
  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
    <p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
  </div>
  <Separator class="my-6" />
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <div class="flex-1 lg:max-w-2xl">
      <!-- {@render children()} -->
       <slot></slot>
    </div>
  </div>
</div>
