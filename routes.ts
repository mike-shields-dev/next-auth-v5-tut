/**
 * An array of publicly accessible (unprotected routes).
 * These routes do not require authentication.
 * @type {string[]}
 */
const publicRoutes = ["/"];

/**
 * An array of authentication routes.
 * These routes will redirect logged in users to "/settings"
 * @type {string[]}
 */
const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for API auth routes.
 * @type {string}
 */
const apiAuthPrefix = "/auth";

/**
 * The default redirect path after logging in.
 * @type {string}
 */
const DEFAULT_LOGIN_REDIRECT ='/settings'

export { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes };
