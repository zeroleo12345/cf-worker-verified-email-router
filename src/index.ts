interface Env {
  EMAIL: SendEmail;
  EMAIL_FROM: string;
  EMAIL_TO: string;
  SEND_TOKEN: string;
}

export default {
  async fetch(request, env): Promise<Response> {
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
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      subject: "Cloudflare Worker Test",
      text: "Hello from Cloudflare Worker!",
      html: `
        <h1>Hello</h1>
        <p>This email was sent by Cloudflare Worker.</p>
      `,
    });

    return Response.json({ ok: true });
  },
} satisfies ExportedHandler<Env>;
