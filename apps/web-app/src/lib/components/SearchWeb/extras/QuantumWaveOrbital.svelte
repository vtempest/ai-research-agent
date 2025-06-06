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
     * @returns {void}
     */
    export function randomizeSphere() {
      const lineCount = Math.floor(Math.random() * 26) + 5; // 5 to 20 lines
      const hue = Math.random() * 360;
      const saturation = Math.floor(Math.random() * 30) + 70; // 70% to 100%
      const lightness = Math.floor(Math.random() * 30) + 40; // 40% to 70%
      sphereSize = Math.floor(Math.random() * 100) + 150; // 150 to 250 pixels
      lineWidth = Math.random() * 2 + 0.5; // 0.5 to 2.5 pixels
      glowIntensity = Math.random() * 10 + 5; // 5 to 15 pixels
      rotationDirection = Math.random() < 0.5 ? 'normal' : 'reverse';
  
      const prng = new Rule30PRNG(Math.random()*50); // Seed with any number

      lines = Array.from({ length: lineCount }, () => ({
        angleX: Math.random() * 360,
        angleY: Math.random() * 360,
        lineColor: `hsla(${prng.nextInt()}, ${saturation}%, ${lightness}%, 0.6)`,
        rotationSpeed: Math.random() * 8 + 1.5 // 1 to 6 seconds
      }));
    }
  
    onMount(() => {
      const scheduleNextRandomization = () => {
        randomizeSphere();
        const nextDelay = Math.floor(Math.random() * 13000) + 2000; // Random delay between 3-20 seconds
        intervalId = setTimeout(scheduleNextRandomization, nextDelay);
      };
      
      scheduleNextRandomization();
    });
  
    onDestroy(() => {
      if (intervalId) clearTimeout(intervalId);
    });

    /***
 * Generates pseudorandom numbers using Wolfram's Rule 30
 *  chaotic behavior of the cellular automaton's center column. 
 * Rule 30 follows this transition logic for cell states:
 * Next state = left cell XOR (current cell OR right cell)
 *  111 → 0, 110 → 0, 101 → 0, 100 → 1,
 *  011 → 1, 010 → 1, 001 → 1, 000 → 0
 * @see [Demo](https://medium.com/@arpitbhayani/pseudorandom-numbers-using-rule-30-ff667b4dff4e)
 */
class Rule30PRNG {
  constructor(seed = Date.now()) {
        const binary = seed.toString(2).split('').map(Number);
    // Pad with zeros for evolution space
        this.state =  [...Array(16).fill(0), ...binary, ...Array(16).fill(0)];
  }

  nextBit() {
    const newState = [];
    for (let i = 0; i < this.state.length; i++) {
      const left = this.state[i-1] || 0;
      const center = this.state[i];
      const right = this.state[i+1] || 0;
      // Rule 30: left XOR (center OR right)
      newState.push(left ^ (center | right));
    }
    this.state = newState;
    return this.state[Math.floor(this.state.length/2)]; // Center bit
  }

  nextInt(bits = 8) {
    let result = 0;
    for (let i = 0; i < bits; i++) {
      result = (result << 1) | this.nextBit();
    }
    return result;
  }
}
    
    //change color on click
    function handleClickOnLine(event) {
        event.target.closest('.line').style.borderColor 
          = `hsla(${Math.random() * 360}, 70%, 50%, 0.6)`;
    }
  </script>
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="w-full h-full p-3 flex justify-center items-center overflow-hidden" onclick={handleClickOnLine}>
    <div class="sphere" style="
      animation-duration: {rotationSpeed}s; 
      width: {sphereSize}px; 
      height: {sphereSize}px;
      animation-direction: {rotationDirection};
    ">
      {#each lines as line}
        <div class="line absolute inset-0 rounded-full" style="
          transform: rotateX({line.angleX}deg) rotateY({line.angleY}deg);
          border-color: {line.lineColor};
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
  
  </style>