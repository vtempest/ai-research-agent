import Main from '$lib/components/TabManager/TabManager.svelte';

import "./app.css";
import "./tailwind.min.js";
import { mount } from 'svelte';
const app = mount(Main, { target: document.body });

