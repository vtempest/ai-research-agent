<script>
    import { onMount, onDestroy } from 'svelte';
  
    let lines = [];
    let rotationSpeed;
    let lineColor;
    let sphereSize;
    let lineWidth;
    let glowIntensity;
    let rotationDirection;
    let intervalId;

    /**
     * Parabolic spherical orbital, inspired by quantum superposition and the 
     * [wave function collapse](https://en.wikipedia.org/wiki/Wave_function_collapse).
    */
    function randomizeSphere() {
      const lineCount = Math.floor(Math.random() * 26) + 5; // 5 to 20 lines
      const hue = Math.random() * 360;
      const saturation = Math.floor(Math.random() * 30) + 70; // 70% to 100%
      const lightness = Math.floor(Math.random() * 30) + 40; // 40% to 70%
      lineColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`;
      sphereSize = Math.floor(Math.random() * 100) + 150; // 150 to 250 pixels
      lineWidth = Math.random() * 2 + 0.5; // 0.5 to 2.5 pixels
      glowIntensity = Math.random() * 10 + 5; // 5 to 15 pixels
      rotationDirection = Math.random() < 0.5 ? 'normal' : 'reverse';
  
      lines = Array.from({ length: lineCount }, () => ({
        angleX: Math.random() * 360,
        angleY: Math.random() * 360,
        rotationSpeed: Math.random() * 8 + 1.5 // 1 to 6 seconds
      }));
    }
  
    onMount(() => {
      randomizeSphere();
      intervalId = setInterval(randomizeSphere, 20000); // Change every 20 seconds
    });
  
    onDestroy(() => {
      if (intervalId) clearInterval(intervalId);
    });
  
    function handleClick(event) {
      const target = event.target;
      if (target.classList.contains('line')) {
        const newHue = Math.random() * 360;
        target.style.borderColor = `hsla(${newHue}, 70%, 50%, 0.6)`;
      }
    }
  </script>
  
  <div class="w-full h-full p-3 flex justify-center items-center overflow-hidden" on:click={handleClick}>
    <div class="sphere" style="
      animation-duration: {rotationSpeed}s; 
      width: {sphereSize}px; 
      height: {sphereSize}px;
      animation-direction: {rotationDirection};
    ">
      {#each lines as line}
        <div class="line absolute inset-0 rounded-full" style="
          transform: rotateX({line.angleX}deg) rotateY({line.angleY}deg);
          border-color: {lineColor};
          border-width: {lineWidth}px;
          box-shadow: 0 0 {glowIntensity}px currentColor;
          animation-duration: {line.rotationSpeed}s;
        "></div>
      {/each}
    </div>
  </div>
  
  <style>
    .sphere {
      position: relative;
      transform-style: preserve-3d;
      animation: rotate infinite linear;
    }
  
    .line {
      border-style: solid;
      animation: rotate-line infinite linear;
    }
  
    @keyframes rotate {
      from { transform: rotateX(0deg) rotateY(0deg); }
      to { transform: rotateX(360deg) rotateY(360deg); }
    }
  
    @keyframes rotate-line {
      from { transform: rotateX(0deg) rotateY(0deg); }
      to { transform: rotateX(360deg) rotateY(360deg); }
    }
  
    :global(body), :global(html) {
      @apply m-0 p-0 w-full h-full;
    }
  
    :global(*) {
      @apply box-border;
    }
  </style>