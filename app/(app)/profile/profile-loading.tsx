import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileLoading() {
  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <main>
        <div className="flex items-start gap-6">
          <Avatar className="w-24 h-24 border-2 border-border">
            <AvatarFallback>
              <Skeleton className="w-full h-full rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-6 mt-4">
              <div className="space-y-1">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>
        </div>

        <Skeleton className="h-4 w-48 mt-6" />

        <div className="mt-6 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </main>
    </div>
  );
}
