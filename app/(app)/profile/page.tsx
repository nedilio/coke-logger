import { AppHeader } from "@/components/app-header";
import ProfileForm from "@/components/profile-form";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return <>Loading</>;
  }

  const user = session.user;
  const { image, name, email } = user;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <AppHeader title="Profile" description="Datos del fan de la Coca-Cola" />

      <main>
        {image ? (
          <img
            src={image}
            alt={`${name}'s profile picture`}
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-xl font-bold text-gray-600">
            {/* Placeholder for profile picture */}
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <ProfileForm />
      </main>
    </div>
  );
}
