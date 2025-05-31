<script lang="ts">
  import { SignOut } from "@auth/sveltekit/components";
  import { onMount } from "svelte";
  onMount(() => {
    // Automatically click the submit button after a short delay
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.click();
    }
  });
</script>

<div class="flex h-screen w-full items-center justify-center bg-gray-100">
  <div class="text-center">
    <h1 class="mb-4 text-3xl font-semibold text-gray-800">Signing Out...</h1>
    <SignOut signOutPage="signout">
      <div slot="submitButton" class="hidden">
      </div>
      <button type="submit">Signout</button>
    </SignOut>
  </div>
</div>
