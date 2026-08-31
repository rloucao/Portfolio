import emailjs from "@emailjs/nodejs";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const MAX_LENGTHS = { name: 100, email: 254, message: 5000 };

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * Verifies a Cloudflare Turnstile token, then sends the message through
 * EmailJS. Both the Turnstile secret and the EmailJS private key stay on the
 * server — the browser never sees either, and it cannot reach EmailJS itself.
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
    // The visitor's IP is optional but tightens the check.
    const ip = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"];
    if (ip) params.append("remoteip", String(ip).split(",")[0].trim());

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    verification = await response.json();
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    return res.status(502).json({ error: "Could not reach the verification service." });
  }

  if (!verification.success) {
    // Codes are for the log, not the visitor.
    console.warn("Turnstile rejected token:", verification["error-codes"]);
    return res.status(403).json({ error: "Verification failed. Please try again." });
  }

  // ── 2. Only now does the message get sent ────────────────────────────────
  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        name,
        email_id: email,
        message,
        time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Lisbon" }),
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );
  } catch (err) {
    console.error("EmailJS send failed:", err);
    return res.status(502).json({ error: "Could not send the message. Please try again." });
  }

  return res.status(200).json({ ok: true });
}
