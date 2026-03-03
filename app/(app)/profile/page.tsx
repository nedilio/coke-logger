import { Suspense } from "react";
import { AppHeader } from "@/components/app-header";
import ProfileForm from "@/components/profile-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserFollowCounts } from "@/server/follows";
import { db } from "@/db/drizzle";
import { user } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileLoading } from "./profile-loading";
import Link from "next/link";

function optimizeImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url.replace("/f/", "/a/");
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return <ProfileLoading />;
  }

  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  const { name, username, image: authImage } = session.user;
  const profileImageUrl = userData?.profileImageUrl;
  const displayImage = optimizeImageUrl(profileImageUrl || authImage || null);
  const followCounts = await getUserFollowCounts(session.user.id);

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-6">
      <AppHeader title="Profile" description="Datos del fan de la Coca-Cola" />

      <main>
        <div className="flex items-start gap-6">
          <Avatar className="w-24 h-24 border-2 border-border">
            <AvatarImage src={displayImage || undefined} alt={`${name}'s profile picture`} />
            <AvatarFallback className="text-xl">
              {name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
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
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ProfileForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
