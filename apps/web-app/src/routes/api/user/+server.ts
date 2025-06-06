
import { json } from '@sveltejs/kit';
import { users } from '$lib/server/schema';
import { initializeUser } from '$lib/server';

// Serve user object
export async function GET({ locals }) {
    const user = await initializeUser(locals);
    return  user ? json(user) : json({error: 'Unauthorized'});
}

// Update user object
export async function POST({ locals , request}) {
  const {  name, image, settings } = await request.json();
 
  const user = await initializeUser(locals);
  if (!user) 
    return json({ error: 'Unauthorized' }, { status: 401 });
  
  const userFiles = await locals.db
    .update(users)
    .set({ 
      ...(name !== undefined && { name }),
      ...(settings !== undefined && { settings }),
      ...(image !== undefined && { image }),
    });
  return json(userFiles);
}
