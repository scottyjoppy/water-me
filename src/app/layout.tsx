import ClientCheck from "@/components/context/ClientCheck";
import Navbar from "@/components/Navbar";
import { PlantProvider } from "@/components/PlantContext";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="antialiased font-sans">
        <Analytics />
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
