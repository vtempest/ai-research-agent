<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import TOCItem from "./TOCItem.svelte";
  import { Slider } from "$lib/components/ui/slider";

  export let editor = null;
  export let currentHeading;
  export let mainContent;
  export let handleLoadBlock;

  const dispatch = createEventDispatcher();

  let maxLevel = 3;
  let flattenedHeadings = [];

  function flattenOutline(outline, level = 1) {
    let result = [];
    outline.forEach((item, index) => {
      result.push({
        level,
        text: item.h1Title || item.h2Title || item.h3Title || item.h4Title,
        blocks: item.h4s,
        pos: index, // This is a placeholder, as we don't have actual positions
      });
      if (item.h2s) {
        result = result.concat(flattenOutline(item.h2s, level + 1));
      }
      if (item.h3s) {
        result = result.concat(flattenOutline(item.h3s, level + 1));
      }
      if (item.h4Titles) {
        result = result.concat(flattenOutline(item.h4Titles, level + 1));
      }
    });
    return result;
  }

  $: {
    if (mainContent && mainContent.outline) {
      flattenedHeadings = flattenOutline(mainContent.outline);
    }
  }

  function createNestedHeadings(headings) {
    const nestedHeadings = [];
    const stack = [{ level: 0, children: nestedHeadings }];
    headings.forEach((heading) => {
      while (heading.level <= stack[stack.length - 1].level) {
        stack.pop();
      }
      const parent = stack[stack.length - 1];

      const newHeading = { ...heading, children: [] };

      if (currentHeading?.indexOf(heading.text.replace("…", "")) == 0) {
        newHeading.isSelected = true;
      }

      parent.children.push(newHeading);
      stack.push(newHeading);
    });
    return nestedHeadings;
  }

  $: nestedHeadings = createNestedHeadings(flattenedHeadings);

  function handleSliderChange(value) {
    maxLevel = value[0];
  }

  function scrollToHeading(heading) {
    // This function needs to be adjusted based on how you want to handle scrolling
    // with the new outline structure
    alert(JSON.stringify(heading));
  }
</script>

<div class="h-full overflow-y-auto">
  <div>
    <label for="max-level-slider" class="text-sm text-gray-500 block mb-2">
      Outline Level: {maxLevel}
    </label>
    <Slider
      id="max-level-slider"
      value={[maxLevel]}
      onValueChange={handleSliderChange}
      max={4}
      min={1}
      step={1}
      class="w-[90%]"
    />
  </div>

  <div class="mt-4">
    {#each nestedHeadings as heading (heading.pos)}
      <TOCItem
        {heading}
        {maxLevel}
        {scrollToHeading}
        on:loadBlock={handleLoadBlock}
      />
    {/each}
  </div>
</div>

<style>
  :global(#max-level-slider) {
    @apply bg-white h-1 shadow-lg;
  }
  :global(#max-level-slider span) {
    @apply bg-white  shadow-lg;
  }
  :global(.slider-track) {
    @apply h-1 bg-gray-300 rounded-full shadow-md;
  }
  :global(.slider-range) {
    @apply h-2 bg-black rounded-full;
  }
  :global(.slider-thumb) {
    @apply w-5 h-5 bg-black border-2 border-white rounded-full shadow-lg;
  }
</style>
