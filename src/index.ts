/**
 * 参考:
 *    https://developers.cloudflare.com/email-service/
 */
interface Env {
  EMAIL: SendEmail;
  EMAIL_FROM: string;
  EMAIL_TO: string;
  SEND_TOKEN: string;
}

export default {
  // Handle HTTP requests (Email Sending)
  async fetch(request, env: Env, ctx): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "POST" },
      });
    }

    if (request.headers.get("Authorization") !== `Bearer ${env.SEND_TOKEN}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    await env.EMAIL.send({
      to: env.EMAIL_TO,
      from: env.EMAIL_FROM,
      subject: "Cloudflare Worker Email Router",
      html: `
        <h1>Hello</h1>
        <p>This email was sent by Cloudflare Worker.</p>
      `,
      text: "Hello from Cloudflare Worker!",
    });

    return new Response("Email sent successfully");
  },

  // Handle incoming emails (Email Routing)
  async email(message, env: Env, ctx): Promise<void> {
    // Forward to a single address
    if (message.to.includes("@yourdomain.com")) {
      await message.forward(env.EMAIL_TO);
    }
  },
} satisfies ExportedHandler<Env>;
