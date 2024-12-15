import Main from '$components/DebateApp/DebateApp.svelte';
import "tailwindcss/tailwind.css";
import "./app.pcss";


import { mount } from 'svelte';
const app = mount(Main, { target: document.body });

