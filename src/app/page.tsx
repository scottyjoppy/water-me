"use client";

import { useAuthSession } from "@/hooks/useAuthSession";
import { sendEmail } from "@/utils/sendEmail";
import Link from "next/link";

const Home = () => {
  const { session } = useAuthSession();

  return (
    <>
      <section className="amber-bg">
        <section className="flex flex-col gap-10 w-[clamp(300px,100%,1000px)] items-center">
          <h1 className="text-7xl text-max font-bold text-center whitespace-nowrap underline">
            Water Me!
          </h1>
          <p className="font-bold text-2xl">The wilting solution you need!</p>
          <div className="grid grid-cols-3 w-2/3 h-[13rem] gap-3">
            <div className="col-span-1 bg-white border-4 rounded-xl relative">
              <p className="font-bold text-center p-2">Login</p>
              <hr className="border-2" />
            </div>
            <div className="col-span-1 bg-white border-4 rounded-xl">
              <p className="font-bold text-center p-2">Add A Plant</p>
              <hr className="border-2" />
            </div>
            <div className="col-span-1 bg-white border-4 rounded-xl">
              <p className="font-bold text-center p-2">Get Reminded!</p>
              <hr className="border-2" />
            </div>
          </div>
          {!session && (
            <Link
              className="font-bold text-2xl border-4 bg-red-400 rounded-2xl hover-up transition-all px-4 py-1"
              href="/register"
            >
              Sign Up Now!
            </Link>
          )}
          <form action={() => sendEmail()}>
            <button
              className="my-button h-10 flex bg-red-400 hover-up"
              type="submit"
            >
              SUBMIT
            </button>
          </form>
        </section>
      </section>
    </>
  );
};

export default Home;
