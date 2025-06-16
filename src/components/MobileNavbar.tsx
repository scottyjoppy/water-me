import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";

const MobileNavbar = ({
  session,
  handleLogout,
  setFormVisible,
}: {
  session: Session | null;
  handleLogout: () => void;
  setFormVisible: (val: boolean) => void;
}) => {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);

  return (
    <nav className="md:hidden z-40 fixed w-full bg-white border-10 p-3 grid grid-cols-4 uppercase font-bold text-[clamp(1rem,3vw,1.5rem)] whitespace-nowrap">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 50 50"
        className="justify-self-end w-5 h-5 col-span-full"
        onClick={() => setMenuVisibility(!menuVisibility)}
      >
        <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"></path>
      </svg>
      <div className={menuVisibility ? "" : "hidden"}>
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
                My Plants
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
      </div>
    </nav>
  );
};

export default MobileNavbar;
