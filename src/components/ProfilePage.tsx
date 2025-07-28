"use client";

import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<boolean | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [formEmail, setFormEmail] = useState("");
  const [formUsername, setFormUsername] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/user", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setEmail(data.email);
        setUsername(data.username);

        // Initialize form fields for editing
        setFormEmail(data.email);
        setFormUsername(data.username);
      } else {
        // handle error or unauthenticated
        setEmail(null);
        setUsername(null);
      }
    }
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile", { method: "GET" });
        if (!res.ok) {
          setNotifications(null);
          return;
        }
        const data = await res.json();
        const notifications = data?.settings?.notifications ?? false;
        setNotifications(notifications);
      } catch (error) {
        console.error("Failed to fetch profile: ", error);
        setNotifications(false);
      }
    }

    fetchUser();
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update email + username
    const userRes = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formEmail,
        username: formUsername,
      }),
    });

    if (!userRes.ok) {
      const errorData = await userRes.json();
      alert(errorData.error);
      return;
    }

    // Update notifications separately
    const profileRes = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notifications }),
    });

    if (!profileRes.ok) {
      const errorData = await profileRes.json();
      alert(errorData.error);
      return;
    }

    // On success, update local state and exit editing mode
    setEmail(formEmail);
    setUsername(formUsername);
    setIsEditing(false);
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

            {/* <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
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
            </div> */}

            <div className="bg-cyan-300 px-3 py-1 rounded-2xl w-full">
              Notifications:{" "}
              <button
                type="button"
                onClick={() => setNotifications((prev) => !prev)}
                className={`uppercase font-bold border-4 px-2 bg-white rounded-xl transition-all ${
                  notifications ? "hover:bg-green-400" : "hover:bg-red-400"
                }`}
              >
                {String(notifications)}
              </button>
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
              Notifications:{" "}
              <span className="uppercase font-bold">
                {String(notifications)}
              </span>
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
