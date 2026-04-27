import { useState, useEffect } from 'react'
import { ThemeProvider } from 'shadcn-themes/theme-provider'
import { ThemeToggle } from 'shadcn-themes/theme-toggle'
import { ThemeDropdown, themeNames, themeColors, formatThemeName } from 'shadcn-themes/theme-dropdown'
import CinematicThemeSwitcher from 'shadcn-themes/cinematic-theme-switcher'
import {
  Palette,
  Moon,
  Sun,
  Sparkles,
  Code,
  Layers,
  Zap
} from 'lucide-react'

function App() {
  const [currentTheme, setCurrentTheme] = useState('modern-minimal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('color-theme') || 'modern-minimal'

    if (themeNames.includes(saved)) {
      setCurrentTheme(saved)
    }

    // Remove all theme classes first
    themeNames.forEach(t => document.documentElement.classList.remove(`theme-${t}`))
    // Add the current theme class
    document.documentElement.classList.add(`theme-${saved}`)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Palette className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Shadcn Themes</h1>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <ThemeDropdown />
              <CinematicThemeSwitcher />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Beautiful Themes for{' '}
              <span className="text-primary">shadcn/ui</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              24+ pre-built color themes with dark/light mode support, stunning animations,
              and seamless integration with shadcn/ui components.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <code className="rounded bg-muted px-3 py-1.5 text-sm font-mono">
                npm install @qwksearch/shadcn-themes
              </code>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-2xl font-bold text-center mb-12">Features</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Palette className="h-8 w-8" />}
              title="24+ Color Themes"
              description="From minimal to cyberpunk, elegant to bold. Choose the perfect theme for your project."
            />
            <FeatureCard
              icon={<Moon className="h-8 w-8" />}
              title="Dark/Light Mode"
              description="Seamless theme switching with system preference support and smooth transitions."
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title="Animated Switcher"
              description="Cinematic theme switcher with particle effects and neumorphic design."
            />
            <FeatureCard
              icon={<Code className="h-8 w-8" />}
              title="Type-Safe"
              description="Built with TypeScript for full type safety and excellent developer experience."
            />
            <FeatureCard
              icon={<Layers className="h-8 w-8" />}
              title="Next.js Ready"
              description="Works perfectly with Next.js App Router and next-themes out of the box."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Easy to Use"
              description="Single import endpoint, no configuration needed. Just import and use."
            />
          </div>
        </section>

        {/* Theme Showcase */}
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-2xl font-bold text-center mb-12">Available Themes</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {themeNames.map((themeName) => {
              const colors = themeColors[themeName]
              return (
                <ThemeCard
                  key={themeName}
                  themeName={themeName}
                  colors={colors}
                  isActive={currentTheme === themeName}
                  onClick={() => {
                    console.log('Switching to theme:', themeName)
                    setCurrentTheme(themeName)
                    localStorage.setItem('color-theme', themeName)
                    // Remove all theme classes
                    themeNames.forEach(t => document.documentElement.classList.remove(`theme-${t}`))
                    // Add new theme class
                    document.documentElement.classList.add(`theme-${themeName}`)
                    console.log('Applied class:', `theme-${themeName}`)
                  }}
                />
              )
            })}
          </div>
        </section>

        {/* Component Showcase */}
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-2xl font-bold text-center mb-12">Component Examples</h3>
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h4 className="text-lg font-semibold mb-2 text-card-foreground">Card Component</h4>
                <p className="text-muted-foreground mb-4">
                  This is a card using theme colors. The background, border, and text colors
                  automatically adapt to your selected theme.
                </p>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  Primary Button
                </button>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h4 className="text-lg font-semibold mb-2 text-card-foreground">Muted Elements</h4>
                <div className="space-y-2">
                  <div className="rounded bg-muted p-3 text-muted-foreground">
                    Muted background
                  </div>
                  <div className="rounded bg-accent p-3 text-accent-foreground">
                    Accent background
                  </div>
                  <div className="rounded bg-secondary p-3 text-secondary-foreground">
                    Secondary background
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 text-card-foreground">Form Elements</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Input Field</label>
                  <input
                    type="text"
                    placeholder="Type something..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    Submit
                  </button>
                  <button className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                    Cancel
                  </button>
                  <button className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/50 mt-16">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
            <p>Built with shadcn/ui, React, and TypeScript</p>
            <p className="mt-2">
              Current theme: <span className="font-semibold text-foreground">{formatThemeName(currentTheme)}</span>
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="text-primary mb-4">{icon}</div>
      <h4 className="text-lg font-semibold mb-2 text-card-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function ThemeCard({
  themeName,
  colors,
  isActive,
  onClick
}: {
  themeName: string
  colors: { primary: string; secondary: string }
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative rounded-lg border border-border bg-card p-4 text-left shadow-sm
        transition-all hover:shadow-md hover:scale-105
        ${isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-full border border-border shadow-sm"
            style={{ backgroundColor: colors.primary }}
          />
          <div
            className="h-6 w-6 rounded-full border border-border shadow-sm"
            style={{ backgroundColor: colors.secondary }}
          />
        </div>
        {isActive && (
          <div className="h-2 w-2 rounded-full bg-primary" />
        )}
      </div>
      <h4 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
        {formatThemeName(themeName)}
      </h4>
    </button>
  )
}

export default App
