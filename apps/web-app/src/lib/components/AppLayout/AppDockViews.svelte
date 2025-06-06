<script context="module" lang="ts"> //allows its vars to be exported as a module
  import TextEditor from "$lib/components/Editor/EditorMain.svelte";
  import F2 from "$lib/components/FileSystem/F2.svelte";
  import Settings from "$lib/components/Settings/Settings.svelte";
  import SearchWeb from "$lib/components/SearchWeb/SearchMain.svelte";
  // Import icons
  import filesIcon from "$lib/components/icons/icon-files.svg";
  import readIcon from "$lib/components/icons/icon-read.svg";
  import configureIcon from "$lib/components/icons/icon-configure.svg";
  import qwksearchIcon from "$lib/components/icons/icon-qwksearch.svg";
  import logoIcon from "$lib/components/icons/icon-logo.svg";
  import youtubeIcon from "$lib/components/icons/icon-youtube-debate.svg";
  import graphIcon from "$lib/components/icons/icon-graph.svg";
  import searchIcon from "$lib/components/icons/icon-searchresults.svg";
  import flowIcon from "$lib/components/icons/icon-flow.svg";
  import chatIcon from "$lib/components/icons/icon-chat.svg";
  import organizeIcon from "$lib/components/icons/icon-organize.svg";

  // Navigation items configuration
  export const listDockApps = [
    {
      id: "search",
      icon: qwksearchIcon,
      component: SearchWeb,
      title: "QwkSearch - AI Research Agent",
    },
    {
      id: "read",
      icon: readIcon,
      component: TextEditor,
      title:
        "REASON: Research Editor for Annotated Summaries in Outline Notation",
    },
    {
      id: "documents",
      icon: filesIcon,
      component: F2,
      title: "Documents",
      disabled: true,
    },
    {
      id: "settings",
      icon: configureIcon,
      component: Settings,
      title: "Settings",
      // disabled: true,
    },
  ].filter((item) => !item.disabled);

</script>

