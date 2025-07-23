import checkAllUsersPlants from "@/utils/checkAllUsersPlants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  try {
    await checkAllUsersPlants();
    return NextResponse.json({ message: "Plant check complete" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to check plants" },
      { status: 500 }
    );
  }
}
