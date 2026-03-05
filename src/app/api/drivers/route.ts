import { createServerSupabaseClient, createAdminClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/drivers — admin only
// POST /api/drivers — public (driver self-register)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // pending | approved | rejected

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const admin = createAdminClient();
    let query = admin.from("drivers").select("*").order("created_at", { ascending: false });
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
    const { name, phone, email, city, vehicle_type } = body;

    if (!name || !phone || !email || !city || !vehicle_type) {
      return NextResponse.json({ error: "Missing required fields: name, phone, email, city, vehicle_type" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await admin.from("drivers").insert([{
      name,
      phone,
      email,
      city,
      vehicle_type,
      vehicle_number: body.vehicle_number,
      bio: body.bio,
      languages: body.languages ?? [],
      status: "pending",
      plan: "free",
    }]).select().single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "A driver with this phone or email already exists." }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ data, message: "Registration received! We'll review and contact you within 24 hours." }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 500 });
  }
}
