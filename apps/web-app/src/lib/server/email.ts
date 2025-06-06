import { Resend } from "resend";

import { PUBLIC_DOMAIN, APP_EMAIL, APP_NAME, APP_ICON } from "$lib/customize-site";

var EmailChangeHtml = `
  <h4>Hello {{user}}!</h4>
    <p>Use the following token to change your email</p>
    <code>{{token}}</code>
    <p>If you didn't ask to change your email address, you can ignore this email.</p>
    <p>
      Thanks,<br />
      {{appName}}  

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
  </p>
  `;

var PasswordResetHtml = `
 <p>Use the following token to reset your password</p>
<code style="font-size: 1.5rem">{{token}}</code>
<p>If you didn't ask to reset your password, you can ignore this email.</p>
<p>
  Thanks,<br />
  {{appName}} 
</p>
`;

var WelcomeHtml = `
  <h4>Welcome {{user}}!</h4>
  <p>Thank you for joining us at {{appName}}.</p>
  <p>Visit our <a href="{{url}}" target="_blank" rel="noopener">homepage</a></p>
  <p>
    Thanks,<br />
    {{appName}} 
  </p>
  `;

  /**
   * Sends an email to the specified email address.
   *
   * @see Resend [Resend Docs](https://resend.com/docs/introduction)
   * @param {string} email - The email address to send the email to.
   * @param {string} subject - The subject of the email.
   * @param {string} body - The content of the email.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the email was sent successfully.
   */
  export async function sendEmail(
    email: string,
    subject: string,
    body: string,
    authResendKey: string
  ): Promise<boolean> {
    try {
      const resend = new Resend(authResendKey);

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
  token: string,
  authResendKey: string
): Promise<boolean> {
  if (!email || !name || !token) return false;

  const body = EmailVerificationHtml.replace("{{urlLogo}}", APP_ICON)
    .replaceAll("{{appName}}", APP_NAME)
    .replace("{{user}}", name)
    .replace("{{urlLogo}}", APP_ICON)
    .replace("{{token}}", token);

  return await sendEmail(email, "Verify your " + APP_NAME + " email", body, authResendKey);
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  authResendKey: string
): Promise<boolean> {
  if (!email || !name) return false;

  const body = WelcomeHtml.replaceAll("{{appName}}", APP_NAME)
    .replace("{{user}}", name)
    .replace("{{urlLogo}}", APP_ICON)
    .replace("{{url}}", PUBLIC_DOMAIN);

  return await sendEmail(email, "Welcome to " + APP_NAME, body, authResendKey);
}

// TODO insert welcome user in this email
export async function sendPasswordResetEmail(
  email: string,
  token: string,
  authResendKey: string
): Promise<boolean> {
  if (!email || !token) return false;

  const body = PasswordResetHtml.replace("{{urlLogo}}", APP_ICON)
    .replaceAll("{{appName}}", APP_NAME)
    .replace("{{urlLogo}}", APP_ICON)
    .replace("{{token}}", token);

  return await sendEmail(email, "Reset your password for " + APP_NAME, body, authResendKey);
}

export async function sendEmailChangeEmail(
  email: string,
  name: string,
  token: string,
  authResendKey: string
): Promise<boolean> {
  if (!email || !name || !token) return false;

  const body = EmailChangeHtml.replace("{{urlLogo}}", APP_ICON)
    .replaceAll("{{appName}}", APP_NAME)
    .replace("{{user}}", name)
    .replace("{{urlLogo}}", APP_ICON)
    .replace("{{token}}", token);

  return await sendEmail(
    email,
    "Confirm your " + APP_NAME + " new email address",
    body,
    authResendKey
  );
}
