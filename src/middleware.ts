import NextAuth from "next-auth";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  console.log(req.nextUrl.pathname);
  console.log({ isLoggedIn });
});

export const config = {
  // Configure paths that will call "auth" middleware function:
  // - Those that **DO NOT** end with a file extension or start with "_next".
  // - The root path ("/").
  // - Those that start with "api" or "trpc" (and capture the remaining length).

  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
