import Main from '$components/DebateApp/DebateApp.svelte';
import "tailwindcss/tailwind.css";
import "./app.pcss";


document.addEventListener('DOMContentLoaded', () =>
  new Main({
   target: document.body,
 })
);
