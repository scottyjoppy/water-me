import { supabaseAdmin } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, context: RouteContext) {
  const { id: userId } = await context.params;

  try {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (error || !data?.user) {
      return NextResponse.json(
        { error: error?.message || "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
