import CustomAuthForm from "@/components/CustomAuthForm";

export default function AuthPage({ params }: { params: { auth: string } }) {
  return <CustomAuthForm viewParam={params.auth} />;
}
