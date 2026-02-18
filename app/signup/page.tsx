import { SignUpForm } from "@/components/signup-form";
import { redirectIfAuthenticated } from "@/lib/auth-helpers";

export default async function SignUpPage() {
  // Redirect to dashboard if already authenticated
  await redirectIfAuthenticated();
  return (
    <div className="max-w-2xl mx-auto min-h-screen flex items-center justify-center">
      <SignUpForm />
    </div>
  );
}
