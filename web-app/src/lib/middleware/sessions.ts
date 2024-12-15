import { Lucia, generateId } from "lucia";
import type { Cookies } from "@sveltejs/kit";
import { eq, and } from "drizzle-orm";

import { tokens } from "$lib/db/schema";

/**
 * Generates a new token for the given user
 * @param db - The database to use
 * @param userId - The user to generate the token for
 * @param email - The email to associate with the token
 * @param type - The type of the token
 * @returns {string} The generated token
 */
export async function generateToken(db, userId: string, email: string, type): Promise<Object | undefined> {
  if (!userId || !email || !type) return;

  await deleteAllTokensByUserId(db, userId, type);

  const token = await createToken(db, { userId, type, email });
  if (!token) return;

  return token.token.toString();
}

/**
 * Verifies that the given token is valid and matches the given user and email
 * @param db - The database to use
 * @param userId - The user to verify the token for
 * @param token - The token to verify
 * @param type - The type of the token
 * @param email - The email to associate with the token
 * @returns The email associated with the token if it is valid, otherwise undefined
 */
export async function verifyToken(db, userId: string, token: string, type, email?: string): Promise<string | undefined> {
  if (!userId || !token || !type) return;

  const tokenFromDatabase = await getTokenByUserId(db, userId, type);
  if (!tokenFromDatabase || tokenFromDatabase.token !== token) return;

  const deletedToken = await deleteToken(db, token, type);
  if (!deletedToken) return;

  if (Date.now() > tokenFromDatabase.expiresAt.getTime() ) return;

  // in case of verify email and reset password journey, we also need to verify the email
  if (email && type !== "email_change" && email !== tokenFromDatabase.email) return;

  // we return email because we need it in email change journey
  return tokenFromDatabase.email;
}

/**
 * Sets a new session for the given user
 * @param lucia - The Lucia instance to use
 * @param sessionId - The id of the session to set
 * @param cookies - The cookies to use
 */
export function setNewSession(lucia: Lucia, sessionId: string, cookies: Cookies) {
  const { name, value, attributes } = lucia.createSessionCookie(sessionId);

  cookies.set(name, value, { ...attributes, path: "/" });
}

/**
 * Destroys the current session for the given user
 * @param lucia - The Lucia instance to use
 * @param cookies - The cookies to use
 */
export function destroySession(lucia: Lucia, cookies: Cookies) {
  const { name, value, attributes } = lucia.createBlankSessionCookie();

  cookies.set(name, value, { ...attributes, path: "/" });
}

/**
 * Creates a new session for the given user and sets it
 * @param lucia - The Lucia instance to use
 * @param userId - The user to create the session for
 * @param cookies - The cookies to use
 */
export const createAndSetSession = async (lucia: Lucia, userId: string, cookies: Cookies) => {
  const sessionId = generateId(40);
  const session = await lucia.createSession(userId, {}, { sessionId });

  setNewSession(lucia, session.id, cookies);
};


/**
* Creates a new token in the database
* @param {Object} db - The database to use
* @param {Object} newToken - The token to create
* @returns {Promise<string>} The created token, or undefined if the token already exists
*/
export async function createToken(db, newToken) {
 const res = await db.insert(tokens).values(newToken).onConflictDoNothing().returning();

 if (res.length === 0) return;

 return res[0].token;
}

/**
* Gets a token by token
* @param {Object} db - The database to use
* @param {string} token - The token to get
* @returns {Promise<string>} The token, or undefined if it doesn't exist
*/
export async function getToken(db, token: string) {
 if (!token) return;

 return await db.query.tokens.findFirst({ where: eq(tokens.token, token) }).token;
}

/**
* Gets a token by user ID and type
* @param {Object} db - The database to use
* @param {string} userId - The user ID to get
* @param {string} type - The type of the token to get
* @returns {Promise<string>} The token, or undefined if it doesn't exist
*/
export async function getTokenByUserId(db, userId: string, type) {
 if (!userId || !type) return;

 return await db.query.tokens.findFirst({ where: and(eq(tokens.userId, userId), eq(tokens.type, type)) }).token;
}

/**
* Deletes all tokens for a user
* @param {Object} db - The database to use
* @param {string} userId - The user ID to delete tokens for
* @param {string} type - The type of the tokens to delete
* @returns {Promise<import("./types").DbToken[] | undefined>} The deleted tokens, or undefined if no tokens were deleted
*/
export async function deleteAllTokensByUserId(db, userId: string, type) {
 if (!userId || !type) return;

 const res = await db
   .delete(tokens)
   .where(and(eq(tokens.userId, userId), eq(tokens.type, type)))
   .returning();

 if (res.length === 0) return;

 return res;
}

/**
* Deletes a token by token and type
* @param {Object} db - The database to use
* @param {string} token - The token to delete
* @param {string} type - The type of the token to delete
* @returns {Promise<string>} The deleted token, or undefined if it doesn't exist
*/
export async function deleteToken(db, token: string, type) {
 if (!token || !type) return;

 const res = await db
   .delete(tokens)
   .where(and(eq(tokens.token, token), eq(tokens.type, type)))
   .returning();

 if (res.length === 0) return;

 return res[0].token;
}

