/**
 * Publicly accessible (unprotected) routes.
 * These routes do not require authentication.
 * @type {string[]}
 */
const publicRoutes = ["/", "/auth/new-verification"];

/**
 * Authentication routes.
 * These routes will redirect logged in users to DEFAULT_LOGIN_REDIRECT
 * @type {string[]}
 */
const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for API auth routes.
 * @type {string}
 */
const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @type {string}
 */
const DEFAULT_LOGIN_REDIRECT = "/settings";

export { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes };

