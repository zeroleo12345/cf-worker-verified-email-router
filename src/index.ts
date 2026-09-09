/**
 * 参考:
 *    https://developers.cloudflare.com/email-service/
 */
interface Env {
  EMAIL: SendEmail;
  EMAIL_TO: string;
  TOKEN: string;
}

function hasRequiredConfiguration(env: Env): boolean {
  const missing = ["EMAIL_TO", "TOKEN"].filter(
    (name) => !env[name as keyof Env]?.trim()
  );

  if (missing.length > 0) {
    console.error("Worker configuration is missing required variables", { missing });
    return false;
  }

  return true;
}

export default {
  // Handle HTTP requests (Email Sending)
  async fetch(request, env: Env, ctx): Promise<Response> {
    if (!hasRequiredConfiguration(env)) {
      return new Response("Server configuration is incomplete", { status: 500 });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "POST" },
      });
    }
    if (request.headers.get("Authorization") !== `Bearer ${env.TOKEN}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    await env.EMAIL.send({
      to: data.to,
      from: data.from,
      subject: data.subject,
      html: data.html,
      text: data.text,
    });

    return new Response("Email sent successfully");
  },

  // Handle incoming emails (Email Routing)
  async email(message, env: Env, ctx): Promise<void> {
    if (!hasRequiredConfiguration(env)) {
      return new Response("Server configuration is incomplete", { status: 500 });
    }
    // Forward to a single address
    await message.forward(env.EMAIL_TO);
  },
} satisfies ExportedHandler<Env>;
