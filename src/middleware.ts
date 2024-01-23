import NextAuth from 'next-auth';

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '../routes';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isProtectedRoute = !publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAPIAuthRoute) {
    // allow access to route
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // redirect to default to the desired default route upon signing in
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }

  if (!isLoggedIn && isProtectedRoute) {
    // redirect to login page if user is not logged in while attempting
    // to visit a protected route
    return Response.redirect(new URL("auth/login", nextUrl));
  }

  return null; // allow access in all other cases.
});

/**
 * Configure paths that will call "auth" middleware function:
 * - Those that **DO NOT** end with a file extension or start with "_next".
 * - The root path ("/").
 * - Those that start with "api" or "trpc" (and capture the remaining length).
 */
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
