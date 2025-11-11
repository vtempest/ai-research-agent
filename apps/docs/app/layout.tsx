import { RootProvider } from 'fumadocs-ui/provider';
import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { Provider } from './provider';

const inter = Inter({
  subsets: ['latin'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="flex flex-col min-h-screen">
      <Provider>{children}</Provider>
      {/* <RootProvider>{children}</RootProvider> */}
      </body>
    </html>
  );
}
