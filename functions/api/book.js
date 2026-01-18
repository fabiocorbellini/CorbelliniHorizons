export async function onRequestPost({ request, env }) {
  const formData = await request.formData();

  // 🛑 Honeypot spam protection
  if (formData.get("website")) {
    return new Response("Spam detected", { status: 400 });
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const horizon = formData.get("horizon");
  const date = formData.get("date");
  const message = formData.get("message");

  const body = `
New booking request — Corbellini Horizons

Name: ${name}
Email: ${email}
Horizon: ${horizon}
Requested date: ${date}

Message:
${message}
  `;

  await env.SEND_EMAIL.send({
    to: "booking@corbellini.com.br",
    subject: "New Booking Request — Corbellini Horizons",
    text: body,
  });

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { "Content-Type": "application/json" } }
  );
}
