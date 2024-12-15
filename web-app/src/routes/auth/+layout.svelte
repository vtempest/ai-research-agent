<script lang="ts">
  import * as Card from "$components/ui/card";

</script>

<section class="flex min-h-screen w-screen flex-col items-center justify-center py-8">
  <div class="flex w-full max-w-xl flex-col items-center justify-center gap-6 px-6 py-8 lg:py-0">

    <Card.Root class="w-full">
      <!-- {@render children()} -->
       <slot />
    </Card.Root>
  </div>
</section>
