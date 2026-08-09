import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("blocked-dates");

  if (req.method === "GET") {
    const data = (await store.get("list", { type: "json" })) || [];
    return Response.json(data);
  }

  if (req.method === "POST") {
    const { date } = await req.json();
    const data = (await store.get("list", { type: "json" })) || [];
    if (!data.includes(date)) data.push(date);
    await store.setJSON("list", data);
    return Response.json({ ok: true });
  }

  if (req.method === "DELETE") {
    const { date } = await req.json();
    const data = (await store.get("list", { type: "json" })) || [];
    const filtered = data.filter((d) => d !== date);
    await store.setJSON("list", filtered);
    return Response.json({ ok: true });
  }

  return new Response("Method not allowed", { status: 405 });
};
