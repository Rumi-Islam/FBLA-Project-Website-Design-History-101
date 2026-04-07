import { createUploadthing } from "uploadthing/next";
import { cookies } from "next/headers";
import prisma from "../../../../lib/prisma"; 

const f = createUploadthing();

export const ourFileRouter = {
  dashboardUploader: f({ 
    pdf: { maxFileSize: "4MB" }, 
    video: { maxFileSize: "16MB" } 
  })
    .middleware(async () => {
      // 1. Await cookies to get the store
      const cookieStore = await cookies();
      const userIdString = cookieStore.get("userId")?.value;
      
      // 2. Check if user is logged in
      if (!userIdString) throw new Error("Unauthorized");
      
      // 3. Pass the ID to onUploadComplete
      return { userId: parseInt(userIdString) };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        // 4. Save to Database
        const newUpload = await prisma.upload.create({
          data: {
            fileName: file.name,
            fileUrl: file.url,
            fileType: file.name.split('.').pop() || "unknown",
            userId: metadata.userId
          }
        });
        console.log("Database record created:", newUpload.id);
      } catch (error) {
        console.error("Prisma Error:", error);
      }

      return { uploadedBy: metadata.userId };
    }),
};