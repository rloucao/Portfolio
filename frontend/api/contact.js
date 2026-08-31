import { Resend } from "resend";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const MAX_LENGTHS = { name: 100, email: 254, message: 5000 };

// onboarding@resend.dev works without domain verification but can only deliver
// to your own Resend account address — fine until rloucao.dev is verified.
const FROM = process.env.MAIL_FROM ?? "Portfolio <onboarding@resend.dev>";
const TO = process.env.MAIL_TO ?? "rodrigoloucao570@gmail.com";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// The visitor controls these strings and they land in an HTML email.
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/*
 * Built lazily: the Resend constructor throws without a key, and at module
 * scope that would turn a missing env var into a cold-start crash instead of a
 * handleable error.
 */
let client = null;
const resend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
};

/**
 * Verifies a Cloudflare Turnstile token, then delivers the message via Resend.
 * The Turnstile secret and the Resend key stay server-side; the browser can
 * neither see them nor reach the mail provider directly.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, token } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: "That email address doesn't look valid." });
  }
  for (const [field, limit] of Object.entries(MAX_LENGTHS)) {
    if (String({ name, email, message }[field]).length > limit) {
      return res.status(400).json({ error: `The ${field} field is too long.` });
    }
  }
  if (!token) {
    return res.status(400).json({ error: "Please complete the verification." });
  }

  // ── 1. Verify the Turnstile token with Cloudflare ────────────────────────
  let verification;
  try {
    const params = new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
    });
    const ip = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"];
    if (ip) params.append("remoteip", String(ip).split(",")[0].trim());

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    verification = await response.json();
  } catch (err) {
    console.error("[contact] Turnstile request failed:", err);
    return res.status(502).json({ error: "Could not reach the verification service." });
  }

  if (!verification.success) {
    console.warn("[contact] Turnstile rejected token:", verification["error-codes"]);
    return res.status(403).json({ error: "Verification failed. Please try again." });
  }

  // ── 2. Only now does the message go out ──────────────────────────────────
  const api = resend();
  if (!api) {
    console.error("[contact] RESEND_API_KEY is missing");
    return res.status(500).json({ error: "The contact form is not configured." });
  }

  const sentAt = new Date().toLocaleString("en-GB", { timeZone: "Europe/Lisbon" });

  try {
    /*
     * `from` is always our own domain, never the visitor's address — putting
     * theirs there is spoofing and DMARC would bin it. Their address goes in
     * replyTo, which is what makes "Reply" reach them.
     */
    const { error } = await api.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\nSent: ${sentAt}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6">
          <h2 style="margin:0 0 .5rem">New portfolio message</h2>
          <p style="margin:0 0 1rem;color:#555">
            <strong>${escapeHtml(name)}</strong>
            &lt;<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>&gt;<br>
            <small>${escapeHtml(sentAt)}</small>
          </p>
          <div style="white-space:pre-wrap;padding:1rem;background:#f6f6f6;border-radius:8px">${escapeHtml(
            message
          )}</div>
        </div>`,
    });

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return res.status(502).json({ error: "Could not send the message. Please try again." });
    }
  } catch (err) {
    console.error("[contact] Exception while sending:", err);
    return res.status(502).json({ error: "Could not send the message. Please try again." });
  }

  return res.status(200).json({ ok: true });
}
