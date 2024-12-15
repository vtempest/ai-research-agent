// import { error, json } from '@sveltejs/kit';
// import { db } from '$lib/db';
// import { chats, messages } from '$lib/db/schema';
// import { eq } from 'drizzle-orm';

// /**
//  * Handles GET requests for all chats or a specific chat
//  * @param {import('@sveltejs/kit').RequestEvent} event
//  */
// export async function GET(event) {
//     const chatId = event.params.id;
 
//     try {
//         if (!chatId) {
//             // Fetch all chats
//             let fetchedChats = await db.query.chats.findMany();
//             fetchedChats = fetchedChats.reverse();
//             return json({ chats: fetchedChats });
//         } else {
//             // Fetch specific chat and its messages
//             const existingChat = await db.query.chats.findFirst({
//                 where: eq(chats.id, chatId),
//             });

//             if (!existingChat) {
//                 throw error(404, 'Chat not found');
//             }

//             const chatMessages = await db.query.messages.findMany({
//                 where: eq(messages.chatId, chatId),
//             });

//             return json({ chat: existingChat, messages: chatMessages });
//         }
//     } catch (err) {
//         throw error(500, 'An error occurred while processing your request');
//     }
// }

// /**
//  * Handles DELETE requests for a specific chat
//  * @param {import('@sveltejs/kit').RequestEvent} event
//  */
// export async function DELETE(event) {
//     const chatId = event.params.id;

//     if (!chatId) {
//         throw error(400, 'Chat ID is required');
//     }

//     try {
//         const existingChat = await db.query.chats.findFirst({
//             where: eq(chats.id, chatId),
//         });

//         if (!existingChat) {
//             throw error(404, 'Chat not found');
//         }

//         await db.delete(chats).where(eq(chats.id, chatId)).execute();
//         await db.delete(messages).where(eq(messages.chatId, chatId)).execute();

//         return json({ message: 'Chat deleted successfully' });
//     } catch (err) {
//         throw error(500, 'An error occurred while deleting the chat');
//     }
// }

// /**
//  * Handles POST requests to create a new chat
//  * @param {import('@sveltejs/kit').RequestEvent} event
//  */
// export async function POST(event) {
//     try {
//         const { title } = await event.request.json();

//         if (!title) {
//             throw error(400, 'Chat title is required');
//         }

//         const newChat = await db.insert(chats).values({ title }).returning();

//         return json({ chat: newChat[0] }, { status: 201 });
//     } catch (err) {
//         throw error(500, 'An error occurred while creating the chat');
//     }
// }