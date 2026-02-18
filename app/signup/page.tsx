import { SignUpForm } from "@/components/signup-form";
import { redirectIfAuthenticated } from "@/lib/auth-helpers";
import { AuthLayoutWrapper } from "@/components/auth-layout-wrapper";

export default async function SignUpPage() {
  // Redirect to dashboard if already authenticated
  await redirectIfAuthenticated();
  return (
    <AuthLayoutWrapper>
      <SignUpForm />
    </AuthLayoutWrapper>
  );
}
