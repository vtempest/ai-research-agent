import Main from '$components/AppLayout/AppLayout.svelte';
import "./app.css";
import { mount } from 'svelte';

const app = mount(Main, { target: document.body });

