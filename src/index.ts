/**
 * 参考:
 *    https://developers.cloudflare.com/email-service/
 */
interface Env {
  EMAIL: SendEmail;
  EMAIL_TO: string;
  TOKEN: string;
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

  /** Once enable, this worker will appear in Email Routing Page "Destination Workers" */
  /*
  // Handle incoming emails (Email Routing)
  async email(message, env: Env, ctx): Promise<void> {
    // Forward to a single address
    await message.forward(env.EMAIL_TO);
  },
  */
} satisfies ExportedHandler<Env>;
