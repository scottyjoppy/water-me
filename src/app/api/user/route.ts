// app/api/profile/route.ts (Next.js 13+ convention for API routes)

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    email: user.email,
    username: user.user_metadata?.full_name ?? null,
  });
}

export async function PUT(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { email, phone, username } = body;

  if (!email || !username) {
    return NextResponse.json(
      { error: "Email and username are required." },
      { status: 400 }
    );
  }

  const { error: updateError } = await supabase.auth.updateUser({
    email,
    phone,
    data: { full_name: username },
  });

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
