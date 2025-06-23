"use client";

import { getUser } from "@/utils/getUser";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [username, setUsername] = useState<any>(null);
  const [notifications, setNotifications] = useState<Object | null>([null]);

  useEffect(() => {
    getUser().then((user) => {
      setEmail(user?.email ?? null);
      setPhone(user?.phone ?? null);
      setUsername(user?.user_metadata.full_name ?? null);
    });
  });

  return (
    <section className="text-2xl flex flex-col">
      <div className="border-1 h-10">{email ?? "Loading..."}</div>
      <div className="border-1 h-10">{phone ?? "Loading..."}</div>
      <div className="border-1 h-10">{username ?? "Loading..."}</div>
      {/* <div>{notifications ?? "Loading..."}</div> */}
    </section>
  );
};

export default ProfilePage;
