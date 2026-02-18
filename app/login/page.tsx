import { LoginForm } from "@/components/login-form";
import { redirectIfAuthenticated } from "@/lib/auth-helpers";
import { AuthLayoutWrapper } from "@/components/auth-layout-wrapper";

export default async function LoginPage() {
  // Redirect to dashboard if already authenticated
  await redirectIfAuthenticated();
  return (
    <AuthLayoutWrapper>
      <LoginForm />
    </AuthLayoutWrapper>
  );
}
