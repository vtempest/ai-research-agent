<script lang="ts">
  import { onMount } from "svelte";
  import TOCItem from "./TOCItem.svelte";
  import { Slider } from "$lib/components/ui/slider";
  
  let { editor, currentHeading, 
    mainContent, handleLoadBlock, 
    headingsOutline } = $props()

  let maxLevel = $state(3);
  let nestedHeadings = $derived(createNestedHeadings(flattenOutline(headingsOutline)));

  function flattenOutline(outline, level = 1) {
    let result = [];
    outline.forEach((item, index) => {
      result.push({
        level,
        text: item.h1Title || item.h2Title || item.h3Title || item.h4Title,
        blocks: item.h4s,
        pos: index,
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


  // This function needs to be adjusted based on how you want to handle scrolling
  // with the new outline structure
  function scrollToHeading(heading) {
    
    console.log(heading);
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
      onValueChange={(value)=>{maxLevel = value[0];}}
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
      />
    {/each}
  </div>
</div>
