import { AppHeader } from "@/components/app-header";
import ProfileForm from "@/components/profile-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserFollowCounts } from "@/server/follows";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return <>Loading</>;
  }

  const user = session.user;
  const { image, name, username } = user;
  const followCounts = await getUserFollowCounts(user.id);

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-6">
      <AppHeader title="Profile" description="Datos del fan de la Coca-Cola" />

      <main>
        <div className="flex items-start gap-6">
          {image ? (
            <img
              src={image}
              alt={`${name}'s profile picture`}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-600">
              {name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-muted-foreground">@{username || "sin username"}</p>
            
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{followCounts.followers}</p>
                <p className="text-sm text-muted-foreground">seguidores</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{followCounts.following}</p>
                <p className="text-sm text-muted-foreground">siguiendo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/users"
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Buscar y seguir usuarios →
          </Link>
        </div>

        <div className="mt-6">
          <ProfileForm />
        </div>
      </main>
    </div>
  );
}
