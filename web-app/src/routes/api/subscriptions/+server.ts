import Stripe from "stripe";
import { json, redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";


const plans = [
  { cost: 500, name: "Basic" },
  { cost: 9900, name: "Pro" },
];


/**
 * Webhook listens to Stripe Subscription change
 * and updates subscription status in db.
 * @see [Stripe Docs](https://stripe.com/docs/api/subscriptions/object)
 * @param {RequestEvent} event
 * @returns {Promise<Response>}
 */
export async function POST({ request, platform, locals }: RequestEvent) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";
  let event;

  const stripe = new Stripe(platform?.env?.STRIPE_API_KEY);
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      platform?.env?.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Error verifying webhook signature:", err);
    return json({ error: "Invalid signature" }, { status: 400 });
  }

  const { status, customer } = event.data.object;
  if (!event.type.startsWith("customer.subscription"))
    return json({ received: true });

  //plan price amount in cents
  var plan_cost = event.data.object.items?.data?.[0].plan?.amount;

  var plan =
    plans.find((p) => p.cost == plan_cost)?.name ||
    "Other - " + plan_cost;

  var isActive =
    ["active", "trialing"].includes(status) &&
    ![
      "incomplete",
      "incomplete_expired",
      "past_due",
      "canceled",
      "unpaid",
      "paused",
    ].includes(status);

  const { email } = (await stripe.customers.retrieve(
    customer
  )) as Stripe.Customer;

  // console.log(status, email, isActive, plan);

  //update user subscription status
  await locals.db
    ?.update(users)
    .set({
      subscription: isActive,
    })
    .where(eq(users.email, email));

  return json({ received: true });
}

/**
 * Redirects to Stripe's Manage Subscription page.
 * @param {RequestEvent} event
 * @returns {Promise<Response>}
 */
export async function GET({ request, platform, locals }: RequestEvent) {
  try {
    let session //= await locals.auth();
    if (!session) return json({ error: "Unauthorized" }, { status: 401 });

    const stripe = new Stripe(platform?.env.STRIPE_API_KEY);
    
    // Step 1: Retrieve the customer ID using the email address
    const customers = await stripe.customers.list({
      email: session?.user?.email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      throw new Error("No customer found with this email address");
    }

    // Step 2: Create a billing portal session
    const billingPortal = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: "https://" + platform?.env.PUBLIC_DOMAIN,
    });

    // Step 3: Return the URL for redirection
    return redirect(307, billingPortal.url);
  } catch (e) {
    return json({ error: e.message }, { status: 500 });
  }
}
