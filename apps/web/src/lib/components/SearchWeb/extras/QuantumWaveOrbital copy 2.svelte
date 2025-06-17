<script>
  import { onMount, onDestroy } from 'svelte';
  /**
     * Parabolic spherical orbital, inspired by quantum superposition and the 
     * [wave function collapse](https://en.wikipedia.org/wiki/Wave_function_collapse).
     * @author [vtempest (2025)](https://airesearch.js.org)
     * @returns {void}
     */
  export let config = {
    minLines: 6,
    maxLines: 12,
    minSphereSize: 120,
    maxSphereSize: 180,
    minLineWidth: 0.8,
    maxLineWidth: 1.6,
    minGlowIntensity: 6,
    maxGlowIntensity: 12,
    minRotationSpeed: 10,
    maxRotationSpeed: 40,
    minSaturation: 70,
    maxSaturation: 90,
    minLightness: 50,
    maxLightness: 70,
    autoRandomizeMin: 5000,
    autoRandomizeMax: 12000,
    opacity: 0.75
  };
  export let autoRandomize = true;
  export let className = "";
  export let onSphereClick = null;

  // Simple random number generator with seed
  let seed = Date.now() % 2147483647;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const randomRange = (min, max) => min + random() * (max - min);
  const randomInt = (min, max) => Math.floor(randomRange(min, max + 1));

  function generateSphereConfig(cfg = config) {
    const lineCount = randomInt(cfg.minLines, cfg.maxLines);
    const sphereSize = randomInt(cfg.minSphereSize, cfg.maxSphereSize);
    const lineWidth = randomRange(cfg.minLineWidth, cfg.maxLineWidth);
    const glowIntensity = randomRange(cfg.minGlowIntensity, cfg.maxGlowIntensity);
    const rotationSpeed = randomRange(cfg.minRotationSpeed, cfg.maxRotationSpeed);
    
    // Simple color schemes
    const colorScheme = randomInt(0, 3);
    const saturation = randomInt(cfg.minSaturation, cfg.maxSaturation);
    const lightness = randomInt(cfg.minLightness, cfg.maxLightness);

    let baseHue, secondHue;
    let colorSchemeName;
    
    if (colorScheme === 0) {
      colorSchemeName = "Single";
      baseHue = random() * 360;
    } else if (colorScheme === 1) {
      colorSchemeName = "Dual";
      baseHue = random() * 360;
      secondHue = (baseHue + 180) % 360;
    } else if (colorScheme === 2) {
      colorSchemeName = "Rainbow";
      baseHue = 0; // Will be calculated per line
    } else {
      colorSchemeName = "Random";
      baseHue = 0; // Will be random per line
    }

    // Generate minimal line data
    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      let hue;
      if (colorScheme === 0) {
        hue = baseHue;
      } else if (colorScheme === 1) {
        hue = i % 2 === 0 ? baseHue : secondHue;
      } else if (colorScheme === 2) {
        hue = (i / lineCount) * 360;
      } else {
        hue = random() * 360;
      }

      lines.push({
        id: i,
        angleX: random() * 360,
        angleY: random() * 360,
        angleZ: random() * 360,
        hue,
        speed: randomRange(0.5, 1.5)
      });
    }

    return {
      lines,
      sphereSize,
      lineWidth,
      glowIntensity,
      rotationSpeed,
      saturation,
      lightness,
      colorScheme: colorSchemeName
    };
  }

  // Reactive variables
  let sphereData = generateSphereConfig(config);
  let hueShift = 0;
  let hoveredLineId = null;
  let hoverEffects = {};
  let sphereRef;
  let timeoutId;
  let hueTimeoutId;

  const randomizeSphere = () => {
    sphereData = generateSphereConfig(config);
  };

  const shiftHue = () => {
    hueShift = (hueShift + randomRange(10, 50)) % 360;
  };

  const handleMouseMove = (event) => {
    if (!sphereRef) return;

    const sphereRect = sphereRef.getBoundingClientRect();
    const isOverSphere = (
      event.clientX >= sphereRect.left &&
      event.clientX <= sphereRect.right &&
      event.clientY >= sphereRect.top &&
      event.clientY <= sphereRect.bottom
    );

    if (!isOverSphere) {
      hoveredLineId = null;
      return;
    }

    // Find which line element is being hovered
    const elementFromPoint = document.elementFromPoint(event.clientX, event.clientY);
    if (elementFromPoint && elementFromPoint.dataset.lineId) {
      const lineId = parseInt(elementFromPoint.dataset.lineId);
      if (lineId !== hoveredLineId) {
        hoveredLineId = lineId;
        // Generate random hover effects
        hoverEffects = {
          hueShift: randomRange(-90, 90),
          saturationBoost: randomRange(10, 30),
          lightnessShift: randomRange(-20, 20),
          glowMultiplier: randomRange(1.5, 3),
          speedMultiplier: randomRange(0.3, 2.5),
          scaleMultiplier: randomRange(1.1, 1.4)
        };
      }
    } else {
      hoveredLineId = null;
    }
  };

  const handleSphereClick = (event) => {
    if (onSphereClick) {
      onSphereClick();
    }
  };

  onMount(() => {
    // Add global mouse event listener
    document.addEventListener('mousemove', handleMouseMove);

    if (autoRandomize) {
      const scheduleNext = () => {
        randomizeSphere();
        const delay = randomRange(config.autoRandomizeMin, config.autoRandomizeMax);
        timeoutId = setTimeout(scheduleNext, delay);
      };

      const scheduleHueShift = () => {
        shiftHue();
        const delay = randomRange(2000, 6000);
        hueTimeoutId = setTimeout(scheduleHueShift, delay);
      };

      scheduleNext();
      scheduleHueShift();
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
      if (hueTimeoutId) clearTimeout(hueTimeoutId);
    };
  });

  onDestroy(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    if (timeoutId) clearTimeout(timeoutId);
    if (hueTimeoutId) clearTimeout(hueTimeoutId);
  });

  // Reactive function to calculate line styles
  $: getLineStyle = (line) => {
    const isHovered = hoveredLineId === line.id;
    let finalHue = (line.hue + hueShift) % 360;
    let finalSaturation = sphereData.saturation;
    let finalLightness = sphereData.lightness;
    let finalGlow = sphereData.glowIntensity;
    let finalSpeed = sphereData.rotationSpeed * line.speed;
    let finalScale = 1;

    if (isHovered) {
      finalHue = (finalHue + hoverEffects.hueShift) % 360;
      finalSaturation = Math.min(100, finalSaturation + hoverEffects.saturationBoost);
      finalLightness = Math.max(0, Math.min(100, finalLightness + hoverEffects.lightnessShift));
      finalGlow *= hoverEffects.glowMultiplier;
      finalSpeed *= hoverEffects.speedMultiplier;
      finalScale = hoverEffects.scaleMultiplier;
    }

    const color = `hsla(${finalHue}, ${finalSaturation}%, ${finalLightness}%, ${config.opacity})`;
    
    return {
      transform: `rotateX(${line.angleX}deg) rotateY(${line.angleY}deg) rotateZ(${line.angleZ}deg) scale(${finalScale})`,
      borderColor: color,
      borderWidth: `${sphereData.lineWidth}px`,
      boxShadow: `0 0 ${finalGlow}px ${color}`,
      animationDuration: `${finalSpeed}s`,
      zIndex: isHovered ? 10 : 1
    };
  };
</script>

<div class="orbital-container {className}">


  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="sphere-wrapper" on:click={handleSphereClick} bind:this={sphereRef}>
    <div 
      class="sphere"
      style="
        transform-style: preserve-3d;
        animation: orbitalSpin {sphereData.rotationSpeed}s infinite linear;
        width: {sphereData.sphereSize}px;
        height: {sphereData.sphereSize}px;
      "
    >
      {#each sphereData.lines as line (line.id)}
        <div
          class="orbital-line"
          data-line-id={line.id}
          style="
            transform: {getLineStyle(line).transform};
            border-color: {getLineStyle(line).borderColor};
            border-width: {getLineStyle(line).borderWidth};
            box-shadow: {getLineStyle(line).boxShadow};
            animation-duration: {getLineStyle(line).animationDuration};
            z-index: {getLineStyle(line).zIndex};
          "
        ></div>
      {/each}
    </div>
  </div>
</div>

<style>
  .orbital-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    overflow: hidden;
  }


  .sphere-wrapper {
    position: relative;
    z-index: 10;
  }

  .sphere {
    position: relative;
    cursor: pointer;
  }

  .orbital-line {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border-style: solid;
    transition: all 0.2s ease;
    animation: orbitalLineSpin infinite linear;
  }

  @keyframes orbitalSpin {
    from { 
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); 
    }
    to { 
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); 
    }
  }
  
  @keyframes orbitalLineSpin {
    from { 
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); 
    }
    to { 
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); 
    }
  }
</style>