import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCokeLogSchema } from "@/lib/validations/coke-log";
import { createCokeLog, getCokeLogsByUser } from "@/server/services/coke-log-service";

async function getUserId(request: Request): Promise<string | null> {
  const session = await auth.api.getSession({ headers: request.headers });
  return session?.user.id ?? null;
}

export async function GET(request: Request) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const logs = await getCokeLogsByUser(userId);
  return NextResponse.json(logs);
}

export async function POST(request: Request) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const input = createCokeLogSchema.parse({
      ...body,
      consumedAt: body.consumedAt ? new Date(body.consumedAt) : new Date(),
    });
    const log = await createCokeLog(userId, input);
    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
