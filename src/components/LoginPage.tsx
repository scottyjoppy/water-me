"use client";

import { supabase } from "@/supabaseClient";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  view: "sign_in" | "sign_up";
}

const CustomAuthForm = ({ view }: Props) => {
  const router = useRouter();
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "";

  const redirectTo =
    view === "sign_up" ? `${origin}/home` : `${origin}/dashboard`;

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update document title
  useEffect(() => {
    document.title =
      view === "sign_in" ? "Login | Water Me Now" : "Register | Water Me Now";
  }, [view]);

  // Handle email/password login or registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (view === "sign_in") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else router.push(redirectTo);
    } else {
      // sign_up
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) setError(error.message);
      else {
        // Typically signUp just sends confirmation email, you may want to redirect or show a message
        alert("Check your email for confirmation link.");
        router.push("/login"); // Redirect to login after signup or change as needed
      }
    }
    setLoading(false);
  };

  // Handle Google OAuth
  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <>
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 rounded-xl p-5 bg-red-400">
        <Head>
          <title>
            {view === "sign_in"
              ? "Login | Water Me Now"
              : "Register | Water Me Now"}
          </title>
        </Head>
        <h1 className="uppercase font-bold text-center text-7xl m-4">
          {view === "sign_in" ? "Log In" : "Register"}
        </h1>
        {error && (
          <p className="mb-4 text-center text-red-700 bg-red-100 border-4 p-2 rounded-xl font-bold">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-3 py-1 border-4 rounded-xl outline-none bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-1 border-4 rounded-xl outline-none bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={
              view === "sign_in" ? "current-password" : "new-password"
            }
          />
          <button
            type="submit"
            disabled={loading}
            className="hover-up border-4 transition-all w-full bg-amber-500 uppercase font-bold py-1 px-3 rounded-xl hover:cursor-pointer disabled:opacity-50"
          >
            {loading
              ? view === "sign_in"
                ? "Logging in..."
                : "Registering..."
              : view === "sign_in"
              ? "Log In"
              : "Register"}
          </button>
        </form>
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-2" />
          <span className="mx-4 uppercase font-bold">or</span>
          <hr className="flex-grow border-2" />
        </div>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex justify-center gap-5 hover-up transition-all w-full px-3 py-1 border-4 rounded-xl outline-none bg-white hover:font-bold hover:cursor-pointer disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.74 1.37 9.16 3.6l6.87-6.87C34.06 2.74 29.38 1 24 1 14.81 1 6.88 6.78 3.36 14.85l7.98 6.2C12.88 14.7 17.97 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.5 24.5c0-1.54-.14-2.87-.44-4.13H24v7.81h12.72c-.53 3.1-2.07 5.73-4.44 7.5l6.8 5.3c3.96-3.66 6.42-9 6.42-16.48z"
            />
            <path
              fill="#FBBC05"
              d="M10.9 28.17a14.69 14.69 0 01-1.08-4.13c0-1.44.53-2.68 1.41-3.61l-7.98-6.2C3.01 18.16 1 20.92 1 24.5c0 3.26 1.36 6.18 3.55 8.3l6.35-4.63z"
            />
            <path
              fill="#EA4335"
              d="M24 46c6.56 0 12.04-2.17 16.06-5.87l-7.9-6.17c-2.14 1.43-4.82 2.3-8.16 2.3-6.02 0-11.11-4.77-12.91-11.16l-7.98 6.2C8.77 41.26 15.9 46 24 46z"
            />
          </svg>
          Continue with Google
        </button>
        <p className="mt-6 flex justify-center items-center gap-2 text-sm">
          {view === "sign_in" ? (
            <>
              Don’t have an account?{" "}
              <Link href="/register">
                <div className="hover-up px-3 py-1 bg-white border-4 rounded-xl hover:font-bold transition-all">Register Here</div>
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login">
                <div className="hover-up px-3 py-1 bg-white border-4 rounded-xl hover:font-bold transition-all">Login Here</div>
              </Link>
            </>
          )}
        </p>
      </section>
    </>
  );
};

export default CustomAuthForm;
