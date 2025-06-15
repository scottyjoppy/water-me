import Navbar from "@/components/Navbar";
import { PlantProvider } from "@/components/PlantContext";
import "./globals.css";
import ClientCheck from "@/components/context/ClientCheck";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <PlantProvider>
          <Navbar />
          <ClientCheck>{children}</ClientCheck>
        </PlantProvider>
      </body>
    </html>
  );
}
