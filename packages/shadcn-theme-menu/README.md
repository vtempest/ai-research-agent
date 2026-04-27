# shadcn-themes

Beautiful theme components for shadcn/ui with 24+ color themes, dark/light mode, and animations.

## Installation

```bash
# The package includes all required dependencies
pnpm add shadcn-themes

# Peer dependencies (usually already in your project)
pnpm add react react-dom next-themes lucide-react
```

## Quick Start

```tsx
// 1. Import CSS
import 'shadcn-themes/themes.css';

// 2. Wrap app with ThemeProvider
import { ThemeProvider } from 'shadcn-themes';

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>

// 3. Use components
import { ThemeToggle, ThemeDropdown, CinematicThemeSwitcher } from 'shadcn-themes';

<ThemeToggle />
<ThemeDropdown />
<CinematicThemeSwitcher />
```

## Components

### ThemeToggle

Simple light/dark mode toggle.

```tsx
<ThemeToggle mode="light-dark-system" />
// or
<ThemeToggle mode="light-dark" />
```

**Props:**
- `mode?` - Include system option (default: `'light-dark-system'`)
- `Button?` - Custom Button component
- `DropdownMenu?` - Custom DropdownMenu components
- `onThemeChange?` - Callback when theme changes

### ThemeDropdown

Full dropdown with 24+ color themes and live preview.

```tsx
<ThemeDropdown
  iconSrc="/custom-icon.svg"
  onColorThemeChange={(theme) => console.log(theme)}
  onModeChange={(mode) => console.log(mode)}
/>
```

**Props:**
- `iconSrc?` - Custom icon path (default: Palette icon)
- `Button?` - Custom Button component
- `DropdownMenu?` - Custom DropdownMenu components
- `onColorThemeChange?` - Callback when color theme changes
- `onModeChange?` - Callback when light/dark mode changes

### CinematicThemeSwitcher

Animated toggle with particle effects.

```tsx
<CinematicThemeSwitcher />
```

### Available Themes

24 themes: `modern-minimal`, `elegant-luxury`, `cyberpunk`, `twitter`, `mocha-mousse`, `bubblegum`, `amethyst-haze`, `pink-lemonade`, `notebook`, `doom-64`, `catppuccin`, `graphite`, `perpetuity`, `kodama-grove`, `cosmic-night`, `tangerine`, `quantum-rose`, `nature`, `bold-tech`, `amber-minimal`, `supabase`, `neo-brutalism`, `solar-dusk`, `claymorphism`, `pastel-dreams`

## Custom Components

Pass your own Button or DropdownMenu components:

```tsx
import { Button } from '@/components/ui/button';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

<ThemeDropdown
  Button={Button}
  DropdownMenu={{
    Root: DropdownMenu.Root,
    Trigger: DropdownMenu.Trigger,
    Content: DropdownMenu.Content,
    Item: DropdownMenu.Item,
    Label: DropdownMenu.Label,
    Separator: DropdownMenu.Separator
  }}
/>
```

## Programmatic Usage

```tsx
import { themeNames, themeColors, formatThemeName } from 'shadcn-themes';

// Set theme programmatically
const setTheme = (themeName: string) => {
  localStorage.setItem('color-theme', themeName);
  themeNames.forEach(t => document.documentElement.classList.remove(`theme-${t}`));
  document.documentElement.classList.add(`theme-${themeName}`);
};

// Get theme info
console.log(themeNames); // Array of all theme names
console.log(themeColors['cyberpunk']); // { primary: '#ff00c8', secondary: '#f0f0ff' }
console.log(formatThemeName('modern-minimal')); // 'Modern Minimal'
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import type { ThemeProviderProps } from 'shadcn-themes';
```

## Demo

Run the interactive demo:

```bash
pnpm demo
```

Or manually:
```bash
cd demo
pnpm install
pnpm dev
```

Opens at `http://localhost:3001`

## License

MIT
