/*eslint-disable*/

import { Session } from "@supabase/supabase-js";
import Link from "next/link";

const DesktopNavbar = ({
  session,
  handleLogout,
  setFormVisible,
}: {
  session: Session | null;
  handleLogout: () => void;
  setFormVisible: (val: boolean) => void;
}) => {
  return (
    <nav className="hidden md:grid items-center z-40 fixed w-full bg-white border-10 p-3 grid-cols-4 uppercase font-bold text-[clamp(1rem,3vw,1.5rem)] whitespace-nowrap">
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
            <svg
              height="36"
              viewBox="0 0 36 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hover:scale-110 transition-all hover:cursor-pointer"
            >
              <path
                d="M29 26H9V32C9 35.3137 11.6863 38 15 38H23C26.3137 38 29 35.3137 29 32V26Z"
                stroke="black"
                strokeWidth="4"
                strokeMiterlimit="3.99393"
                strokeLinejoin="round"
              />
              <path d="M19 19V26" stroke="black" stroke-width="4" />
              <path
                d="M2 4V2H7C13.6274 2 19 7.37258 19 14V16H14C7.37259 16 2 10.6274 2 4Z"
                stroke="black"
                strokeWidth="4"
              />
              <path
                d="M34 7V6H31C24.3726 6 19 11.3726 19 18V19L22 19C28.6274 19 34 13.6274 34 7Z"
                stroke="black"
                strokeWidth="4"
              />
            </svg>
          </div>
          {/* <div className="col-span-1 flex justify-end">
            <button
              onClick={handleLogout}
              className="uppercase hover:underline hover:text-black/70 hover:scale-105 transition-all hover:cursor-pointer"
            >
              Logout
            </button>
          </div> */}
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
  );
};

export default DesktopNavbar;
