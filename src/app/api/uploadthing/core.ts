// import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// function getUser() {
//   const user = auth();
//   if (!user) throw new Error("Unauthorize");
//   return user;
// }

export const ourFileRouter = {
  foodImage: f(["image/png", "image/jpeg"]).onUploadComplete(() => {}),
  subaccountLogo: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  avatar: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  agencyLogo: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }).onUploadComplete(
    () => {}
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
