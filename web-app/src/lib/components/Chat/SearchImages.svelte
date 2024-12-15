<script lang="ts">
    import { ImagesIcon, PlusIcon } from 'lucide-svelte';
    import {Lightbox} from 'svelte-lightbox';
  
    export let query: string;
    export let chat_history: Message[];
  
    type Image = {
      url: string;
      img_src: string;
      title: string;
    };
  
    let images: Image[] | null = null;
    let loading = false;
    let open = false;
    let slides: any[] = [];
  
    async function searchImages() {
      loading = true;
  
      const chatModelProvider = localStorage.getItem('chatModelProvider');
      const chatModel = localStorage.getItem('chatModel');
  
      const res = await fetch(
        `/images`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            chat_history,
            chat_model_provider: chatModelProvider,
            chat_model: chatModel,
          }),
        }
      );
  
      const data = await res.json();
  
      images = data.images;
      slides = images.map((image: Image) => ({
        src: image.img_src,
      }));
      loading = false;
    }
  
    function openLightbox(index: number) {
      open = true;
      slides = [
        slides[index],
        ...slides.slice(0, index),
        ...slides.slice(index + 1),
      ];
    }
  </script>
  
  {#if !loading && images === null}
    <button
      on:click={searchImages}
      class="border border-dashed border-light-200 dark:border-dark-200 hover:bg-light-200 dark:hover:bg-dark-200 active:scale-95 duration-200 transition px-4 py-2 flex flex-row items-center justify-between rounded-lg dark:text-white text-sm w-full"
    >
      <div class="flex flex-row items-center space-x-2">
        <ImagesIcon size={17} />
        <p>Search images</p>
      </div>
      <PlusIcon class="text-[#24A0ED]" size={17} />
    </button>
  {/if}
  
  {#if loading}
    <div class="grid grid-cols-2 gap-2">
      {#each Array(4) as _, i}
        <div
          class="bg-light-secondary dark:bg-dark-secondary h-32 w-full rounded-lg animate-pulse aspect-video object-cover"
        />
      {/each}
    </div>
  {/if}
  
  {#if images !== null && images.length > 0}
    <div class="grid grid-cols-2 gap-2">
      {#each images.length > 4 ? images.slice(0, 3) : images as image, i}
        <img
          on:click={() => openLightbox(i)}
          src={image.img_src}
          alt={image.title}
          class="h-full w-full aspect-video object-cover rounded-lg transition duration-200 active:scale-95 hover:scale-[1.02] cursor-zoom-in"
        />
      {/each}
      {#if images.length > 4}
        <button
          on:click={() => (open = true)}
          class="bg-light-100 hover:bg-light-200 dark:bg-dark-100 dark:hover:bg-dark-200 transition duration-200 active:scale-95 hover:scale-[1.02] h-auto w-full rounded-lg flex flex-col justify-between text-white p-2"
        >
          <div class="flex flex-row items-center space-x-1">
            {#each images.slice(3, 6) as image}
              <img
                src={image.img_src}
                alt={image.title}
                class="h-6 w-12 rounded-md lg:h-3 lg:w-6 lg:rounded-sm aspect-video object-cover"
              />
            {/each}
          </div>
          <p class="text-black/70 dark:text-white/70 text-xs">
            View {images.length - 3} more
          </p>
        </button>
      {/if}
    </div>
    <Lightbox bind:open images={slides} />
  {/if}