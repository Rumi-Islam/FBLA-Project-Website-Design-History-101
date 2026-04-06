import { createUploadthing } from "uploadthing/next";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma"; // Adjust path if needed

const f = createUploadthing();

export const ourFileRouter = {
  dashboardUploader: f({ 
    pdf: { maxFileSize: "4MB" }, 
    video: { maxFileSize: "16MB" } 
  })
    .middleware(async () => {
      const cookieStore = await cookies();
      const userIdString = cookieStore.get("userId")?.value;
      
      if (!userIdString) throw new Error("Unauthorized");
      return { userId: parseInt(userIdString) };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // THIS IS THE CRITICAL PART: Save to your DB
      try {
        await prisma.upload.create({
          data: {
            fileName: file.name,
            fileUrl: file.url,
            fileType: file.name.split('.').pop() || "unknown",
            userId: metadata.userId
          }
        });
        console.log("Database record created for:", file.name);
      } catch (error) {
        console.error("Failed to save upload to DB:", error);
      }

      return { uploadedBy: metadata.userId };
    }),
};