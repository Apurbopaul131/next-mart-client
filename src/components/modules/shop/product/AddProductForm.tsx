"use client";
import Logo from "@/assets/svgs/Logo";
import NMImageUploader from "@/components/core/NMImageUploader";
import ImagePreviewer from "@/components/core/NMImageUploader/ImagePreviewer";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllBrands } from "@/services/brand";
import { getAllCategories } from "@/services/category";
import { createProduct } from "@/services/shop/product";
import { IBrand, ICategory } from "@/types";
import { SelectSeparator } from "@radix-ui/react-select";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";

const AddProductForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [brands, setBrands] = useState<IBrand[] | []>([]);
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      stock: "",
      weight: "",
      availableColors: [{ value: "" }],
      keyFeatures: [{ value: "" }],
      specification: [{ property: "", value: "" }],
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  //Array fileds declaration
  const { append: availableColorsAppend, fields: availableColorsFields } =
    useFieldArray({
      control: form.control,
      name: "availableColors",
    });
  const { append: keyFeaturesAppend, fields: keyFeaturesFields } =
    useFieldArray({
      control: form.control,
      name: "keyFeatures",
    });
  const { append: specificationAppend, fields: specificationFields } =
    useFieldArray({
      control: form.control,
      name: "specification",
    });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const fomattedAvailableColors = data?.availableColors.map(
      (color: { value: string }) => color.value,
    );
    const formattedKeyFeatures = data?.keyFeatures.map(
      (featue: { value: string }) => featue.value,
    );
    const formattedSpecification = Object.fromEntries(
      data?.specification?.map((s: { property: string; value: string }) => [
        s.property,
        s.value,
      ]),
    );
    const formattedData = {
      ...data,
      price: parseInt(data?.price),
      stock: parseInt(data?.stock),
      weight: parseFloat(data?.weight),
      availableColors: fomattedAvailableColors,
      keyFeatures: formattedKeyFeatures,
      specification: formattedSpecification,
    };
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(formattedData));
      imageFiles.forEach((image) => {
        formData.append("images", image);
      });
      const res = await createProduct(formData);
      if (res?.success) {
        toast.success(res?.message, {
          position: "top-right",
          style: {
            color: "green",
          },
        });
        //clear the form
        form.reset();
        setImageFiles([]);
        setImagePreview([]);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, brandsData] = await Promise.all([
        getAllCategories(),
        getAllBrands(),
      ]);

      setCategories(categoriesData?.data);
      setBrands(brandsData?.data);
    };

    fetchData();
  }, []);

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        <Logo width={80} height={30} />

        <h1 className="text-xl font-bold">Add Product</h1>
      </div>

      <form id="from-create-product" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border-t border-b py-3 my-5">
          <p className="text-primary font-bold text-xl">Basic Information</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Product Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  value={field.value || ""}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value || ""}
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>category</FieldLabel>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectSeparator />
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            name="brand"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>brand</FieldLabel>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectSeparator />
                    {brands.map((brand) => (
                      <SelectItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            name="stock"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>stock</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value || ""}
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="weight"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Weight</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value || ""}
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="my-5">
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value || ""}
                  className="h-36 resize-none"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div>
          <div className="border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Images</p>
          </div>
          <div className="flex gap-4 ">
            <NMImageUploader
              setImageFiles={setImageFiles}
              setImagePreview={setImagePreview}
              label="Upload Image"
              className="w-fit mt-0"
            />
            <ImagePreviewer
              className="flex flex-wrap gap-4"
              setImageFiles={setImageFiles}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Available Colors</p>
            <Button
              onClick={() => availableColorsAppend({ value: "" })}
              variant="outline"
              className="size-10"
              type="button"
            >
              <Plus className="text-primary" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {availableColorsFields.map((field, index) => (
              <Controller
                key={field.id}
                name={`availableColors.${index}.value`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      color {index + 1}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      value={field.value || ""}
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Key Features</p>
            <Button
              onClick={() => keyFeaturesAppend({ value: "" })}
              variant="outline"
              className="size-10"
              type="button"
            >
              <Plus className="text-primary" />
            </Button>
          </div>
          {keyFeaturesFields.map((field, index) => (
            <Controller
              key={field.id}
              name={`keyFeatures.${index}.value`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Features {index + 1}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value || ""}
                    autoComplete="off"
                    className="mb-2"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Specifications</p>
            <Button
              variant="outline"
              onClick={() => specificationAppend({ property: "", value: "" })}
              className="size-10"
              type="button"
            >
              <Plus className="text-primary" />
            </Button>
          </div>
          {specificationFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4">
              <Controller
                name={`specification.${index}.property`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Property {index + 1}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      value={field.value || ""}
                      autoComplete="off"
                      className="mb-2"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name={`specification.${index}.value`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Value {index + 1}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      value={field.value || ""}
                      autoComplete="off"
                      className="mb-2"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          ))}
        </div>

        <Button
          form="from-create-product"
          type="submit"
          className="mt-5 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Product....." : "Add Product"}
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;
