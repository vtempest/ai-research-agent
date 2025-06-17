[Documentation](../../../../modules.md) / lib/components/SearchWeb/extras/QuantumSphere

## Author

[vtempest (2025)](https://github.com/vtempest)

## OrbitalSphereConfig

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:11

Configuration object for the Quantum Wave Orbital component
Controls all aspects of the orbital sphere's appearance and behavior

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="minlines"></a> `minLines`

</td>
<td>

`number`

</td>
<td>

Minimum number of orbital lines to generate (default: 6)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:13

</td>
</tr>
<tr>
<td>

<a id="maxlines"></a> `maxLines`

</td>
<td>

`number`

</td>
<td>

Maximum number of orbital lines to generate (default: 12)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:16

</td>
</tr>
<tr>
<td>

<a id="minspheresize"></a> `minSphereSize`

</td>
<td>

`number`

</td>
<td>

Minimum sphere diameter in pixels (default: 120)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:19

</td>
</tr>
<tr>
<td>

<a id="maxspheresize"></a> `maxSphereSize`

</td>
<td>

`number`

</td>
<td>

Maximum sphere diameter in pixels (default: 180)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:22

</td>
</tr>
<tr>
<td>

<a id="minlinewidth"></a> `minLineWidth`

</td>
<td>

`number`

</td>
<td>

Minimum border width for orbital lines in pixels (default: 0.8)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:25

</td>
</tr>
<tr>
<td>

<a id="maxlinewidth"></a> `maxLineWidth`

</td>
<td>

`number`

</td>
<td>

Maximum border width for orbital lines in pixels (default: 1.6)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:28

</td>
</tr>
<tr>
<td>

<a id="minglowintensity"></a> `minGlowIntensity`

</td>
<td>

`number`

</td>
<td>

Minimum glow intensity for box-shadow effect in pixels (default: 6)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:31

</td>
</tr>
<tr>
<td>

<a id="maxglowintensity"></a> `maxGlowIntensity`

</td>
<td>

`number`

</td>
<td>

Maximum glow intensity for box-shadow effect in pixels (default: 12)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:34

</td>
</tr>
<tr>
<td>

<a id="minrotationspeed"></a> `minRotationSpeed`

</td>
<td>

`number`

</td>
<td>

Minimum rotation speed in seconds per full rotation (default: 0.5)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:37

</td>
</tr>
<tr>
<td>

<a id="maxrotationspeed"></a> `maxRotationSpeed`

</td>
<td>

`number`

</td>
<td>

Maximum rotation speed in seconds per full rotation (default: 2)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:40

</td>
</tr>
<tr>
<td>

<a id="minsaturation"></a> `minSaturation`

</td>
<td>

`number`

</td>
<td>

Minimum HSL saturation percentage (0-100) for colors (default: 70)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:43

</td>
</tr>
<tr>
<td>

<a id="maxsaturation"></a> `maxSaturation`

</td>
<td>

`number`

</td>
<td>

Maximum HSL saturation percentage (0-100) for colors (default: 90)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:46

</td>
</tr>
<tr>
<td>

<a id="minlightness"></a> `minLightness`

</td>
<td>

`number`

</td>
<td>

Minimum HSL lightness percentage (0-100) for colors (default: 50)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:49

</td>
</tr>
<tr>
<td>

<a id="maxlightness"></a> `maxLightness`

</td>
<td>

`number`

</td>
<td>

Maximum HSL lightness percentage (0-100) for colors (default: 70)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:52

</td>
</tr>
<tr>
<td>

<a id="autorandomizemin"></a> `autoRandomizeMin`

</td>
<td>

`number`

</td>
<td>

Minimum time in milliseconds before auto-randomizing sphere (default: 5000)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:55

</td>
</tr>
<tr>
<td>

<a id="autorandomizemax"></a> `autoRandomizeMax`

</td>
<td>

`number`

</td>
<td>

Maximum time in milliseconds before auto-randomizing sphere (default: 12000)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:58

</td>
</tr>
<tr>
<td>

<a id="opacity"></a> `opacity`

</td>
<td>

`number`

</td>
<td>

Overall opacity for all orbital lines (0-1) (default: 0.75)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:61

</td>
</tr>
</tbody>
</table>

***

## OrbitalLine

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:68

Individual orbital line data structure
Each line represents one orbital ring in the sphere

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

`number`

</td>
<td>

Unique identifier for the orbital line

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:70

</td>
</tr>
<tr>
<td>

<a id="anglex"></a> `angleX`

</td>
<td>

`number`

</td>
<td>

Initial X-axis rotation angle in degrees (0-360)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:73

</td>
</tr>
<tr>
<td>

<a id="angley"></a> `angleY`

</td>
<td>

`number`

</td>
<td>

Initial Y-axis rotation angle in degrees (0-360)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:76

</td>
</tr>
<tr>
<td>

<a id="anglez"></a> `angleZ`

</td>
<td>

`number`

</td>
<td>

Initial Z-axis rotation angle in degrees (0-360)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:79

</td>
</tr>
<tr>
<td>

<a id="hue"></a> `hue`

</td>
<td>

`number`

</td>
<td>

HSL hue value for this line's color (0-360)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:82

</td>
</tr>
<tr>
<td>

<a id="speed"></a> `speed`

</td>
<td>

`number`

</td>
<td>

Speed multiplier for this line's rotation (0.5-1.5)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:85

</td>
</tr>
<tr>
<td>

<a id="customlightness"></a> `customLightness`

</td>
<td>

`number`

</td>
<td>

Lightness in monochrome scheme

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:88

</td>
</tr>
</tbody>
</table>

***

## SphereData

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:95

Generated sphere configuration containing all computed values
Created by generateSphereConfig() function

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="lines"></a> `lines`

</td>
<td>

[`OrbitalLine`](#orbitalline)[]

</td>
<td>

Array of orbital line configurations

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:97

</td>
</tr>
<tr>
<td>

<a id="spheresize"></a> `sphereSize`

</td>
<td>

`number`

</td>
<td>

Computed sphere size in pixels

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:100

</td>
</tr>
<tr>
<td>

<a id="linewidth"></a> `lineWidth`

</td>
<td>

`number`

</td>
<td>

Computed line width in pixels

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:103

</td>
</tr>
<tr>
<td>

<a id="glowintensity"></a> `glowIntensity`

</td>
<td>

`number`

</td>
<td>

Computed glow intensity in pixels

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:106

</td>
</tr>
<tr>
<td>

<a id="rotationspeed"></a> `rotationSpeed`

</td>
<td>

`number`

</td>
<td>

Computed base rotation speed in seconds

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:109

</td>
</tr>
<tr>
<td>

<a id="saturation"></a> `saturation`

</td>
<td>

`number`

</td>
<td>

Computed HSL saturation percentage

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:112

</td>
</tr>
<tr>
<td>

<a id="lightness"></a> `lightness`

</td>
<td>

`number`

</td>
<td>

Computed HSL lightness percentage

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:115

</td>
</tr>
<tr>
<td>

<a id="colorscheme"></a> `colorScheme`

</td>
<td>

[`ColorScheme`](#colorscheme-1)

</td>
<td>

Name of the color scheme being used

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:118

</td>
</tr>
</tbody>
</table>

***

## HoverEffects

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:125

Hover effects applied when mouse hovers over orbital lines
Generated randomly on each hover interaction

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="hueshift"></a> `hueShift`

</td>
<td>

`number`

</td>
<td>

Hue shift amount in degrees (-90 to 90)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:127

</td>
</tr>
<tr>
<td>

<a id="saturationboost"></a> `saturationBoost`

</td>
<td>

`number`

</td>
<td>

Saturation boost percentage (10-30)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:130

</td>
</tr>
<tr>
<td>

<a id="lightnessshift"></a> `lightnessShift`

</td>
<td>

`number`

</td>
<td>

Lightness shift percentage (-20 to 20)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:133

</td>
</tr>
<tr>
<td>

<a id="glowmultiplier"></a> `glowMultiplier`

</td>
<td>

`number`

</td>
<td>

Glow intensity multiplier (1.5-3)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:136

</td>
</tr>
<tr>
<td>

<a id="speedmultiplier"></a> `speedMultiplier`

</td>
<td>

`number`

</td>
<td>

Rotation speed multiplier (0.3-2.5)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:139

</td>
</tr>
<tr>
<td>

<a id="scalemultiplier"></a> `scaleMultiplier`

</td>
<td>

`number`

</td>
<td>

Scale transformation multiplier (1.1-1.4)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:142

</td>
</tr>
</tbody>
</table>

***

## LineStyle

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:149

Computed CSS styles for individual orbital lines
Generated by the effect and applied to each line element

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="transform"></a> `transform`

</td>
<td>

`string`

</td>
<td>

CSS transform string with rotation and scale

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:151

</td>
</tr>
<tr>
<td>

<a id="bordercolor"></a> `borderColor`

</td>
<td>

`string`

</td>
<td>

Border color as HSLA string

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:154

</td>
</tr>
<tr>
<td>

<a id="borderwidth"></a> `borderWidth`

</td>
<td>

`string`

</td>
<td>

Border width in pixels

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:157

</td>
</tr>
<tr>
<td>

<a id="boxshadow"></a> `boxShadow`

</td>
<td>

`string`

</td>
<td>

Box shadow for glow effect

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:160

</td>
</tr>
<tr>
<td>

<a id="animationduration"></a> `animationDuration`

</td>
<td>

`string`

</td>
<td>

Animation duration in seconds

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:163

</td>
</tr>
<tr>
<td>

<a id="zindex"></a> `zIndex`

</td>
<td>

`number`

</td>
<td>

Z-index for layering (higher for hovered lines)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:166

</td>
</tr>
</tbody>
</table>

***

## OrbitalSphereProps

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:173

Props interface for the OrbitalSphere Svelte component
Defines all possible props that can be passed to the component

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="config"></a> `config?`

</td>
<td>

[`OrbitalSphereConfig`](#orbitalsphereconfig)

</td>
<td>

Configuration object controlling sphere behavior and appearance

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:175

</td>
</tr>
<tr>
<td>

<a id="autorandomize"></a> `autoRandomize?`

</td>
<td>

`boolean`

</td>
<td>

Whether to automatically randomize the sphere periodically

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:178

</td>
</tr>
<tr>
<td>

<a id="classname"></a> `className?`

</td>
<td>

`string`

</td>
<td>

Additional CSS classes to apply to the container

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:181

</td>
</tr>
<tr>
<td>

<a id="onsphereclick"></a> `onSphereClick?`

</td>
<td>

() => `void`

</td>
<td>

Callback function triggered when the sphere is clicked

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:184

</td>
</tr>
</tbody>
</table>

***

## OrbitalSphereState

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:238

Complete type definition for the component's internal state
Includes all reactive variables and computed values

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="spheredata-1"></a> `sphereData`

</td>
<td>

[`SphereData`](#spheredata)

</td>
<td>

Current sphere configuration and line data

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:240

</td>
</tr>
<tr>
<td>

<a id="hueshift-1"></a> `hueShift`

</td>
<td>

`number`

</td>
<td>

Current hue shift amount for color animation

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:243

</td>
</tr>
<tr>
<td>

<a id="hoveredlineid"></a> `hoveredLineId`

</td>
<td>

`number`

</td>
<td>

ID of currently hovered orbital line (null if none)

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:246

</td>
</tr>
<tr>
<td>

<a id="hovereffects-1"></a> `hoverEffects`

</td>
<td>

[`HoverEffects`](#hovereffects)

</td>
<td>

Current hover effects configuration

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:249

</td>
</tr>
<tr>
<td>

<a id="sphereref"></a> `sphereRef`

</td>
<td>

`HTMLElement`

</td>
<td>

Reference to the sphere DOM element

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:252

</td>
</tr>
<tr>
<td>

<a id="timeoutid"></a> `timeoutId`

</td>
<td>

`number`

</td>
<td>

Timeout ID for auto-randomization

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:255

</td>
</tr>
<tr>
<td>

<a id="huetimeoutid"></a> `hueTimeoutId`

</td>
<td>

`number`

</td>
<td>

Timeout ID for hue shift animation

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:258

</td>
</tr>
<tr>
<td>

<a id="linestyles"></a> `lineStyles`

</td>
<td>

`Record`&lt;`number`, [`LineStyle`](#linestyle)&gt;

</td>
<td>

Computed styles for each orbital line

</td>
<td>

apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:261

</td>
</tr>
</tbody>
</table>

***

## RandomFunction()

```ts
type RandomFunction = () => number;
```

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:191

Type for the random number generator function
Uses a seeded linear congruential generator for consistent randomness

### Returns

`number`

***

## RandomRangeFunction()

```ts
type RandomRangeFunction = (min: number, max: number) => number;
```

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:197

Type for the random range utility function
Generates a random number between min and max (inclusive)

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`min`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`max`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

### Returns

`number`

***

## RandomIntFunction()

```ts
type RandomIntFunction = (min: number, max: number) => number;
```

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:203

Type for the random integer utility function  
Generates a random integer between min and max (inclusive)

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`min`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`max`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

### Returns

`number`

***

## ColorScheme

```ts
type ColorScheme = 
  | "Single"
  | "Dual"
  | "Rainbow"
  | "Random"
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
  | "Electric";
```

Defined in: apps/web/src/lib/components/SearchWeb/extras/QuantumSphere.d.ts:209

Color scheme types supported by the orbital sphere
Determines how colors are distributed across orbital lines
