import Navbar from "@/components/Navbar";
import { PlantProvider } from "@/components/PlantContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <PlantProvider><Navbar />{children}</PlantProvider>
  );
}
