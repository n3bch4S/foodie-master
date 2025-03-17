import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

function authenticateUser() {
  const user = auth();
  if (!user) throw new Error(`No user found in system`);
  return user;
}

const f = createUploadthing();

export const ourFileRouter = {
  foodImage: f(["image/png", "image/jpeg"])
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  subaccountLogo: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  avatar: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  agencyLogo: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
