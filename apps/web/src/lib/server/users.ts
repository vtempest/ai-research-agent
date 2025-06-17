import { eq } from "drizzle-orm";
import { user } from "./schema";
import Stripe from "stripe";


/**
 * Creates a new user
 * @param {Object} db
 * @param {Object} newUser
 * @returns {Promise<Object>}
 */
export async function createUser(db, newUser) {
  newUser = {
    ...newUser,
    email: newUser.email.toLowerCase(),
    username: newUser.username.toLowerCase(),
  };

  const res = await db
    .insert(user)
    .values(newUser)
    .onConflictDoNothing()
    .returning();

  if (res.length === 0) return;

  return res[0];
}

/**
 * Gets all user
 * @param {Object} db
 * @returns {Promise<[]>}
 */
export async function getAlluser(db) {
  return await db.query.user.findMany();
}

/**
 * Gets a user by email
 * @param {Object} db
 * @param {string} email
 * @returns {Promise<Object>}
 */
export async function getUserByEmail(db, email) {
  if (!email) return;

  return await db.query.user.findFirst({ where: eq(user.email, email) });
}

/**
 * Gets a user by id
 * @param {Object} db
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getUserById(db, id) {
  if (!id) return;

  return await db.query.user.findFirst({ where: eq(user.id, id) });
}

/**
 * Gets a user by username
 * @param {Object} db
 * @param {string} username
 * @returns {Promise<Object>}
 */
export async function getUserByUsername(db, name) {
  if (!name) return;

  return await db.query.user.findFirst({ where: eq(user.name, name) });
}

/**
 * Updates a user by id
 * @param {Object} db
 * @param {string} id
 * @param {Object} userData
 * @returns {Promise<Object>}
 */
export async function updateUserById(db, id, userData) {
  if (!id) return;

  const res = await db
    .update(user)
    .set(userData)
    .where(eq(user.id, id))
    .returning();

  if (res.length === 0) return;

  return res[0];
}

/**
 * Deletes a user by id
 * @param {Object} db
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function deleteUserById(db, id) {
  if (!id) return;

  const res = await db.delete(user).where(eq(user.id, id)).returning();

  if (res.length === 0) return;

  return res[0];
}

/**
 * Generates a random alphanumeric key.
 * @param {number} [length=64] The length of the API key
 * @returns {string} The API key
 */
export function createApiKey(length = 64) {
  let result = "", chars = "abcdefghijklmnopqrstuvwxyz"
  chars += chars.toUpperCase() + '0123456789'
  while (length--)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result;
}

export async function validateApiKey(db, apiKey: string): Promise<boolean> {
  // Query your database to check if the API key is valid
  const user = await db.query.user.findFirst({
    where:
      // @ts-ignore
      eq(user.apiKey, apiKey),
  });

  return !!user;
}

/**
 * Cancels all subscriptions for a given customer email
 * @param {string} email
 * @param {Object} env
 */
export async function cancelStripeCustomerSubscriptions(
  email: string,
  env: any
) {
  const stripe = new Stripe(env.STRIPE_API_KEY);

  try {
    // Find customer by email
    const customers = await stripe.customers.list({ email: email, limit: 1 });

    if (customers.data.length === 0) {
      console.log("No customer found with this email");
      return;
    }

    const customer = customers.data[0];

    // Retrieve all subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
    });

    // Cancel each subscription
    for (const subscription of subscriptions.data) {
      await stripe.subscriptions.cancel(subscription.id);
      console.log(`Cancelled subscription: ${subscription.id}`);
    }

    console.log("All subscriptions cancelled successfully");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function getStripeManageSubscriptionURL(email, env) {
  const stripe = new Stripe(env.STRIPE_API_KEY);

  try {
    // Step 1: Retrieve the customer ID using the email address
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      throw new Error("No customer found with this email address");
    }

    const customerId = customers.data[0].id;

    // Step 2: Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url:  env.PUBLIC_DOMAIN,
    });

    // Step 3: Return the URL for redirection
    return session.url;
  } catch (error) {
    throw error;
  }
}
