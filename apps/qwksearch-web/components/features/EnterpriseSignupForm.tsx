"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/lib/config/site";
import {
  BUSINESS_TYPES,
  MESSAGE_MAX_LENGTH,
  TEAM_SIZES,
} from "@/lib/enterprise-request";
import { cn } from "@/lib/utils";

// Matches `components/ui/input` so the two selects sit flush with the fields.
const SELECT_CLASS =
  "bg-card flex h-11 w-full rounded-2xl border px-3 py-1 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50";

/**
 * The enterprise & white-label sign-up. It closes the features page as part of
 * one conversion box, and `/enterprise` renders the same form, so the fields
 * only live here. Styled with theme tokens rather than fixed colors: the
 * features page follows light and dark mode.
 *
 * Ids are prefixed with `useId` because the homepage mounts the whole features
 * page underneath the workspace, where bare ids like `name` or `email` would
 * collide with the app's own fields.
 */
export function EnterpriseSignupForm({ className }: { className?: string }) {
  const id = React.useId();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);

    const data = new FormData(form);

    try {
      const response = await fetch("/api/enterprise-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          businessType: data.get("business-type"),
          teamSize: data.get("team-size"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(result?.error || "Something went wrong.");
      }

      toast.success("Thank you for your interest!", {
        description: "We'll be in touch within 24 hours to discuss your needs.",
      });
      form.reset();
    } catch (error) {
      toast.error("Couldn't send your request", {
        description:
          error instanceof Error && error.message !== "Failed to fetch"
            ? error.message
            : `Please try again, or email us at ${config.appEmail}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5 text-left", className)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${id}-name`}>Full Name *</Label>
          <Input id={`${id}-name`} name="name" required placeholder="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${id}-email`}>Work Email *</Label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            placeholder="john@company.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${id}-business-type`}>Business Type *</Label>
          <select
            id={`${id}-business-type`}
            name="business-type"
            required
            defaultValue=""
            className={SELECT_CLASS}
          >
            <option value="" disabled>
              Select business type
            </option>
            {BUSINESS_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${id}-team-size`}>Team Size *</Label>
          <select
            id={`${id}-team-size`}
            name="team-size"
            required
            defaultValue=""
            className={SELECT_CLASS}
          >
            <option value="" disabled>
              Select team size
            </option>
            {TEAM_SIZES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-message`}>Tell Us About Your Needs</Label>
        <Textarea
          id={`${id}-message`}
          name="message"
          placeholder="What challenges are you looking to solve? What are your main requirements?"
          maxLength={MESSAGE_MAX_LENGTH}
          className="min-h-28"
        />
      </div>

      <div className="flex items-start gap-2">
        <Checkbox id={`${id}-consent`} name="consent" required className="mt-0.5" />
        <label
          htmlFor={`${id}-consent`}
          className="text-muted-foreground text-sm leading-snug"
        >
          I agree to receive communications about {config.appName} and accept
          the{" "}
          <Link
            href="/legal/privacy"
            className="hover:text-foreground underline underline-offset-2"
          >
            privacy policy
          </Link>{" "}
          *
        </label>
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send />
            Submit Request
          </>
        )}
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        By submitting this form, you agree to our terms of service and privacy
        policy. We typically respond within 24 hours.
      </p>
    </form>
  );
}
