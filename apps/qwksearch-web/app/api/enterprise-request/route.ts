/**
 * @fileoverview Receives the enterprise & white-label request form. Public:
 * anyone can submit. Every request is stored in `enterprise_requests` first
 * (readable in the admin database view), then emailed to the site's contact
 * address through the `EMAIL` binding. A failed email marks the row `failed`
 * but still thanks the sender, since the request itself was saved.
 */
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDB } from "@/lib/database";
import { enterpriseRequests } from "@/lib/database/schema";
import { getCloudflareContext } from "@/lib/cloudflare/context";
import { config } from "@/lib/config/site";
import {
  businessTypeLabel,
  parseEnterpriseRequest,
  teamSizeLabel,
} from "@/lib/enterprise-request";
import type { Env } from "@/lib/auth";

export const runtime = "nodejs";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = parseEnterpriseRequest(body);
  if (parsed.ok === false) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const request = parsed.value;

  try {
    const db = getDB();
    const [inserted] = await db
      .insert(enterpriseRequests)
      .values({
        name: request.name,
        email: request.email,
        businessType: request.businessType,
        teamSize: request.teamSize,
        message: request.message || null,
        status: "sent",
      })
      .returning();

    try {
      const env = getCloudflareContext().env as Env;
      if (!env.EMAIL) throw new Error("EMAIL binding not configured");
      if (!config.appEmail) throw new Error("No contact address configured");

      const rows = [
        ["Name", request.name],
        ["Email", request.email],
        ["Business type", businessTypeLabel(request.businessType)],
        ["Team size", teamSizeLabel(request.teamSize)],
        ["Needs", request.message || "(none given)"],
      ]
        .map(
          ([label, value]) =>
            `<tr><th align="left" valign="top">${label}</th><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
        )
        .join("");

      await env.EMAIL.send({
        from: config.appEmail,
        to: config.appEmail,
        subject: `Enterprise request from ${request.name} (${businessTypeLabel(request.businessType)}, ${teamSizeLabel(request.teamSize)})`,
        html: `<p>New enterprise &amp; white-label request on ${config.appName}:</p><table cellpadding="4">${rows}</table>`,
      });
    } catch (error) {
      console.error("[enterprise-request] Failed to send notification email:", error);
      await db
        .update(enterpriseRequests)
        .set({ status: "failed" })
        .where(eq(enterpriseRequests.id, inserted.id));
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving enterprise request:", error);
    return NextResponse.json(
      { error: "Failed to submit your request. Please try again." },
      { status: 500 },
    );
  }
}
