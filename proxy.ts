import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const authPathnames = ["/signup", "/login"];

export async function proxy(request: NextRequest) {
  console.log("middleware");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //pathname
  const { pathname } = new URL(request.url);
  console.log({ pathname, session });

  if (authPathnames.includes(pathname) && session) {
    console.log({ pathname, session });
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/signup"], // Specify the routes the middleware applies to
};
