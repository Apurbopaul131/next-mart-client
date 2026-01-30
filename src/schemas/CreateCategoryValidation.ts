import z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const CreateCategoryValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(5, "Description must be at least 5 characters"),
  image: z
    .instanceof(File, { message: "Image is required." })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Image must be less than 2MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, PNG, or WEBP images are allowed",
    }),
});
