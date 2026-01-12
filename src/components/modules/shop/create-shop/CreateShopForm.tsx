"use client";
import Logo from "@/assets/svgs/Logo";
import NMImageUploader from "@/components/core/NMImageUploader";
import ImagePreviewer from "@/components/core/NMImageUploader/ImagePreviewer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createShop } from "@/services/shop";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
const CreateShopForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;
  const handleCreateShop: SubmitHandler<FieldValues> = async (data) => {
    const serviceOffered = data?.servicesOffered
      ?.split(",")
      .map((service: string) => service.trim())
      .filter((service: string) => service !== "");
    const modifiedData = {
      ...data,
      establishedYear: Number(data?.establishedYear),
      servicesOffered: serviceOffered,
    };
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));
      formData.append("logo", images[0] as File);
      const data = await createShop(formData);
      if (data?.success) {
        toast.success(data?.message, {
          position: "top-right",
          style: {
            color: "green",
          },
        });
      } else {
        toast.error(data?.message, {
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
    <div className="border-2 bg-[#f6f6f6] p-9 rounded-2x max-w-2xl mx-auto rounded-md my-5">
      <div className="flex items-center space-x-4">
        <Logo width={80} height={30}></Logo>

        <div>
          <h1 className="text-4xl font-bold">Create Shop</h1>
          <p className="font-extralight">
            join us today and start your journy!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateShop)} className="mt-5">
          <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bussiness Lisense Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      type="text"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Year</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxIdentificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TIN Number</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 rounded-full focus-visible:ring-[1px]"
                      {...field}
                      value={field?.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
            <div className="col-span-4 md:col-span-3">
              <FormField
                control={form.control}
                name="servicesOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offered Service</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field?.value || ""}
                        placeholder="Type your message here."
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImages}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="mt-8"
              />
            ) : (
              <div className="mt-8">
                <NMImageUploader
                  setImageFiles={setImages}
                  setImagePreview={setImagePreview}
                  label="Upload Logo"
                />
              </div>
            )}
          </div>
          <Button className="mt-5 w-full" type="submit">
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateShopForm;
