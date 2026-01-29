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
import { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const CreateBrandModal = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const form = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Dialog>
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
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateBrandModal;
