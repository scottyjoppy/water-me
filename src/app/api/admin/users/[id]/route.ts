import { supabaseAdmin } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  const userId = context.params.id;

  try {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message || "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ user: data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
