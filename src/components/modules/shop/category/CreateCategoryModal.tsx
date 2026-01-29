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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateCategoryValidationSchema } from "@/schemas/CreateCategoryValidation";
import { CreateCategoryApi } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
const CreateCategoryModal = () => {
  const form = useForm({
    resolver: zodResolver(CreateCategoryValidationSchema.omit({ image: true })),
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (images.length === 0) {
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
      const result = CreateCategoryValidationSchema.safeParse(payload);
      if (!result?.success) {
        const imageIssue = result.error.issues.find(
          (i) => i.path[0] === "image",
        );
        setImageError(imageIssue?.message || null);
        return;
      }
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("icon", images[0]);
      const res = await CreateCategoryApi(formData);
      if (res?.success) {
        toast.success(res?.message, {
          position: "top-right",
          style: {
            color: "green",
          },
        });
        //reset the form
        form.reset();
        setImages([]);
        setImagePreview([]);
        //clse the dialog
        setOpen(false);
      } else {
        toast.error(res?.message, {
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
        <Button className="cursor-pointer">Create Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Create Category</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-10 rounded-full focus-visible:ring-[1px]"
                        value={field?.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center gap-4">
                <div className="w-4/5">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field?.value || ""}
                            placeholder="Type your message here."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {imagePreview.length > 0 ? (
                  <>
                    <ImagePreviewer
                      setImageFiles={setImages}
                      imagePreview={imagePreview}
                      setImagePreview={setImagePreview}
                      className="mt-8"
                    />
                    {imageError && (
                      <p className="text-sm text-red-500 mt-1">{imageError}</p>
                    )}
                  </>
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
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
