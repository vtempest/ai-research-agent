<script lang="ts">
    import { PlayCircle, VideoIcon, PlusIcon } from 'lucide-svelte';
    import { onMount } from 'svelte';
  
    export let query: string;
    export let chat_history: Message[];
  
    type Video = {
      url: string;
      img_src: string;
      title: string;
      iframe_src: string;
    };
  
    type VideoSlide = {
      type: 'video-slide';
      src: string;
      iframe_src: string;
    };
  
    let videos: Video[] | null = null;
    let loading = false;
    let open = false;
    let slides: VideoSlide[] = [];
    let currentSlideIndex = 0;
  
    async function searchVideos() {
      loading = true;
  
      const chatModelProvider = localStorage.getItem('chatModelProvider');
      const chatModel = localStorage.getItem('chatModel');
  
      const res = await fetch(
        
        `/videos`,
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
  
      videos = data.videos;
      slides = videos.map((video: Video) => ({
        type: 'video-slide',
        iframe_src: video.iframe_src,
        src: video.img_src,
      }));
      loading = false;
    }
  
    function openLightbox(index: number) {
      open = true;
      currentSlideIndex = index;
    }
  
    function closeLightbox() {
      open = false;
    }
  
    function nextSlide() {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    }
  
    function prevSlide() {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    }
  
    onMount(() => {
      const handleKeydown = (event: KeyboardEvent) => {
        if (open) {
          if (event.key === 'ArrowRight') nextSlide();
          if (event.key === 'ArrowLeft') prevSlide();
          if (event.key === 'Escape') closeLightbox();
        }
      };
  
      window.addEventListener('keydown', handleKeydown);
  
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    });
  </script>
  
  {#if !loading && videos === null}
    <button
      on:click={searchVideos}
      class="border border-dashed border-light-200 dark:border-dark-200 hover:bg-light-200 dark:hover:bg-dark-200 active:scale-95 duration-200 transition px-4 py-2 flex flex-row items-center justify-between rounded-lg dark:text-white text-sm w-full"
    >
      <div class="flex flex-row items-center space-x-2">
        <VideoIcon size={17} />
        <p>Search videos</p>
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
  
  {#if videos !== null && videos.length > 0}
    <div class="grid grid-cols-2 gap-2">
      {#each videos.length > 4 ? videos.slice(0, 3) : videos as video, i}
        <div
          on:click={() => openLightbox(i)}
          class="relative transition duration-200 active:scale-95 hover:scale-[1.02] cursor-pointer"
        >
          <img
            src={video.img_src}
            alt={video.title}
            class="relative h-full w-full aspect-video object-cover rounded-lg"
          />
          <div class="absolute bg-white/70 dark:bg-black/70 text-black/70 dark:text-white/70 px-2 py-1 flex flex-row items-center space-x-1 bottom-1 right-1 rounded-md">
            <PlayCircle size={15} />
            <p class="text-xs">Video</p>
          </div>
        </div>
      {/each}
      {#if videos.length > 4}
        <button
          on:click={() => openLightbox(0)}
          class="bg-light-100 hover:bg-light-200 dark:bg-dark-100 dark:hover:bg-dark-200 transition duration-200 active:scale-95 hover:scale-[1.02] h-auto w-full rounded-lg flex flex-col justify-between text-white p-2"
        >
          <div class="flex flex-row items-center space-x-1">
            {#each videos.slice(3, 6) as video}
              <img
                src={video.img_src}
                alt={video.title}
                class="h-6 w-12 rounded-md lg:h-3 lg:w-6 lg:rounded-sm aspect-video object-cover"
              />
            {/each}
          </div>
          <p class="text-black/70 dark:text-white/70 text-xs">
            View {videos.length - 3} more
          </p>
        </button>
      {/if}
    </div>
  {/if}
  
  {#if open}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="relative w-full h-full flex items-center justify-center">
        <button
          on:click={prevSlide}
          class="absolute left-4 text-white"
        >
          Previous
        </button>
        <iframe
          src={slides[currentSlideIndex].iframe_src}
          class="aspect-video max-h-[95vh] w-[95vw] rounded-2xl md:w-[80vw]"
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
        <button
          on:click={nextSlide}
          class="absolute right-4 text-white"
        >
          Next
        </button>
        <button
          on:click={closeLightbox}
          class="absolute top-4 right-4 text-white"
        >
          Close
        </button>
      </div>
    </div>
  {/if}