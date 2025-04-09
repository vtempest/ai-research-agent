
import {
    Search, // for "general"
    Newspaper, // for "news"
    Video, // for "videos"
    Image, // for "images"
    Beaker, // for "science"
    Monitor, // for "it"
    Files, // for "files"
    MessageCircle, // for "social+media"
    Map, // for "map"
    Music, // for "music"
  } from "lucide-svelte";
  
export const categories = [
    { code: "general", icon: Search, name: "Web" },
    { code: "news", icon: Newspaper, name: "News" },
    { code: "videos", icon: Video, name: "Videos" },
    { code: "images", icon: Image, name: "Images" },
    { code: "science", icon: Beaker, name: "Science" },
    { code: "files", icon: Files, name: "Files" },
    { code: "it", icon: Monitor, name: "Tech" },
    // { code: "social+media", icon: MessageCircle, name: "Forums" }
  ];