"use client";

import DesktopNavbar from "@/components/DesktopNavbar";
import MobileNavbar from "@/components/MobileNavbar";
import { useAuthSession } from "@/hooks/useAuthSession";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePlantContext } from "./PlantContext";
import PlantForm from "./PlantForm";

const Navbar = () => {
  const router = useRouter();
  const { session, logout } = useAuthSession();
  const plantContext = usePlantContext();

  const formVisible = session ? plantContext.formVisible : false;
  const setFormVisible = session ? plantContext.setFormVisible : () => {};

  const handleLogout = async () => {
    const error = await logout();
    if (!error) {
      router.push("/");
    }
  };

  const props = {
    session,
    handleLogout,
    setFormVisible,
  };

  return (
    <>
      <DesktopNavbar {...props} />
      <MobileNavbar {...props} />
      <AnimatePresence>{formVisible && <PlantForm />}</AnimatePresence>
    </>
  );
};

export default Navbar;
