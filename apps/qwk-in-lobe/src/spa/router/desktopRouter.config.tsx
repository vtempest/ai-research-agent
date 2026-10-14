'use client';

import type { RouteObject } from 'react-router';

import { acceptanceRouteMeta } from '@/features/Acceptance/routeMeta';
import { dynamicElement, ErrorBoundary } from '@/utils/router';

import { createMainAreaRouteFactory, createSharedDesktopRoutes } from './desktopRouter.shared';

export { sharedMainAreaChildren } from './desktopRouter.shared';

export const createMainAreaChildren = createMainAreaRouteFactory();

// Electron consumers resolve tab metadata against the same complete content
// tree. The Web root also renders this tree directly.
export const mainAreaMetaRoutes: RouteObject[] = [
  { children: createMainAreaChildren(), path: '/' },
];

// `/share/*` is served by the standalone Share app (apps/share), not this router.
const webOnlyRoutes: RouteObject[] = [
  // Guest demo chat: runs on the visitor's own OpenRouter key, no account needed.
  {
    element: dynamicElement(() => import('@/routes/demo'), 'Desktop > Guest Demo'),
    errorElement: <ErrorBoundary />,
    path: '/demo',
  },
  {
    element: dynamicElement(() => import('@/routes/verify-im'), 'Desktop > VerifyIm'),
    errorElement: <ErrorBoundary />,
    path: '/verify-im',
  },

  {
    children: [
      {
        element: dynamicElement(
          () => import('@/routes/(main)/acceptance/empty'),
          'Desktop > Acceptance Empty',
        ),
        index: true,
      },
      {
        element: dynamicElement(
          () => import('@/routes/acceptance/[acceptanceId]'),
          'Desktop > AcceptanceReport',
        ),
        handle: { meta: acceptanceRouteMeta },
        path: ':acceptanceId',
      },
      {
        element: dynamicElement(
          () => import('@/routes/acceptance/[acceptanceId]'),
          'Desktop > AcceptanceCheck',
        ),
        handle: { meta: acceptanceRouteMeta },
        path: ':acceptanceId/check/:checkId',
      },
    ],
    element: dynamicElement(() => import('@/routes/(main)/acceptance'), 'Desktop > Acceptance'),
    errorElement: <ErrorBoundary />,
    handle: { meta: acceptanceRouteMeta },
    path: '/acceptance',
  },
];

export const desktopRoutes: RouteObject[] = createSharedDesktopRoutes({
  mainAreaChildren: createMainAreaChildren(),
  onboardingRoute: {
    element: dynamicElement(() => import('@/routes/onboarding'), 'Desktop > Onboarding'),
    errorElement: <ErrorBoundary />,
    path: '/onboarding',
  },
  platformRoutes: webOnlyRoutes,
});
