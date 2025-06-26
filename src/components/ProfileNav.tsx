import Link from "next/link";

interface ProfileNavProps {
  visibility: boolean;
  handleLogout: () => void;
}

const ProfileNav = ({ visibility, handleLogout }: ProfileNavProps) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full border-4 rounded-sm translate-y-17 bg-white flex flex-col p-4 ${
        visibility ? "" : "hidden"
      }`}
    >
      <Link
        href="/profile"
        className="hover:underline hover:text-black/70 hover:scale-105 transition-all origin-left"
      >
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="text-left uppercase hover:cursor-pointer hover:underline hover:text-red-500 hover:scale-105 transition-all origin-left"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileNav;
