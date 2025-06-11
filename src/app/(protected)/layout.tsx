import { PlantProvider } from "@/components/PlantContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <UserProvider>
    <PlantProvider>{children}</PlantProvider>
    // {/* </UserProvider> */}
  );
}
