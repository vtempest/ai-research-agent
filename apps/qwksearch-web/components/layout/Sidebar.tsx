'use client';

import { Library } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import iconRead from '@/components/icons/icon-read.svg';
import iconNews from '@/components/icons/icon-news-title.svg';
import { useSelectedLayoutSegments } from 'next/navigation';
import React, { type ReactNode } from 'react';
import SettingsButton from '../Settings/SettingsButton';
import UserMenu from './UserMenu';
import { ThemeDropdown } from "../theme/theme-dropdown"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" bg-light-primary dark:bg-dark-primary min-h-screen">
      <div className="max-w-screen-lg lg:mx-auto ">{children}</div>
    </main>
  );
};

const VerticalIconContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col items-center w-full">{children}</div>;
};

type NavLink =
  | { kind: 'image'; customIcon: string; href: string; active: boolean; label: string }
  | { kind: 'lucide'; icon: ReactNode; href: string; active: boolean; label: string };

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments();

  const navLinks: NavLink[] = [
    {
      kind: 'image',
      customIcon: '/apple-touch-icon.png',
      href: '/',
      active: segments.length === 0 || segments.includes('c'),
      label: 'Research',
    },
    {
      kind: 'image',
      customIcon: iconRead,
      href: '/docs',
      active: segments.includes('docs'),
      label: 'Docs',
    },
    {
      kind: 'image',
      customIcon: iconNews,
      href: '/news',
      active: segments.includes('news'),
      label: 'News',
    },
    {
      kind: 'lucide',
      icon: <Library size={22} />,
      href: '/library',
      active: segments.includes('library'),
      label: 'Library',
    },
  ];

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[72px] lg:flex-col border-r border-light-200 dark:border-dark-200">
        <div className="flex grow flex-col items-center justify-between gap-y-5 overflow-y-auto bg-light-secondary dark:bg-dark-secondary px-2 py-8 shadow-sm shadow-light-200/10 dark:shadow-black/25">
          <VerticalIconContainer>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'relative flex flex-col items-center justify-center space-y-0.5 cursor-pointer w-full py-2 rounded-lg',
                  link.active
                    ? 'text-black/70 dark:text-white/70 '
                    : 'text-black/60 dark:text-white/60',
                )}
              >
                <div
                  className={cn(
                    link.active && 'bg-light-200 dark:bg-dark-200',
                    'group rounded-lg hover:bg-light-200 hover:dark:bg-dark-200 transition duration-200 p-1.5',
                  )}
                >
                  {link.kind === 'image' ? (
                    <Image
                      src={link.customIcon}
                      alt={link.label}
                      width={22}
                      height={22}
                      className={cn(
                        !link.active && 'group-hover:scale-105',
                        'transition duration-200',
                      )}
                    />
                  ) : (
                    <span className={cn(!link.active && 'group-hover:scale-105', 'transition duration-200 flex')}>
                      {link.icon}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    link.active
                      ? 'text-black/80 dark:text-white/80'
                      : 'text-black/60 dark:text-white/60',
                    'text-[10px]',
                  )}
                >
                  {link.label}
                </p>
              </Link>
            ))}
          </VerticalIconContainer>

          <div className="flex flex-col items-center gap-3">
            <ThemeDropdown />
            {/* <UserMenu /> */}
            <SettingsButton />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full z-50 flex flex-row items-center gap-x-6 bg-light-secondary dark:bg-dark-secondary px-4 py-4 shadow-sm lg:hidden">
        {navLinks.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className={cn(
              'relative flex flex-col items-center space-y-1 text-center w-full',
              link.active
                ? 'text-black dark:text-white'
                : 'text-black dark:text-white/70',
            )}
          >
            {link.active && (
              <div className="absolute top-0 -mt-4 h-1 w-full rounded-b-lg bg-black dark:bg-white" />
            )}
            {link.kind === 'image' ? (
              <Image
                src={link.customIcon}
                alt={link.label}
                width={24}
                height={24}
              />
            ) : (
              <span className="flex">{link.icon}</span>
            )}
            <p className="text-xs">{link.label}</p>
          </Link>
        ))}
        <div className="flex flex-col items-center space-y-1 text-center">
          <UserMenu />
        </div>
      </div>

      <Layout>{children}</Layout>
    </div>
  );
};

export default Sidebar;
