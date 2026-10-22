/**
 * @fileoverview Field options and validation for the enterprise & white-label
 * request form. The form renders these options and the API route accepts only
 * these values, so the two can't drift apart.
 */

export const BUSINESS_TYPES = [
  { value: "startup", label: "Startup" },
  { value: "agency", label: "Agency" },
  { value: "saas", label: "SaaS Company" },
  { value: "enterprise", label: "Enterprise" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "other", label: "Other" },
] as const;

export const TEAM_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-1000", label: "201-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
] as const;

export const MESSAGE_MAX_LENGTH = 5000;

export interface EnterpriseRequestInput {
  name: string;
  email: string;
  businessType: string;
  teamSize: string;
  message: string;
  consent: boolean;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelFor = (
  options: readonly { value: string; label: string }[],
  value: string,
) => options.find((option) => option.value === value)?.label ?? value;

export const businessTypeLabel = (value: string) =>
  labelFor(BUSINESS_TYPES, value);
export const teamSizeLabel = (value: string) => labelFor(TEAM_SIZES, value);

/**
 * Normalizes an untrusted request body. Returns the cleaned request, or the
 * first problem found as a message fit to show the person who filled it in.
 */
export function parseEnterpriseRequest(
  body: unknown,
): { ok: true; value: EnterpriseRequestInput } | { ok: false; error: string } {
  const raw = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const str = (key: string) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";

  const value: EnterpriseRequestInput = {
    name: str("name"),
    email: str("email").toLowerCase(),
    businessType: str("businessType"),
    teamSize: str("teamSize"),
    message: str("message"),
    consent: raw.consent === true,
  };

  if (!value.name || value.name.length > 200) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!EMAIL_PATTERN.test(value.email) || value.email.length > 320) {
    return { ok: false, error: "Please enter a valid work email." };
  }
  if (!BUSINESS_TYPES.some((option) => option.value === value.businessType)) {
    return { ok: false, error: "Please select a business type." };
  }
  if (!TEAM_SIZES.some((option) => option.value === value.teamSize)) {
    return { ok: false, error: "Please select a team size." };
  }
  if (value.message.length > MESSAGE_MAX_LENGTH) {
    return {
      ok: false,
      error: `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`,
    };
  }
  if (!value.consent) {
    return { ok: false, error: "Please accept the privacy policy to continue." };
  }

  return { ok: true, value };
}
