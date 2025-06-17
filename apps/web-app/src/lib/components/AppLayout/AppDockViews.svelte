<script context="module" lang="ts"> //allows its vars to be exported as a module
  import TextEditor from "$lib/components/Editor/EditorMain.svelte";
  import F2 from "$lib/components/FileSystem/F2.svelte";
  import Settings from "$lib/components/Settings/Settings.svelte";
  import SearchWeb from "$lib/components/SearchWeb/SearchMain.svelte";
  // Import icons
  import { iconFiles, iconRead, iconConfigure, iconQwksearch } from "$lib/components/icons";

  // Navigation items configuration
  export const listDockApps = [
    {
      id: "search",
      icon: iconQwksearch,
      component: SearchWeb,
      title: "QwkSearch - AI Research Agent",
    },
    {
      id: "read",
      icon: iconRead,
      component: TextEditor,
      title:
        "REASON: Research Editor for Annotated Summaries in Outline Notation",
    },
    {
      id: "documents",
      icon: iconFiles,
      component: F2,
      title: "Documents",
      disabled: true,
    },
    {
      id: "settings",
      icon: iconConfigure,
      component: Settings,
      title: "Settings",
      // disabled: true,
    },
  ].filter((item) => !item.disabled);

</script>

