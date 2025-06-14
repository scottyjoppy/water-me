"use client";

import Link from "next/link";

const Home = () => {
  return (
    <>
      <section className="flex flex-col gap-10 justify-center items-center h-screen border-10 bg-amber-300">
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
        <Link
          className="font-bold text-2xl border-4 bg-red-400 rounded-2xl hover-up transition-all px-4 py-1"
          href="/register"
        >
          Sign Up Now!
        </Link>
      </section>
    </>
  );
};

export default Home;
