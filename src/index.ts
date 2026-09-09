export default {
  async fetch(request, env) {
    const result = await env.EMAIL.send({
      from: "alert@example.com",
      to: "your-email@gmail.com",
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
