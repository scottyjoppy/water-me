"use client";

import { useAuthSession } from "@/hooks/useAuthSession";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlantContext } from "./PlantContext";
import PlantForm from "./PlantForm";

const Navbar = () => {
  const router = useRouter();
  const { session, logout } = useAuthSession();

  // Optional chaining with defaults
  const plantContext = usePlantContext();

  const formVisible = session ? plantContext.formVisible : false;
  const setFormVisible = session ? plantContext.setFormVisible : () => {};

  const handleLogout = async () => {
    const error = await logout();
    if (!error) {
      router.push("/");
    }
  };

  return (
    <>
      <nav className="z-100 fixed w-full bg-white border-10 p-3 grid grid-cols-4 uppercase font-bold text-[clamp(1rem,3vw,1.5rem)] whitespace-nowrap">
        <div className="col-span-1 flex transition-none">
          <Link
            href="/"
            className="hover:underline hover:text-black/70 hover:scale-105 transition-all"
          >
            Home
          </Link>
        </div>
        {session ? (
          <>
            <div className="col-span-1 flex justify-center">
              <Link
                href="/myplants"
                className="hover:underline hover:text-black/70 hover:scale-105 transition-all"
              >
                Your Plants
              </Link>
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => setFormVisible(true)}
                className="uppercase hover:underline hover:text-black/70 hover:scale-105 transition-all hover:cursor-pointer"
              >
                Add Plant
              </button>
            </div>
            <div className="col-span-1 flex justify-end">
              <button
                onClick={handleLogout}
                className="uppercase hover:underline hover:text-black/70 hover:scale-105 transition-all hover:cursor-pointer"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="col-span-3 justify-self-end flex justify-center">
            <Link
              href="/login"
              className="hover:underline hover:text-black/70 hover:scale-105 transition-all"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
      <AnimatePresence>{formVisible && <PlantForm />}</AnimatePresence>
    </>
  );
};

export default Navbar;
