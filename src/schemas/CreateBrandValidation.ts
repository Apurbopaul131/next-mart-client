import z from "zod";
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const CreateBrandValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
});
