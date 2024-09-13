<script>
  import { APP_EMAIL, LINK_BLOG } from "$lib/config/config";
</script>

<div class="mt-16 mb-1 text-center text-slate-500 text-xs z-20">
  <a target="_blank" href="/pricing" class="mr-4 hover:underline">Pricing </a>
  <a target="_blank" href={LINK_BLOG} class="mr-4 hover:underline">Blog</a>

  <!-- Privacy Policy and Terms of Service links -->

  <a target="_blank" href="/legal/privacy-policy" class="mr-4 hover:underline"
    >Privacy</a
  >
  <a target="_blank" href="/legal/terms" class="mr-4 hover:underline">Terms </a>
  <a target="_blank" href="mailto:{APP_EMAIL}" class="mr-4 hover:underline"
    >Contact
  </a>
</div>
