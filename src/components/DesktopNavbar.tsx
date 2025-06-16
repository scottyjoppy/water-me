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
    <nav className="hidden md:grid z-40 fixed w-full bg-white border-10 p-3 grid-cols-4 uppercase font-bold text-[clamp(1rem,3vw,1.5rem)] whitespace-nowrap">
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
  );
};

export default DesktopNavbar;
