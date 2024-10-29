import Main from '$lib/components/TabManager/TabManager.svelte';

import "./app.pcss";


document.addEventListener('DOMContentLoaded', function() {
  new Main({
   target: document.body,
 });
});
