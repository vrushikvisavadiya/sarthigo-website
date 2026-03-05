import { createServerSupabaseClient, createAdminClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/contact — admin only
// POST /api/contact — public (contact form submission)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const admin = createAdminClient();
    let query = admin.from("contacts").select("*").order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, subject, message } = body;

    if (!name || !phone || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields: name, phone, subject, message" }, { status: 400 });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await admin.from("contacts").insert([{
      name,
      phone,
      email: body.email ?? null,
      subject,
      message,
      status: "new",
    }]).select().single();

    if (error) throw error;
    return NextResponse.json({ data, message: "Thanks for reaching out! We'll get back to you within 24 hours." }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json({ error: err?.message || String(err) || "Server Error" }, { status: 500 });
  }
}
