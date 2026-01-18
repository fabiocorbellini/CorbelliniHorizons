export async function onRequestPost({ request, env }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const horizon = formData.get("horizon");
  const date = formData.get("date");
  const message = formData.get("message");

  const body = `
New booking request – Corbellini Horizons

Name: ${name}
Email: ${email}
Horizon: ${horizon}
Requested date: ${date}

Message:
${message}
`;

  await env.SEND_EMAIL.send({
    to: "corbellini@gmail.com",
    subject: "New Booking Request – Corbellini Horizons",
    text: body,
  });

  return new Response(
    "Thank you! We’ll respond within 24 hours.",
    { status: 200 }
  );
}

