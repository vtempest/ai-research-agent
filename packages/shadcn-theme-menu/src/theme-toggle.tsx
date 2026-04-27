'use client'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from './components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu'

interface ThemeToggleProps {
  mode?: 'light-dark' | 'light-dark-system'
  Button?: React.ComponentType<any>
  DropdownMenu?: any
  onThemeChange?: (theme: string) => void
}

export function ThemeToggle({
  mode = 'light-dark-system',
  Button: CustomButton,
  DropdownMenu: CustomDropdownMenu,
  onThemeChange
}: ThemeToggleProps) {
  const { setTheme } = useTheme()

  const ButtonComp = CustomButton || Button
  const MenuComp = CustomDropdownMenu || {
    Root: DropdownMenu,
    Trigger: DropdownMenuTrigger,
    Content: DropdownMenuContent,
    Item: DropdownMenuItem
  }

  const handleThemeChange = (theme: string) => {
    setTheme(theme)
    onThemeChange?.(theme)
  }

  const Root = MenuComp.Root || MenuComp
  const Trigger = MenuComp.Trigger || DropdownMenuTrigger
  const Content = MenuComp.Content || DropdownMenuContent
  const Item = MenuComp.Item || DropdownMenuItem

  return (
    <Root>
      <Trigger asChild>
        <ButtonComp variant='ghost' size='icon' className='size-8'>
          <Sun className='size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </ButtonComp>
      </Trigger>
      <Content align='end'>
        <Item onClick={() => handleThemeChange('light')}>
          <Sun className='mr-2 size-4' />
          Light
        </Item>
        <Item onClick={() => handleThemeChange('dark')}>
          <Moon className='mr-2 size-4' />
          Dark
        </Item>
        {mode === 'light-dark-system' && (
          <Item onClick={() => handleThemeChange('system')}>
            <Monitor className='mr-2 size-4' />
            System
          </Item>
        )}
      </Content>
    </Root>
  )
}
