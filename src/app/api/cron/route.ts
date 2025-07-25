import checkAllUsersPlants from "@/utils/checkAllUsersPlants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  console.log("Cron job started at:", new Date().toISOString());

  try {
    await checkAllUsersPlants();
    console.log("Plant check completed successfully.");
    return NextResponse.json({
      message: "Plant check complete",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Cron job failed:", err);
    return NextResponse.json(
      {
        message: "Failed to check plants",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
