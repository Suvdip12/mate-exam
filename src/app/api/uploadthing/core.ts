import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
const f = createUploadthing();
export const fileRouter = {
  examPaper: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const { session } = await validateRequest();
      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError("Unauthorized");
      if (
        session.user.role !== "admin" &&
        session.user.role !== "super-admin"
      ) {
        throw new UploadThingError("Only admin can upload exam papers");
      }
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { user: session.user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // delete file
      // const oldAvatarUrl = metadata.user.avatarUrl;
      // if (oldAvatarUrl) {
      //   const key = oldAvatarUrl.split(`/f/`)[1];
      //   await new UTApi().deleteFiles(key);
      // }
      // create file

      const newexamPaperUrl = file.url.replace(
        "/f/",
        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
      );
      const media = await prisma.media.create({
        data: {
          url: newexamPaperUrl,
          type: "PYQ",
          fileType: file.type.startsWith("pdf") ? "PDF" : "IMAGE",
        },
      });

      return {
        mediaId: media.id,
        url: media.url,
        type: media.type,
      };
    }),
  attachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
    video: { maxFileSize: "64MB", maxFileCount: 4 },
  })
    .middleware(async () => {
      const { session } = await validateRequest();
      if (!session) throw new UploadThingError("Unauthorized");
      if (
        session.user.role !== "admin" &&
        session.user.role !== "super-admin"
      ) {
        throw new UploadThingError("Only admin can upload exam papers");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      const media = await prisma.media.create({
        data: {
          url: file.url,
          type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
        },
      });
      return { mediaId: media.id };
    }),
} satisfies FileRouter;
export type AppFileRouter = typeof fileRouter;
