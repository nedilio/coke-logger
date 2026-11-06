import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateCokeLogSchema } from "@/lib/validations/coke-log";
import { deleteCokeLog, updateCokeLog } from "@/server/services/coke-log-service";

type Context = { params: Promise<{ id: string }> };

async function getUserId(request: Request): Promise<string | null> {
  const session = await auth.api.getSession({ headers: request.headers });
  return session?.user.id ?? null;
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Invalid request";
  const status = message === "Log not found" ? 404 : 400;
  return NextResponse.json({ error: message }, { status });
}

export async function PATCH(request: Request, { params }: Context) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();
    const input = updateCokeLogSchema.parse({
      ...body,
      ...(body.consumedAt ? { consumedAt: new Date(body.consumedAt) } : {}),
    });
    const log = await updateCokeLog(userId, id, input);
    return NextResponse.json(log);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request, { params }: Context) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    return NextResponse.json(await deleteCokeLog(userId, id));
  } catch (error) {
    return errorResponse(error);
  }
}
