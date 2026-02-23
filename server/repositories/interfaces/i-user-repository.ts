export interface IUserRepository {
  findById(id: string): Promise<{
    id: string;
    name: string;
    email: string;
    image: string | null;
    username: string | null;
    displayUsername: string | null;
  } | null>;
  findByUsername(username: string): Promise<{
    id: string;
    name: string;
    email: string;
    image: string | null;
    username: string | null;
    displayUsername: string | null;
  } | null>;
  search(
    query: string,
    limit?: number
  ): Promise<
    {
      id: string;
      name: string;
      email: string;
      image: string | null;
      username: string | null;
      displayUsername: string | null;
    }[]
  >;
}
