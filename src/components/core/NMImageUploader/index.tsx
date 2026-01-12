import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
type TImageUploaderProp = {
  label?: string;
  className?: string;
  setImageFiles: Dispatch<SetStateAction<File[]>>;
  setImagePreview: Dispatch<SetStateAction<string[]>>;
};
const NMImageUploader = ({
  label = "Upload Here",
  className,
  setImageFiles,
  setImagePreview,
}: TImageUploaderProp) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((pre) => [...pre, file]);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview((pre) => [...pre, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={cn("", className)}>
      <Input
        id="companylogo"
        type="file"
        name="companylogo"
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleFileChange}
      ></Input>
      <Label
        htmlFor="companylogo"
        className="border-2 w-36 border-dashed border-gray-300 p-6 rounded-md cursor-pointer hover:bg-white"
      >
        {label}
      </Label>
    </div>
  );
};

export default NMImageUploader;
