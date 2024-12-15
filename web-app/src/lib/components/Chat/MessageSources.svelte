<script lang="ts">
    import { fade, scale } from 'svelte/transition';
  
    export let sources: any[];
  
    let isDialogOpen = false;
  
    function closeModal() {
      isDialogOpen = false;
      document.body.classList.remove('overflow-hidden-scrollable');
    }
  
    function openModal() {
      isDialogOpen = true;
      document.body.classList.add('overflow-hidden-scrollable');
    }
  </script>
  
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
    {#each sources.slice(0, 3) as source, i}
      <a
        class="bg-light-100 hover:bg-light-200 dark:bg-dark-100 dark:hover:bg-dark-200 transition duration-200 rounded-lg p-3 flex flex-col space-y-2 font-medium"
        href={source.metadata.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p class="dark:text-white text-xs overflow-hidden whitespace-nowrap text-ellipsis">
          {source.metadata.title}
        </p>
        <div class="flex flex-row items-center justify-between">
          <div class="flex flex-row items-center space-x-1">
            <img
              src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
              width={16}
              height={16}
              alt="favicon"
              class="rounded-lg h-4 w-4"
            />
            <p class="text-xs text-black/50 dark:text-white/50 overflow-hidden whitespace-nowrap text-ellipsis">
              {source.metadata.url.replace(/.+\/\/|www.|\..+/g, '')}
            </p>
          </div>
          <div class="flex flex-row items-center space-x-1 text-black/50 dark:text-white/50 text-xs">
            <div class="bg-black/50 dark:bg-white/50 h-[4px] w-[4px] rounded-full"></div>
            <span>{i + 1}</span>
          </div>
        </div>
      </a>
    {/each}
    {#if sources.length > 3}
      <button
        on:click={openModal}
        class="bg-light-100 hover:bg-light-200 dark:bg-dark-100 dark:hover:bg-dark-200 transition duration-200 rounded-lg p-3 flex flex-col space-y-2 font-medium"
      >
        <div class="flex flex-row items-center space-x-1">
          {#each sources.slice(3, 6) as source, i}
            <img
              src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
              width={16}
              height={16}
              alt="favicon"
              class="rounded-lg h-4 w-4"
            />
          {/each}
        </div>
        <p class="text-xs text-black/50 dark:text-white/50">
          View {sources.length - 3} more
        </p>
      </button>
    {/if}
  </div>
  
  {#if isDialogOpen}
    <div class="relative z-50" transition:fade>
      <div class="fixed inset-0 bg-black/30" on:click={closeModal}></div>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <div
            class="w-full max-w-md transform rounded-2xl bg-light-secondary dark:bg-dark-secondary border border-light-200 dark:border-dark-200 p-6 text-left align-middle shadow-xl"
            transition:scale={{ duration: 200 }}
          >
            <h3 class="text-lg font-medium leading-6 dark:text-white">
              Sources
            </h3>
            <div class="grid grid-cols-2 gap-2 overflow-auto max-h-[300px] mt-2 pr-2">
              {#each sources as source, i}
                <a
                  class="bg-light-secondary hover:bg-light-200 dark:bg-dark-secondary dark:hover:bg-dark-200 border border-light-200 dark:border-dark-200 transition duration-200 rounded-lg p-3 flex flex-col space-y-2 font-medium"
                  href={source.metadata.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p class="dark:text-white text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                    {source.metadata.title}
                  </p>
                  <div class="flex flex-row items-center justify-between">
                    <div class="flex flex-row items-center space-x-1">
                      <img
                        src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                        width={16}
                        height={16}
                        alt="favicon"
                        class="rounded-lg h-4 w-4"
                      />
                      <p class="text-xs text-black/50 dark:text-white/50 overflow-hidden whitespace-nowrap text-ellipsis">
                        {source.metadata.url.replace(/.+\/\/|www.|\..+/g, '')}
                      </p>
                    </div>
                    <div class="flex flex-row items-center space-x-1 text-black/50 dark:text-white/50 text-xs">
                      <div class="bg-black/50 dark:bg-white/50 h-[4px] w-[4px] rounded-full"></div>
                      <span>{i + 1}</span>
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}