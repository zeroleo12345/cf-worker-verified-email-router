export default {
  async fetch(request, env) {
    const result = await env.EMAIL.send({
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      subject: "Cloudflare Worker Test",
      text: "Hello from Cloudflare Worker!",
      html: `
        <h1>Hello</h1>
        <p>This email was sent by Cloudflare Worker.</p>
      `
    });

    return Response.json(result);
  }
};
