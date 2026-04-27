/**
 * @fileoverview Marks the initial application setup as complete.
 * POST persists the setup-complete flag via the config manager.
 */
import configManager from '@/lib/config';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    configManager.markSetupComplete();

    return Response.json(
      {
        message: 'Setup marked as complete.',
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error('Error marking setup as complete: ', err);
    return Response.json(
      { message: 'An error has occurred.' },
      { status: 500 },
    );
  }
};
