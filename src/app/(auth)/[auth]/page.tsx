import CustomAuthForm from "@/components/CustomAuthForm";

export default async function AuthPage({ params }: { params: Promise<{ auth: string }> }) {
  const resolvedParams = await params;
  return <CustomAuthForm viewParam={resolvedParams.auth} />;
}
