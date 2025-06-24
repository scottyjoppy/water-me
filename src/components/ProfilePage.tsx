"use client";

import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formUsername, setFormUsername] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setEmail(data.email);
        setPhone(data.phone || null);
        setUsername(data.username);

        // Initialize form fields for editing
        setFormEmail(data.email);
        setFormPhone(data.phone || "");
        setFormUsername(data.username);
      } else {
        // handle error or unauthenticated
        setEmail(null);
        setPhone(null);
        setUsername(null);
      }
    }

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formEmail,
        phone: formPhone,
        username: formUsername,
      }),
    });

    if (res.ok) {
      setEmail(formEmail);
      setPhone(formPhone);
      setUsername(formUsername);
      setIsEditing(false);
    } else {
      const errorData = await res.json();
      alert(errorData.error);
    }
  };

  return (
    <section className="text-2xl grid w-full h-full place-items-center">
      <div className="w-[clamp(300px,90%,800px)] h-[clamp(300px,90%,1200px)] border-10 rounded-xl bg-cyan-400 flex flex-col items-center">
        <div className="w-full border-b-10 grid place-items-center p-5">
          <h2 className="font-bold text-[clamp(2rem,5vw,3.5rem)]">
            {username ? `${username}'s Profile` : "Profile Page"}
          </h2>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="w-6/7 py-5 flex flex-col gap-4"
          >
            <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
              <label
                className="font-bold uppercase flex gap-4 items-center"
                htmlFor="username"
              >
                Username:
                <input
                  id="username"
                  type="text"
                  className="bg-white border-4 font-normal rounded-xl px-2"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                />
              </label>
            </div>

            <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
              <label
                className="font-bold uppercase flex gap-4 items-center"
                htmlFor="email"
              >
                Email:
                <input
                  id="email"
                  type="email"
                  className="bg-white border-4 font-normal rounded-xl px-2"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
              <label
                className="font-bold uppercase flex gap-4 items-center"
                htmlFor="phone"
              >
                Phone:
                <input
                  id="phone"
                  type="tel"
                  className="bg-white border-4 font-normal rounded-xl px-2"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                />
              </label>
            </div>

            <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
              Notifications: (placeholder)
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="my-button hover-up w-[clamp(100px,100%,200px)] bg-green-400"
              >
                Save
              </button>
              <button
                type="button"
                className="my-button hover-up w-[clamp(100px,100%,200px)] bg-red-400"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="w-6/7 py-5 flex flex-col gap-4">
            <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
              <span className="font-bold uppercase">Username:</span>{" "}
              {username ?? "Loading..."}
            </div>
            <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
              <span className="font-bold uppercase">Email:</span>{" "}
              {email ?? "Loading..."}
            </div>
            <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
              <span className="font-bold uppercase">Phone #:</span>{" "}
              {phone ?? "Loading..."}
            </div>
            <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
              Notifications: (placeholder)
            </div>

            <button
              className="my-button hover-up w-[clamp(100px,100%,200px)] bg-amber-200"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
