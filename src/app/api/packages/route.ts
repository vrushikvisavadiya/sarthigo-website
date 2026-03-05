import { createServerSupabaseClient, createAdminClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/packages — public, returns active packages
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const car = searchParams.get("car");
    const trip = searchParams.get("trip");
    const all = searchParams.get("all"); // admin: include inactive

    const supabase = createAdminClient();
    let query = supabase.from("packages").select("*").order("sort_order").order("created_at");

    if (!all) query = query.eq("active", true);
    if (city) query = query.eq("city", city);
    if (trip) query = query.eq("trip_type", trip);
    if (car) query = query.contains("cars", [car]);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/packages — admin only
export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const admin = createAdminClient();
    const { data, error } = await admin.from("packages").insert([body]).select().single();
    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
