"use client";

import EmailSVG from "@/components/svg/EmailSVG";
import LoginSVG from "@/components/svg/LoginSVG";
import PlantSVG from "@/components/svg/PlatSVG";
import { useAuthSession } from "@/hooks/useAuthSession";
import Link from "next/link";

const Home = () => {
  const { session } = useAuthSession();

  return (
    <>
      <section className="amber-bg overflow-x-auto">
        <section className="flex flex-col gap-6 md:gap-10 w-full max-w-4xl mx-auto px-4 items-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-max font-bold text-center underline">
            Water Me!
          </h1>
          <p className="font-bold text-lg md:text-2xl text-center">
            The wilting solution you need!
          </p>
          <div className="flex flex-col md:grid grid-cols-3 w-full mx-auto md:w-[clamp(600px,100%,700px)] md:h-[13rem] gap-3">
            <div className="flex-1 md:col-span-1 bg-white border-4 rounded-xl rounded-l-xl relative h-[13rem] flex flex-col">
              <p className="font-bold text-center p-2">1. Login</p>
              <hr className="border-2 hidden md:block" />
              <div className="flex-1 md:flex items-center justify-center hidden">
                <LoginSVG />
              </div>
            </div>
            <div className="flex-1 md:col-span-1 bg-white border-4 rounded-xl flex flex-col">
              <p className="font-bold text-center p-2 whitespace-nowrap">
                2. Add A Plant
              </p>
              <hr className="border-2 hidden md:block" />
              <div className="flex-1 md:flex items-center justify-center hidden">
                <PlantSVG />
              </div>
            </div>
            <div className="flex-1 md:col-span-1 bg-white border-4 rounded-xl flex flex-col">
              <p className="font-bold text-center p-2 whitespace-nowrap">
                3. Get Reminded!
              </p>
              <hr className="border-2 hidden md:block" />
              <div className="flex-1 md:flex items-center justify-center p-4 hidden">
                <EmailSVG />
              </div>
            </div>
          </div>
          {!session && (
            <Link
              className="font-bold text-xl md:text-2xl border-4 bg-red-400 rounded-2xl hover-up transition-all px-4 py-1"
              href="/register"
            >
              Sign Up Now!
            </Link>
          )}
        </section>
      </section>
    </>
  );
};

export default Home;
