export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen border-10 bg-amber-300">{children}</div>
  );
}
