import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oneTap, openAPI, stripe } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { redirect, error } from "@sveltejs/kit";
import * as schema from "./schema";
import { user } from "./schema";
// import { sendWelcomeEmail } from "./email";
import * as custom from "$lib/customize-site"

// Updated route handler that creates auth instance per request
export const initAuthRouteHandler = async ({ event, resolve }: { event: any, resolve: Function }) => {
  const env = event.platform?.env;
  
  // Create auth instance with the current request's environment
  const auth = createAuth(env);
  
  // For non-auth routes, you might want to attach auth to the event
  // so it can be used in your app
  event.locals = event.locals || {};
  event.locals.auth = auth;
  
  return resolve(event);
};

/**
 * Initialize Better Auth instance
 * @param {any} env - Environment variables
 * @param {object} [options] - Additional options
 * @param {number} [options.SESSION_DURATION_IN_DAYS=60] - Session duration in days
 * @param {boolean} [options.SHOULD_SEND_WELCOME_EMAIL=false] - Send welcome email to new users
 * @param {boolean} [options.ALLOW_ACCOUNT_LINKING=true] - Allow merging accounts by email
 * @returns {ReturnType<typeof betterAuth>} - Better Auth instance
 */

const SESSION_DURATION_IN_DAYS = 60 , SHOULD_SEND_WELCOME_EMAIL = 0;

export let auth 
// Factory function to create auth instance with platform env
export const createAuth = (env: any) => {
  auth = betterAuth({
    database: drizzleAdapter(drizzle(env.DB, { schema }), {
      provider: "sqlite",
      // generateId: () => crypto.randomUUID(),
    }),
    
    secret: env.BETTER_AUTH_SECRET,
    baseURL: custom.PUBLIC_DOMAIN,
    
    session: {
      expiresIn: SESSION_DURATION_IN_DAYS * 24 * 60 * 60, // Convert to seconds
      updateAge: 24 * 60 * 60, // Update session every 24 hours
    },

    socialProviders: {
      google: {
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
      },
      discord: {
        clientId: env.AUTH_DISCORD_ID,
        clientSecret: env.AUTH_DISCORD_SECRET,
      },
      github: {
        clientId: env.AUTH_GITHUB_ID,
        clientSecret: env.AUTH_GITHUB_SECRET,
      },
      microsoft: {
        clientId: env.AUTH_MICROSOFT_ENTRA_ID_ID,
        clientSecret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      },
      facebook: {
        clientId: env.AUTH_FACEBOOK_ID,
        clientSecret: env.AUTH_FACEBOOK_SECRET,
      },
    },

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },

    emailVerification: {
      sendOnSignUp: false,
      autoSignInAfterVerification: true,
    },

    plugins: [
      openAPI(), 
      oneTap(),
      stripe({
        stripeSecretKey: env.STRIPE_SECRET_KEY,
        stripePublishableKey: env.STRIPE_PUBLISHABLE_KEY,
        webhookSecret: env.STRIPE_WEBHOOK_SECRET,
        
        // Set mode based on environment
        mode: env.NODE_ENV === "production" ? "live" : "test",
        
        // Subscription configuration
        subscriptions: {
          enabled: true,
          allowMultipleSubscriptions: false,
          
          // Define your subscription plans
          plans: [
            {
              id: "basic",
              name: "Basic Plan",
              priceId: env.STRIPE_BASIC_PRICE_ID,
              price: 999, // $9.99 in cents
              interval: "month",
              features: ["10 projects", "Basic support", "5GB storage"],
            },
            {
              id: "pro", 
              name: "Pro Plan",
              priceId: env.STRIPE_PRO_PRICE_ID,
              price: 1999, // $19.99 in cents
              interval: "month",
              features: ["Unlimited projects", "Priority support", "50GB storage", "Advanced analytics"],
            },
            {
              id: "enterprise",
              name: "Enterprise Plan", 
              priceId: env.STRIPE_ENTERPRISE_PRICE_ID,
              price: 4999, // $49.99 in cents
              interval: "month",
              features: ["Everything in Pro", "Custom integrations", "Unlimited storage", "Dedicated support"],
            },
          ],
        },
        
        // One-time payments configuration
        payments: {
          enabled: true,
          
          // Define your products
          products: [
            {
              id: "premium_feature",
              name: "Premium Feature Unlock",
              priceId: env.STRIPE_PREMIUM_FEATURE_PRICE_ID,
              price: 2999, // $29.99 in cents
              description: "Unlock premium features for lifetime",
            },
            {
              id: "extra_storage",
              name: "Extra Storage (100GB)",
              priceId: env.STRIPE_EXTRA_STORAGE_PRICE_ID,
              price: 999, // $9.99 in cents
              description: "Add 100GB of storage to your account",
            },
            {
              id: "consultation",
              name: "1-on-1 Consultation",
              priceId: env.STRIPE_CONSULTATION_PRICE_ID,
              price: 9999, // $99.99 in cents
              description: "60-minute consultation session",
            },
          ],
        },
        
        // Customer portal configuration
        customerPortal: {
          enabled: true,
          returnUrl: custom.PUBLIC_DOMAIN + "/dashboard",
        },
        
        // Webhook events to handle
        webhookEvents: [
          "customer.subscription.created",
          "customer.subscription.updated", 
          "customer.subscription.deleted",
          "customer.subscription.paused",
          "customer.subscription.resumed",
          "invoice.payment_succeeded",
          "invoice.payment_failed",
          "payment_intent.succeeded",
          "payment_intent.payment_failed",
          "customer.created",
          "customer.updated",
        ],
        
        // Custom webhook handlers
        onSubscriptionCreated: async (subscription, user, db) => {
          console.log(`New subscription created for user ${user.id}:`, subscription.id);
          
          // Update user subscription status in database
          try {
            const dbInstance = drizzle(env.DB, { schema });
            await dbInstance.update(schema.user)
              .set({ 
                subscriptionStatus: "active",
                subscriptionTier: subscription.metadata?.plan || "basic",
                subscriptionId: subscription.id,
                customerId: subscription.customer,
                updatedAt: new Date(),
              })
              .where(eq(schema.user.id, user.id));
              
            console.log(`User ${user.id} subscription status updated to active`);
          } catch (error) {
            console.error("Error updating user subscription:", error);
          }
        },
        
        onSubscriptionUpdated: async (subscription, user, db) => {
          console.log(`Subscription updated for user ${user.id}:`, subscription.id);
          
          try {
            const dbInstance = drizzle(env.DB, { schema });
            const status = subscription.status === "active" ? "active" : 
                          subscription.status === "canceled" ? "cancelled" :
                          subscription.status === "past_due" ? "past_due" :
                          subscription.status === "paused" ? "paused" : "inactive";
                          
            await dbInstance.update(schema.user)
              .set({ 
                subscriptionStatus: status,
                subscriptionTier: subscription.metadata?.plan || "basic",
                subscriptionId: subscription.id,
                updatedAt: new Date(),
              })
              .where(eq(schema.user.id, user.id));
              
            console.log(`User ${user.id} subscription updated: ${status}`);
          } catch (error) {
            console.error("Error updating user subscription:", error);
          }
        },
        
        onSubscriptionDeleted: async (subscription, user, db) => {
          console.log(`Subscription cancelled for user ${user.id}:`, subscription.id);
          
          try {
            const dbInstance = drizzle(env.DB, { schema });
            await dbInstance.update(schema.user)
              .set({ 
                subscriptionStatus: "cancelled",
                subscriptionTier: null,
                subscriptionId: null,
                updatedAt: new Date(),
              })
              .where(eq(schema.user.id, user.id));
              
            console.log(`User ${user.id} subscription cancelled`);
          } catch (error) {
            console.error("Error cancelling user subscription:", error);
          }
        },
        
        onPaymentSucceeded: async (paymentIntent, user, db) => {
          console.log(`Payment succeeded for user ${user.id}:`, paymentIntent.id);
          
          try {
            const productId = paymentIntent.metadata?.productId;
            const dbInstance = drizzle(env.DB, { schema });
            
            // Handle one-time purchase logic
            if (productId === "premium_feature") {
              await dbInstance.update(schema.user)
                .set({ 
                  hasPremiumFeatures: true,
                  updatedAt: new Date(),
                })
                .where(eq(schema.user.id, user.id));
                
              console.log(`User ${user.id} granted premium features`);
            } else if (productId === "extra_storage") {
              // Add extra storage to user account
              await dbInstance.update(schema.user)
                .set({ 
                  extraStorage: true,
                  updatedAt: new Date(),
                })
                .where(eq(schema.user.id, user.id));
                
              console.log(`User ${user.id} granted extra storage`);
            }
            
            // Log the successful payment
            console.log(`Payment processed: ${paymentIntent.amount / 100} ${paymentIntent.currency}`);
          } catch (error) {
            console.error("Error processing successful payment:", error);
          }
        },
        
        onPaymentFailed: async (paymentIntent, user, db) => {
          console.log(`Payment failed for user ${user.id}:`, paymentIntent.id);
          
          try {
            // Log failed payment for support follow-up
            console.error(`Payment failed: ${paymentIntent.amount / 100} ${paymentIntent.currency}`, {
              userId: user.id,
              paymentIntentId: paymentIntent.id,
              error: paymentIntent.last_payment_error?.message,
            });
            
            // You could send a notification email here
            // await sendPaymentFailedEmail(user.email, paymentIntent);
          } catch (error) {
            console.error("Error handling failed payment:", error);
          }
        },
        
        onInvoicePaymentSucceeded: async (invoice, user, db) => {
          console.log(`Invoice payment succeeded for user ${user.id}:`, invoice.id);
          
          try {
            const dbInstance = drizzle(env.DB, { schema });
            await dbInstance.update(schema.user)
              .set({ 
                lastPaymentDate: new Date(),
                updatedAt: new Date(),
              })
              .where(eq(schema.user.id, user.id));
              
            console.log(`User ${user.id} payment date updated`);
          } catch (error) {
            console.error("Error updating payment date:", error);
          }
        },
        
        onInvoicePaymentFailed: async (invoice, user, db) => {
          console.log(`Invoice payment failed for user ${user.id}:`, invoice.id);
          
          try {
            // Handle failed invoice payment
            // You might want to notify the user or take specific actions
            console.error(`Invoice payment failed for user ${user.id}`, {
              invoiceId: invoice.id,
              amount: invoice.amount_due / 100,
              currency: invoice.currency,
            });
            
            // You could send a payment failed notification here
            // await sendInvoiceFailedEmail(user.email, invoice);
          } catch (error) {
            console.error("Error handling failed invoice:", error);
          }
        },
      })
    ],

    advanced: {
      crossSubDomainCookies: {
        enabled: true,
      },
    }
  });

  return auth;
}

/**
 * Add drizzle DB to locals.db
 */
export const initDatabase = async ({ event, resolve }: { event: any, resolve: Function }) => {
  event.locals.db = drizzle(event.platform?.env.DB, { schema });
  return resolve(event);
};

export const permissions = {
  "/admin": ["admin"],
  "/settings": ["user", "admin"],
  "/dashboard": ["user", "admin"],
  "/billing": ["user", "admin"],
  "/subscription": ["user", "admin"]
};

/**
 * SvelteKit hook for checking user authorization and handling route protection
 */
export const checkAuthorization = async ({ event, resolve }: { event: any, resolve: Function }) => {
  const user = await initializeUser(event.locals, event.request);
  
  for (const route in permissions) {
    if (event.route.id?.startsWith(route) && 
        permissions[route]?.length && 
        !permissions[route]?.includes(user?.isAdmin ? "admin" : user ? "user" : null)) {
      throw redirect(307, "/signin");
    }
  }

  return resolve(event);
};

/**
 * Get user object from locals of the request
 */
export async function initializeUser(locals: any, request: any): Promise<User | null> {
  const session = await auth.api.getSession({
    headers: request?.headers
  });
  
  if (!session?.user?.email) {
    return null;
  }

  const authUser = await locals.db.query.user.findFirst({
    where: eq(user.email, session.user.email),
  });
  
  if (!authUser) {
    throw error(401, "Unauthorized");
  }

  return authUser;
}

// Utility functions for subscription management
export const subscriptionUtils = {
  /**
   * Check if user has an active subscription
   */
  hasActiveSubscription: (user: any): boolean => {
    return user?.subscriptionStatus === "active";
  },

  /**
   * Get user's subscription tier
   */
  getSubscriptionTier: (user: any): string | null => {
    return user?.subscriptionTier || null;
  },

  /**
   * Check if user can access a specific feature
   */
  canAccessFeature: (user: any, feature: string): boolean => {
    const tier = user?.subscriptionTier;
    
    if (!tier || !subscriptionUtils.hasActiveSubscription(user)) {
      return false;
    }

    const featureAccess = {
      basic: ["basic_feature1", "basic_feature2", "basic_support"],
      pro: ["basic_feature1", "basic_feature2", "basic_support", "pro_feature1", "pro_feature2", "advanced_analytics"],
      enterprise: ["basic_feature1", "basic_feature2", "basic_support", "pro_feature1", "pro_feature2", "advanced_analytics", "enterprise_feature1", "custom_integrations"],
    };

    return featureAccess[tier]?.includes(feature) || false;
  },

  /**
   * Check if user has premium features (one-time purchase)
   */
  hasPremiumFeatures: (user: any): boolean => {
    return user?.hasPremiumFeatures === true;
  },

  /**
   * Check if user has extra storage (one-time purchase)
   */
  hasExtraStorage: (user: any): boolean => {
    return user?.extraStorage === true;
  },

  /**
   * Get subscription status display text
   */
  getSubscriptionStatusText: (user: any): string => {
    const status = user?.subscriptionStatus;
    switch (status) {
      case "active":
        return "Active";
      case "cancelled":
        return "Cancelled";
      case "past_due":
        return "Past Due";
      case "paused":
        return "Paused";
      default:
        return "No Subscription";
    }
  },
};

// Export the utility functions for use in your app
export { subscriptionUtils as subscription };

/* 
Environment variables to add to your .env file:

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # or sk_live_... for production
STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_... for production  
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (create these in your Stripe Dashboard)
STRIPE_PROFESSIONAL_PRICE_ID=price_... # $5/month
STRIPE_TEAM_PRICE_ID=price_...         # $99/month

# Node Environment
NODE_ENV=development # or production

Database schema fields you'll need to add to your user table (only fields needed for BetterAuth Stripe integration):

// Core subscription fields
subscriptionStatus: text // "active", "cancelled", "past_due", "paused", or null for free
planType: text // "free", "professional", "team"
stripeSubscriptionId: text // Stripe subscription ID
stripeCustomerId: text // Stripe customer ID  
subscriptionStartDate: timestamp
subscriptionEndDate: timestamp
lastInvoicePaymentDate: timestamp

// Timestamps
updatedAt: timestamp
*/