"use client";

import { useState, useEffect, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  getAllUsersWithFollowStatus,
  toggleFollow,
  type UserWithFollowStatus,
} from "@/server/follows";
import { Search, UserMinus, UserPlus } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<UserWithFollowStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getAllUsersWithFollowStatus();
      setUsers(data);
    });
  }, []);

  const filteredUsers = searchQuery
    ? users.filter(
        (u) =>
          u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  const handleToggleFollow = (userId: string) => {
    startTransition(async () => {
      const result = await toggleFollow(userId);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isFollowing: result.isFollowing } : u
        )
      );
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Usuarios</h1>
        <p className="text-muted-foreground">
          Busca y sigue a otros fans de la Coca-Cola
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por username o nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {isPending && users.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Cargando usuarios...
          </p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No se encontraron usuarios
          </p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || user.username || "User"}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-medium">
                      {(user.name || user.username || "?").charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {user.name || user.username || "Usuario sin nombre"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{user.username || "sin username"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {user.followersCount} seguidores
                </span>
                <Button
                  variant={user.isFollowing ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleToggleFollow(user.id)}
                  disabled={isPending}
                >
                  {user.isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4 mr-1" />
                      Siguiendo
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-1" />
                      Seguir
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
