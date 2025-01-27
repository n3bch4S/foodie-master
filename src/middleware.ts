import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/site", "/api/uploadthing"],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
