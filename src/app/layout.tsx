import ClientCheck from "@/components/context/ClientCheck";
import Navbar from "@/components/Navbar";
import { PlantProvider } from "@/components/PlantContext";
import "./globals.css";

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
          <ClientCheck>
            <div className="pt-10">
              <div className="border-10 border-t-0 h-[calc(100dvh-40px)]">
                {children}
              </div>
            </div>
          </ClientCheck>
        </PlantProvider>
      </body>
    </html>
  );
}
