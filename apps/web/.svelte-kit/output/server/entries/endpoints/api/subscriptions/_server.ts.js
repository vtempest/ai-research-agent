import Stripe from "stripe";
import { json, redirect } from "@sveltejs/kit";
import { u as user } from "../../../../chunks/schema.js";
import { eq } from "drizzle-orm";
const plans = [
  { cost: 500, name: "Basic" },
  { cost: 9900, name: "Pro" }
];
async function POST({ request, platform, locals }) {
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
  var plan_cost = event.data.object.items?.data?.[0].plan?.amount;
  plans.find((p) => p.cost == plan_cost)?.name || "Other - " + plan_cost;
  var isActive = ["active", "trialing"].includes(status) && ![
    "incomplete",
    "incomplete_expired",
    "past_due",
    "canceled",
    "unpaid",
    "paused"
  ].includes(status);
  const { email } = await stripe.customers.retrieve(
    customer
  );
  await locals.db?.update(user).set({
    subscription: isActive
  }).where(eq(user.email, email));
  return json({ received: true });
}
async function GET({ request, platform, locals }) {
  try {
    let session;
    if (!session) return json({ error: "Unauthorized" }, { status: 401 });
    const stripe = new Stripe(platform?.env.STRIPE_API_KEY);
    const customers = await stripe.customers.list({
      email: session?.user?.email,
      limit: 1
    });
    if (customers.data.length === 0) {
      throw new Error("No customer found with this email address");
    }
    const billingPortal = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: platform?.env.PUBLIC_DOMAIN
    });
    return redirect(307, billingPortal.url);
  } catch (e) {
    return json({ error: e.message }, { status: 500 });
  }
}
export {
  GET,
  POST
};
