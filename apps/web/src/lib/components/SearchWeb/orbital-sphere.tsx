"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

type ColorScheme =
  | "Single"
  | "Dual"
  | "Complementary"
  | "Triadic"
  | "Analogous"
  | "Split"
  | "Tetradic"
  | "Monochromatic"
  | "Warm"
  | "Cool"
  | "Neon"
  | "Sunset"
  | "Ocean"
  | "Forest"
  | "Galaxy"
  | "Fire"
  | "Ice"
  | "Cyberpunk"
  | "Pastel"
  | "Vintage"
  | "Gradient"
  | "Electric"

interface OrbitalSphereConfig {
  minLines?: number
  maxLines?: number
  minSphereSize?: number
  maxSphereSize?: number
  minLineWidth?: number
  maxLineWidth?: number
  minGlowIntensity?: number
  maxGlowIntensity?: number
  minRotationSpeed?: number
  maxRotationSpeed?: number
  minSaturation?: number
  maxSaturation?: number
  minLightness?: number
  maxLightness?: number
  autoRandomizeMin?: number
  autoRandomizeMax?: number
  opacity?: number
}

interface OrbitalLine {
  id: number
  angleX: number
  angleY: number
  angleZ: number
  hue: number
  speed: number
  customLightness?: number
}

interface SphereData {
  lines: OrbitalLine[]
  sphereSize: number
  lineWidth: number
  glowIntensity: number
  rotationSpeed: number
  saturation: number
  lightness: number
  colorScheme: ColorScheme
}

interface HoverEffects {
  hueShift: number
  saturationBoost: number
  lightnessShift: number
  glowMultiplier: number
  speedMultiplier: number
  scaleMultiplier: number
}

interface LineStyle {
  transform: string
  borderColor: string
  borderWidth: string
  boxShadow: string
  animationDuration: string
  zIndex: number
}

interface OrbitalSphereProps {
  config?: OrbitalSphereConfig
  autoRandomize?: boolean
  className?: string
  onSphereClick?: () => void
}

const OrbitalSphere: React.FC<OrbitalSphereProps> = ({
  config: customConfig = {},
  autoRandomize = true,
  className = "",
  onSphereClick,
}) => {
  const defaultConfig: OrbitalSphereConfig = {
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
    opacity: 0.75,
  }

  const config = { ...defaultConfig, ...customConfig }

  // Seeded random number generator
  let seed = useRef(Date.now() % 2147483647).current

  const random = useCallback((): number => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }, [])

  const randomRange = useCallback((min: number, max: number): number => min + random() * (max - min), [random])

  const randomInt = useCallback(
    (min: number, max: number): number => Math.floor(randomRange(min, max + 1)),
    [randomRange],
  )

  const colorSchemes: Record<ColorScheme, (index: number, total: number, baseHue: number) => number> = {
    Single: (_, __, baseHue) => baseHue,
    Dual: (index, _, baseHue) => (index % 2 === 0 ? baseHue : (baseHue + 180) % 360),
    Complementary: (index, _, baseHue) => (index % 2 === 0 ? baseHue : (baseHue + 180) % 360),
    Triadic: (index, _, baseHue) => baseHue + (index % 3) * 120,
    Analogous: (index, _, baseHue) => (baseHue + index * 30) % 360,
    Split: (index, _, baseHue) => {
      const angles = [0, 150, 210]
      return (baseHue + angles[index % 3]) % 360
    },
    Tetradic: (index, _, baseHue) => baseHue + (index % 4) * 90,
    Monochromatic: (_, __, baseHue) => baseHue,
    Warm: () => randomRange(0, 60) + (randomInt(0, 1) % 2) * 300,
    Cool: () => randomRange(180, 270),
    Neon: (index) => {
      const neonHues = [300, 60, 120, 180, 240, 0]
      return neonHues[index % neonHues.length]
    },
    Sunset: (index) => {
      const sunsetHues = [15, 30, 45, 330, 345]
      return sunsetHues[index % sunsetHues.length]
    },
    Ocean: (index) => {
      const oceanHues = [180, 200, 220, 240, 160]
      return oceanHues[index % oceanHues.length]
    },
    Forest: (index) => {
      const forestHues = [120, 140, 90, 100, 80]
      return forestHues[index % forestHues.length]
    },
    Galaxy: (index) => {
      const galaxyHues = [240, 280, 300, 260, 220]
      return galaxyHues[index % galaxyHues.length]
    },
    Fire: (index) => {
      const fireHues = [0, 15, 30, 45, 60]
      return fireHues[index % fireHues.length]
    },
    Ice: (index) => {
      const iceHues = [180, 190, 200, 210, 220]
      return iceHues[index % iceHues.length]
    },
    Cyberpunk: (index) => {
      const cyberpunkHues = [300, 180, 60, 320, 200]
      return cyberpunkHues[index % cyberpunkHues.length]
    },
    Pastel: () => random() * 360,
    Vintage: (index) => {
      const vintageHues = [30, 45, 60, 200, 220]
      return vintageHues[index % vintageHues.length]
    },
    Gradient: (index, total, baseHue) => (baseHue + (index / total) * 60) % 360,
    Electric: (index) => {
      const electricHues = [60, 120, 180, 240, 300]
      return electricHues[index % electricHues.length]
    },
  }

  const colorSchemeNames: ColorScheme[] = Object.keys(colorSchemes) as ColorScheme[]

  const generateSphereConfig = useCallback((): SphereData => {
    const lineCount = randomInt(config.minLines!, config.maxLines!)
    const sphereSize = randomInt(config.minSphereSize!, config.maxSphereSize!)
    const lineWidth = randomRange(config.minLineWidth!, config.maxLineWidth!)
    const glowIntensity = randomRange(config.minGlowIntensity!, config.maxGlowIntensity!)
    const rotationSpeed = randomRange(config.minRotationSpeed!, config.maxRotationSpeed!)

    const colorSchemeName = colorSchemeNames[randomInt(0, colorSchemeNames.length - 1)]
    const colorSchemeFunc = colorSchemes[colorSchemeName]

    let saturation = randomInt(config.minSaturation!, config.maxSaturation!)
    let lightness = randomInt(config.minLightness!, config.maxLightness!)

    if (colorSchemeName === "Pastel") {
      saturation = randomInt(30, 50)
      lightness = randomInt(70, 85)
    } else if (colorSchemeName === "Neon" || colorSchemeName === "Electric") {
      saturation = randomInt(85, 100)
      lightness = randomInt(50, 70)
    } else if (colorSchemeName === "Vintage") {
      saturation = randomInt(40, 60)
      lightness = randomInt(40, 60)
    } else if (colorSchemeName === "Monochromatic") {
      lightness = randomInt(30, 80)
    }

    const baseHue = random() * 360

    const lines: OrbitalLine[] = []
    for (let i = 0; i < lineCount; i++) {
      const hue = colorSchemeFunc(i, lineCount, baseHue)
      let lineLightness = lightness

      if (colorSchemeName === "Monochromatic") {
        lineLightness = randomInt(30, 80)
      }

      lines.push({
        id: i,
        angleX: random() * 360,
        angleY: random() * 360,
        angleZ: random() * 360,
        hue,
        speed: randomRange(0.5, 1.5),
        customLightness: colorSchemeName === "Monochromatic" ? lineLightness : undefined,
      })
    }

    return {
      lines,
      sphereSize,
      lineWidth,
      glowIntensity,
      rotationSpeed,
      saturation,
      lightness,
      colorScheme: colorSchemeName,
    }
  }, [randomInt, randomRange, random])

  const [sphereData, setSphereData] = useState<SphereData>(generateSphereConfig())
  const [hueShift, setHueShift] = useState(0)
  const [hoveredLineId, setHoveredLineId] = useState<number | null>(null)
  const [hoverEffects, setHoverEffects] = useState<HoverEffects | null>(null)
  const sphereRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoRandomize) {
      const scheduleNext = () => {
        setSphereData(generateSphereConfig())
        const delay = randomRange(config.autoRandomizeMin!, config.autoRandomizeMax!)
        setTimeout(scheduleNext, delay)
      }

      const scheduleHueShift = () => {
        setHueShift((prev) => (prev + randomRange(10, 50)) % 360)
        const delay = randomRange(2000, 6000)
        setTimeout(scheduleHueShift, delay)
      }

      scheduleNext()
      scheduleHueShift()
    }
  }, [autoRandomize])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!sphereRef.current) return

      const sphereRect = sphereRef.current.getBoundingClientRect()
      const isOverSphere =
        event.clientX >= sphereRect.left &&
        event.clientX <= sphereRect.right &&
        event.clientY >= sphereRect.top &&
        event.clientY <= sphereRect.bottom

      if (!isOverSphere) {
        setHoveredLineId(null)
        return
      }

      const elementFromPoint = document.elementFromPoint(event.clientX, event.clientY)
      if (elementFromPoint && (elementFromPoint as HTMLElement).dataset.lineId) {
        const lineId = Number.parseInt((elementFromPoint as HTMLElement).dataset.lineId!)
        if (lineId !== hoveredLineId) {
          setHoveredLineId(lineId)
          setHoverEffects({
            hueShift: randomRange(-90, 90),
            saturationBoost: randomRange(10, 30),
            lightnessShift: randomRange(-20, 20),
            glowMultiplier: randomRange(1.5, 3),
            speedMultiplier: randomRange(0.3, 2.5),
            scaleMultiplier: randomRange(1.1, 1.4),
          })
        }
      } else {
        setHoveredLineId(null)
      }
    },
    [hoveredLineId, randomRange],
  )

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  const getLineStyle = (line: OrbitalLine): LineStyle => {
    const isHovered = hoveredLineId === line.id
    let finalHue = (line.hue + hueShift) % 360
    let finalSaturation = sphereData.saturation
    let finalLightness = line.customLightness || sphereData.lightness
    let finalGlow = sphereData.glowIntensity
    let finalSpeed = sphereData.rotationSpeed * line.speed
    let finalScale = 1

    if (isHovered && hoverEffects) {
      finalHue = (finalHue + hoverEffects.hueShift) % 360
      finalSaturation = Math.min(100, finalSaturation + hoverEffects.saturationBoost)
      finalLightness = Math.max(0, Math.min(100, finalLightness + hoverEffects.lightnessShift))
      finalGlow *= hoverEffects.glowMultiplier
      finalSpeed *= hoverEffects.speedMultiplier
      // Removed the scale multiplier so hovered orbitals don't enlarge
      finalScale = 1
    }

    const color = `hsla(${finalHue}, ${finalSaturation}%, ${finalLightness}%, ${config.opacity})`

    return {
      transform: `rotateX(${line.angleX}deg) rotateY(${line.angleY}deg) rotateZ(${line.angleZ}deg) scale(${finalScale})`,
      borderColor: color,
      borderWidth: `${sphereData.lineWidth}px`,
      boxShadow: `0 0 ${finalGlow}px ${color}`,
      animationDuration: `${finalSpeed}s`,
      zIndex: isHovered ? 10 : 1,
    }
  }

  return (
    <div className={`relative w-full h-full flex justify-center items-center p-2.5 overflow-hidden ${className}`}>
      <div className="absolute top-2 left-2 text-xs opacity-50 pointer-events-none z-20">
        {/* Color scheme indicator */}
      </div>

      <div className="relative z-10 cursor-pointer" onClick={onSphereClick} ref={sphereRef}>
        <motion.div
          className="relative orbital-sphere"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
            width: sphereData.sphereSize,
            height: sphereData.sphereSize,
          }}
          animate={{
            rotateX: 360,
            rotateY: 360,
            rotateZ: 360,
          }}
          transition={{
            duration: sphereData.rotationSpeed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {sphereData.lines.map((line) => {
            const lineStyle = getLineStyle(line)
            return (
              <motion.div
                key={line.id}
                className="absolute inset-0 rounded-full border-solid orbital-line"
                data-line-id={line.id}
                style={{
                  borderColor: lineStyle.borderColor,
                  borderWidth: lineStyle.borderWidth,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  boxShadow: lineStyle.boxShadow,
                  transform: lineStyle.transform,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                initial={{
                  boxShadow: lineStyle.boxShadow,
                  transform: lineStyle.transform,
                }}
              />
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default OrbitalSphere
