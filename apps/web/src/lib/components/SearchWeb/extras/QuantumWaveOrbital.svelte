<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { 
    OrbitalSphereConfig, 
    OrbitalLine, 
    SphereData, 
    HoverEffects, 
    LineStyle,
    OrbitalSphereProps,
    RandomFunction,
    RandomRangeFunction,
    RandomIntFunction,
    ColorScheme
  } from './QuantumSphere.d.ts';

    /**
     * Parabolic spherical orbital, inspired by quantum superposition of atomic orbitals and the 
     * [wave function collapse](https://en.wikipedia.org/wiki/Wave_function_collapse).
     * @author [vtempest](https://github.com/vtempest)
      Quantum superposition principle allows particles to occupy multiple quantum states
       simultaneously until measured: in this case, hovering over with mouse changes electron orbit.

     */
  
  
  let {
    config = {
      minLines: 6,
      maxLines: 12,
      minSphereSize: 120,
      maxSphereSize: 180,
      minLineWidth: 0.8,
      maxLineWidth: 1.6,
      minGlowIntensity: 6,
      maxGlowIntensity: 12,
      minRotationSpeed: 2,
      maxRotationSpeed: 15,
      minSaturation: 70,
      maxSaturation: 90,
      minLightness: 50,
      maxLightness: 70,
      autoRandomizeMin: 5000,
      autoRandomizeMax: 12000,
      opacity: 0.75
    },
    autoRandomize = true,
    className = "",
    onSphereClick = null
  } = $props() as OrbitalSphereProps;

  // Simple random number generator with seed
  let seed: number = Date.now() % 2147483647;
  const random = (): number => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const randomRange = (min: number, max: number): number => min + random() * (max - min);
  const randomInt = (min: number, max: number): number => Math.floor(randomRange(min, max + 1));

  // Enhanced color scheme definitions
  const colorSchemes = {
    Single: (index: number, total: number, baseHue: number) => baseHue,
    Dual: (index: number, total: number, baseHue: number) => 
      index % 2 === 0 ? baseHue : (baseHue + 180) % 360,
    // Rainbow: (index: number, total: number) => (index / total) * 360,
    // Random: () => random() * 360,
    Complementary: (index: number, total: number, baseHue: number) => 
      index % 2 === 0 ? baseHue : (baseHue + 180) % 360,
    Triadic: (index: number, total: number, baseHue: number) => 
      baseHue + (index % 3) * 120,
    Analogous: (index: number, total: number, baseHue: number) => 
      (baseHue + (index * 30)) % 360,
    Split: (index: number, total: number, baseHue: number) => {
      const angles = [0, 150, 210];
      return (baseHue + angles[index % 3]) % 360;
    },
    Tetradic: (index: number, total: number, baseHue: number) => 
      baseHue + (index % 4) * 90,
    Monochromatic: (index: number, total: number, baseHue: number) => baseHue,
    Warm: (index: number, total: number) => 
      randomRange(0, 60) + (index % 2) * 300, // Reds, oranges, yellows
    Cool: (index: number, total: number) => 
      randomRange(180, 270), // Blues, greens, purples
    Neon: (index: number, total: number) => {
      const neonHues = [300, 60, 120, 180, 240, 0]; // Magenta, lime, cyan, etc.
      return neonHues[index % neonHues.length];
    },
    Sunset: (index: number, total: number) => {
      const sunsetHues = [15, 30, 45, 330, 345]; // Oranges, reds, pinks
      return sunsetHues[index % sunsetHues.length];
    },
    Ocean: (index: number, total: number) => {
      const oceanHues = [180, 200, 220, 240, 160]; // Blues and teals
      return oceanHues[index % oceanHues.length];
    },
    Forest: (index: number, total: number) => {
      const forestHues = [120, 140, 90, 100, 80]; // Greens
      return forestHues[index % forestHues.length];
    },
    Galaxy: (index: number, total: number) => {
      const galaxyHues = [240, 280, 300, 260, 220]; // Purples and deep blues
      return galaxyHues[index % galaxyHues.length];
    },
    Fire: (index: number, total: number) => {
      const fireHues = [0, 15, 30, 45, 60]; // Reds, oranges, yellows
      return fireHues[index % fireHues.length];
    },
    Ice: (index: number, total: number) => {
      const iceHues = [180, 190, 200, 210, 220]; // Light blues and cyans
      return iceHues[index % iceHues.length];
    },
    Cyberpunk: (index: number, total: number) => {
      const cyberpunkHues = [300, 180, 60, 320, 200]; // Magenta, cyan, lime
      return cyberpunkHues[index % cyberpunkHues.length];
    },
    Pastel: (index: number, total: number) => random() * 360, // Will use reduced saturation
    Vintage: (index: number, total: number) => {
      const vintageHues = [30, 45, 60, 200, 220]; // Warm browns and muted blues
      return vintageHues[index % vintageHues.length];
    },
    Gradient: (index: number, total: number, baseHue: number) => 
      (baseHue + (index / total) * 60) % 360, // Smooth gradient over 60 degrees
    Electric: (index: number, total: number) => {
      const electricHues = [60, 120, 180, 240, 300]; // Bright saturated colors
      return electricHues[index % electricHues.length];
    }
  };

  const colorSchemeNames = Object.keys(colorSchemes) as ColorScheme[];

   /**
     * Parabolic spherical orbital, inspired by quantum superposition and the 
     * [wave function collapse](https://en.wikipedia.org/wiki/Wave_function_collapse).
     * @author [vtempest (2025)](https://github.com/vtempest)
     */
  function generateSphereConfig(cfg: OrbitalSphereConfig = config): SphereData {
    const lineCount = randomInt(cfg.minLines, cfg.maxLines);
    const sphereSize = randomInt(cfg.minSphereSize, cfg.maxSphereSize);
    const lineWidth = randomRange(cfg.minLineWidth, cfg.maxLineWidth);
    const glowIntensity = randomRange(cfg.minGlowIntensity, cfg.maxGlowIntensity);
    const rotationSpeed = randomRange(cfg.minRotationSpeed, cfg.maxRotationSpeed);
    
    // Select random color scheme
    const colorSchemeName = colorSchemeNames[randomInt(0, colorSchemeNames.length - 1)];
    const colorSchemeFunc = colorSchemes[colorSchemeName];
    
    // Base color configuration
    let saturation = randomInt(cfg.minSaturation, cfg.maxSaturation);
    let lightness = randomInt(cfg.minLightness, cfg.maxLightness);
    
    // Adjust saturation and lightness for specific schemes
    if (colorSchemeName === 'Pastel') {
      saturation = randomInt(30, 50); // Lower saturation for pastels
      lightness = randomInt(70, 85); // Higher lightness for pastels
    } else if (colorSchemeName === 'Neon' || colorSchemeName === 'Electric') {
      saturation = randomInt(85, 100); // Maximum saturation for neon/electric
      lightness = randomInt(50, 70);
    } else if (colorSchemeName === 'Vintage') {
      saturation = randomInt(40, 60); // Muted saturation for vintage
      lightness = randomInt(40, 60);
    } else if (colorSchemeName === 'Monochromatic') {
      // Vary lightness for monochromatic schemes
      lightness = randomInt(30, 80);
    }

    const baseHue = random() * 360;

    // Generate line data with enhanced color schemes
    const lines: OrbitalLine[] = [];
    for (let i = 0; i < lineCount; i++) {
      let hue = colorSchemeFunc(i, lineCount, baseHue);
      
      // Special handling for monochromatic - vary lightness instead of hue
      let lineLightness = lightness;
      if (colorSchemeName === 'Monochromatic') {
        lineLightness = randomInt(30, 80);
      }

      lines.push({
        id: i,
        angleX: random() * 360,
        angleY: random() * 360,
        angleZ: random() * 360,
        hue,
        speed: randomRange(0.5, 1.5),
        customLightness: colorSchemeName === 'Monochromatic' ? lineLightness : undefined
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

  // State variables
  let sphereData = $state<SphereData>(generateSphereConfig(config));
  let hueShift = $state<number>(0);
  let hoveredLineId = $state<number | null>(null);
  let hoverEffects = $state<HoverEffects>({} as HoverEffects);
  let sphereRef: HTMLElement | null = $state(null);
  let timeoutId: number | null = null;
  let hueTimeoutId: number | null = null;

  const randomizeSphere = (): void => {
    sphereData = generateSphereConfig(config);
  };

  const shiftHue = (): void => {
    hueShift = (hueShift + randomRange(10, 50)) % 360;
  };

  const handleMouseMove = (event: MouseEvent): void => {
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
    if (elementFromPoint && (elementFromPoint as HTMLElement).dataset.lineId) {
      const lineId = parseInt((elementFromPoint as HTMLElement).dataset.lineId!);
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

  const handleSphereClick = (event: MouseEvent): void => {
    if (onSphereClick) {
      onSphereClick();
    }
  };

  // Derived function to calculate line styles
  const getLineStyle = (line: OrbitalLine): LineStyle => {
    const isHovered = hoveredLineId === line.id;
    let finalHue = (line.hue + hueShift) % 360;
    let finalSaturation = sphereData.saturation;
    let finalLightness = line.customLightness || sphereData.lightness;
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

  onMount(() => {
    // Add global mouse event listener
    document.addEventListener('mousemove', handleMouseMove);

    if (autoRandomize) {
      const scheduleNext = () => {
        randomizeSphere();
        const delay = randomRange(config.autoRandomizeMin, config.autoRandomizeMax);
        timeoutId = window.setTimeout(scheduleNext, delay);
      };

      const scheduleHueShift = () => {
        shiftHue();
        const delay = randomRange(2000, 6000);
        hueTimeoutId = window.setTimeout(scheduleHueShift, delay);
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
</script>

<div class="relative w-full h-full flex justify-center items-center p-2.5 overflow-hidden {className}">
  <!-- Color scheme indicator (optional debug info) -->
  <div class="absolute top-2 left-2 text-xs opacity-50 pointer-events-none z-20">
    <!-- {sphereData.colorScheme} -->
  </div>
  
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="relative z-10" onclick={handleSphereClick} bind:this={sphereRef}>
    <div 
      class="relative cursor-pointer orbital-sphere"
      style="
        transform-style: preserve-3d;
        animation: orbitalSpin {sphereData.rotationSpeed}s infinite linear;
        width: {sphereData.sphereSize}px;
        height: {sphereData.sphereSize}px;
      "
    >
      {#each sphereData.lines as line (line.id)}
        {@const lineStyle = getLineStyle(line)}
        <div
          class="absolute inset-0 rounded-full border-solid transition-all duration-200 ease-in-out orbital-line"
          data-line-id={line.id}
          style="
            transform: {lineStyle.transform};
            border-color: {lineStyle.borderColor};
            border-width: {lineStyle.borderWidth};
            box-shadow: {lineStyle.boxShadow};
            animation-duration: {lineStyle.animationDuration};
            z-index: {lineStyle.zIndex};
          "
        ></div>
      {/each}
    </div>
  </div>
</div>

<style>
  .orbital-sphere {
    perspective: 1000px;
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

  .orbital-line {
    animation: orbitalLineSpin infinite linear;
  }
</style>