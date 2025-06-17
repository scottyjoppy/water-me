import CustomAuthForm from "@/components/CustomAuthForm";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ auth: string }>;
}) {
  const resolvedParams = await params;
  return (
    <div className="amber-bg">
      <CustomAuthForm viewParam={resolvedParams.auth} />
    </div>
  );
}
