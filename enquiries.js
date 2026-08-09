import { getStore } from "@netlify/blobs";

// Uses Netlify Blobs — no manual setup, no environment variables, no
// external account needed. Netlify automatically gives this function
// access to its own storage at deploy time.

export default async (req) => {
  const store = getStore("enquiries");

  if (req.method === "GET") {
    const data = (await store.get("list", { type: "json" })) || [];
    return Response.json(data);
  }

  if (req.method === "POST") {
    const form = await req.json();
    const data = (await store.get("list", { type: "json" })) || [];
    const enquiry = {
      id: crypto.randomUUID(),
      name: form.name,
      phone: form.phone,
      email: form.email || "",
      date: form.date,
      eventType: form.eventType,
      guestCount: form.guestCount,
      message: form.message || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    data.unshift(enquiry);
    await store.setJSON("list", data);
    return Response.json(enquiry);
  }

  if (req.method === "PATCH") {
    const { id, status } = await req.json();
    const data = (await store.get("list", { type: "json" })) || [];
    const updated = data.map((e) => (e.id === id ? { ...e, status } : e));
    await store.setJSON("list", updated);
    return Response.json({ ok: true });
  }

  if (req.method === "DELETE") {
    const { id } = await req.json();
    const data = (await store.get("list", { type: "json" })) || [];
    const filtered = data.filter((e) => e.id !== id);
    await store.setJSON("list", filtered);
    return Response.json({ ok: true });
  }

  return new Response("Method not allowed", { status: 405 });
};
