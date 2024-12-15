import { Resend } from "resend";

import { ORIGIN, APP_EMAIL, APP_NAME, APP_ICON } from "$lib/middleware/config";
import { RESEND_API_KEY } from "$env/static/private";

var EmailChangeHtml = `
  <h4>Hello {{user}}!</h4>
    <p>Use the following token to change your email</p>
    <code>{{token}}</code>
    <p>If you didn't ask to change your email address, you can ignore this email.</p>
    <p>
      Thanks,<br />
      {{appName}} 
      <img class="logo" src="{{urlLogo}}" alt="logo" />
    </p>
    `;

var EmailVerificationHtml = `
  <h4>Welcome {{user}}!</h4>
  <p>Thank you for joining us at {{appName}}.</p>
  <p>Use the following token to verify your email</p>
  <code>{{token}}</code>
  <p>If you did not create this account, you can disregard this email.</p>
  <p>
    Thanks,<br />
    {{appName}}
    <img class="logo" src="{{urlLogo}}" alt="logo" />
  </p>
  `;

var PasswordResetHtml = `
 <p>Use the following token to reset your password</p>
<code style="font-size: 1.5rem">{{token}}</code>
<p>If you didn't ask to reset your password, you can ignore this email.</p>
<p>
  Thanks,<br />
  {{appName}} 
  <img class="logo" src="{{urlLogo}}" alt="logo" />
</p>
`;

var WelcomeHtml = `
  <h4>Welcome {{user}}!</h4>
  <p>Thank you for joining us at {{appName}}.</p>
  <p>Visit our <a href="{{url}}" target="_blank" rel="noopener">dashboard</a></p>
  <p>
    Thanks,<br />
    {{appName}} 
    <img class="logo" src="{{urlLogo}}" alt="logo" />
  </p>
  `;

export async function sendEmail(
  email: string,
  subject: string,
  body: string
): Promise<boolean> {
  try {
    const resend = new Resend(RESEND_API_KEY);

    const data = await resend.emails.send({
      from: APP_NAME + " <" + APP_EMAIL + ">",
      to: [email],
      subject: subject,
      html: body,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Sends a verification email to the specified email address.
 *
 * @param {string} email - The email address to send the verification email to.
 * @param {string} name - The name of the user to include in the email.
 * @param {string} token - The verification token to include in the email.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the email was sent successfully.
 */
export async function sendEmailVerificationEmail(
  email: string,
  name: string,
  token: string
): Promise<boolean> {
  if (!email || !name || !token) return false;

  const body = EmailVerificationHtml.replace("{{urlLogo}}", APP_ICON)
    .replaceAll("{{appName}}", APP_NAME)
    .replace("{{user}}", name)
    .replace("{{token}}", token);

  return await sendEmail(email, "Verify your " + APP_NAME + " email", body);
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  APP_ICON: string
): Promise<boolean> {
  if (!email || !name) return false;

  const body = WelcomeHtml.replaceAll("{{appName}}", APP_NAME)
    .replace("{{user}}", name)
    .replace("{{urlLogo}}", APP_ICON)
    .replace("{{url}}", ORIGIN);

  return await sendEmail(email, "Welcome to " + APP_NAME, body);
}

// TODO insert welcome user in this email
export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<boolean> {
  if (!email || !token) return false;

  const body = PasswordResetHtml.replace("{{urlLogo}}", APP_ICON)
    .replaceAll("{{appName}}", APP_NAME)
    .replace("{{token}}", token);

  return await sendEmail(email, "Reset your password for " + APP_NAME, body);
}

export async function sendEmailChangeEmail(
  email: string,
  name: string,
  token: string
): Promise<boolean> {
  if (!email || !name || !token) return false;

  const body = EmailChangeHtml.replace("{{urlLogo}}", APP_ICON)
    .replaceAll("{{appName}}", APP_NAME)
    .replace("{{user}}", name)
    .replace("{{token}}", token);

  return await sendEmail(
    email,
    "Confirm your " + APP_NAME + " new email address",
    body
  );
}
