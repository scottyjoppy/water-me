import { NeedsWaterEmail } from "@/emails/needsWaterEmail";
import { Plant } from "@/types/databaseValues";
import { NextResponse } from "next/server";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      email,
      name,
      plants,
    }: { email: string; name: string; plants: Plant[] } = await req.json();

    const emailComponent = React.createElement(NeedsWaterEmail, {
      name,
      plants,
    });

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Plants need watering!",
      react: emailComponent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
