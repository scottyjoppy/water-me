import NeedsWaterEmail from "@/emails/needsWaterEmail";
import { Plant } from "@/types/databaseValues";
import React from "react";
import { Resend } from "resend";
import getNextWaterDate from "./getNextWaterDate";
import { supabaseAdmin } from "./supabase/admin";

export default async function checkAllUsersPlants() {
  const fetchPlants = async () => {
    const { data, error } = await supabaseAdmin.from("plants").select("*");

    if (error) {
      throw new Error(`Failed to fetch plants: ${error.message}`);
    }

    return { plants: data };
  };

  try {
    const data = await fetchPlants();

    const plants = data.plants as Plant[];
    const userList: { [userId: string]: Plant[] } = {};
    plants.forEach((el: Plant) => {
      if (!needsWatering(el)) {
        return;
      }

      const userId = el.user_id;
      if (userList[userId]) {
        userList[userId].push(el);
      } else {
        userList[userId] = [el];
      }
    });

    await createEmails(userList);
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
}

const needsWatering = (plant: Plant): boolean => {
  const next = getNextWaterDate(plant);

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const nextWater = new Date(next);
  nextWater.setHours(12, 0, 0, 0);

  return nextWater.getTime() <= today.getTime();
};

interface User {
  id: string;
  email: string;
  name?: string;
  settings: {
    notifications: boolean;
  } | null;
}

const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (authError || !authData) {
      console.error(`Failed to fetch user ${userId}: ${authError?.message}`);
      return null;
    }

    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("settings")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error(
        `Failed to fetch profile for user ${userId}: ${profileError.message}`
      );
    }

    return {
      id: authData.user.id,
      email: authData.user.email!,
      name: authData.user.user_metadata?.full_name || null,
      settings: (profileData?.settings as { notifications: boolean }) || null,
    };
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    return null;
  }
};

const resend = new Resend(process.env.RESEND_API_KEY);

const createEmails = async (userList: { [userId: string]: Plant[] }) => {
  const emailPromises: Promise<void>[] = [];

  for (const userId in userList) {
    const plants = userList[userId];

    const emailPromise = (async () => {
      try {
        const user = await getUserById(userId);

        if (!user) {
          console.error(`No user or email found for userId: ${userId}`);
          return;
        }

        if (user.settings?.notifications === false) {
          console.log(`Email notifications disabled for user ${user.email}`);
          return;
        }

        const emailComponent = React.createElement(NeedsWaterEmail, {
          name: user.name || "Plant Parent",
          plants,
        });

        const data = await resend.emails.send({
          from: "plant@water-me-now.eu",
          to: user.email,
          subject: "Your Plants need watering!",
          react: emailComponent,
        });

        console.log(`Email sent successfully to ${user.email}:`, data);
      } catch (error) {
        console.error(`Error sending email for user ${userId}:`, error);
      }
    })();

    emailPromises.push(emailPromise);
  }
  await Promise.allSettled(emailPromises);
};
