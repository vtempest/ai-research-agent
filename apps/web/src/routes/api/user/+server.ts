
import { json } from '@sveltejs/kit';
import { user } from '$lib/server/schema';
import { initializeUser } from '$lib/server';

// Serve user object
export async function GET({ locals, request }) {
    const userObject = await initializeUser(locals, request);
    return  userObject ? json(userObject) : json({error: 'Unauthorized'});
}

// Update user object
export async function POST({ locals , request}) {
  const {  name, image, settings } = await request.json();
 
  const userObject = await initializeUser(locals, request);
  if (!userObject) 
    return json({ error: 'Unauthorized' }, { status: 401 });
  
  const userFiles = await locals.db
    .update(user)
    .set({ 
      ...(name !== undefined && { name }),
      ...(settings !== undefined && { settings }),
      ...(image !== undefined && { image }),
    });
  return json(userFiles);
}
