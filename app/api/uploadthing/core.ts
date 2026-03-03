import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    const url = file.url;
    const optimizedUrl = url.replace("/f/", "/a/");
    return { url: optimizedUrl };
  }),

  logImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    const url = file.url;
    const optimizedUrl = url.replace("/f/", "/a/");
    return { url: optimizedUrl };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
