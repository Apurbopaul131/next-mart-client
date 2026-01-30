"use client";
import NMImageUploader from "@/components/core/NMImageUploader";
import ImagePreviewer from "@/components/core/NMImageUploader/ImagePreviewer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CreateBrandValidationSchema } from "@/schemas/CreateBrandValidation";
import { createBrandApi } from "@/services/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";

const CreateBrandModal = () => {
  const [error, setImageError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const form = useForm({
    resolver: zodResolver(CreateBrandValidationSchema.omit({ image: true })),
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (images.length === 0) {
        console.log("hello");
        toast.error("Image is required", {
          position: "top-right",
          style: {
            color: "red",
          },
        });
        return;
      }
      const payload = {
        ...data,
        image: images[0],
      };
      const validationResult = CreateBrandValidationSchema.safeParse(payload);
      if (!validationResult?.success) {
        const imageIssue = validationResult.error.issues.find(
          (i) => i.path[0] === "image",
        );
        setImageError(imageIssue?.message || null);
        return;
      }
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("logo", images[0]);
      const result = await createBrandApi(formData);
      if (result?.success) {
        toast.success(result?.message, {
          position: "top-right",
          style: {
            color: "green",
          },
        });
        //reset the form
        form.reset();
        setImages([]);
        setImagePreview([]);
        //Close the dialog
        setOpen(false);
      } else {
        toast.error(result?.message, {
          position: "top-right",
          style: {
            color: "red",
          },
        });
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Brand</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Brand</DialogTitle>
        </DialogHeader>
        <form id="create-brand-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImages}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="mt-8"
              />
            ) : (
              <div className="mt-6">
                <NMImageUploader
                  setImageFiles={setImages}
                  setImagePreview={setImagePreview}
                  label="Upload Logo"
                />
              </div>
            )}
          </div>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter brand name.."
                    value={field?.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button
            type="submit"
            form="create-brand-form"
            className="w-full mt-5"
          >
            {form.formState.isLoading ? "Creating.." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateBrandModal;
