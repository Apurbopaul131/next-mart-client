"use client";
import { NMTable } from "@/components/core/NMTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteBrnad } from "@/services/brand";
import { IBrand } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateBrandModal from "./CreateBrandModal";
type TCreateBrandProps = {
  brands: IBrand[];
};
const CreateBrand = ({ brands }: TCreateBrandProps) => {
  const [brandId, setBrandId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const columns: ColumnDef<IBrand>[] = [
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="bg-white">
              <Image
                src={row.original.logo}
                alt={row.original.name}
                width={50}
                height={50}
                className="rounded-full"
              ></Image>
            </div>
            <h3 className="text-sm font-semibold">{row.original.name}</h3>
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: () => <div>isActive</div>,
      cell: ({ row }) => {
        const isActivate = row?.original?.isActive;
        return (
          <span
            className={`${isActivate ? "bg-green-300" : "bg-red-300"}  py-1 px-2 rounded-md`}
          >
            {row.original.isActive ? "true" : "false"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Actions</div>,
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => {
              setBrandId(row?.original?._id);
              setOpen(true);
            }}
            variant={"destructive"}
            className="cursor-pointer"
          >
            <Trash />
          </Button>
        );
      },
    },
  ];
  const handleDeleteBrand = async () => {
    if (!brandId) {
      return;
    }
    try {
      const res = await deleteBrnad(brandId);
      if (res?.success) {
        toast.success(res?.message, {
          position: "top-right",
          style: {
            color: "green",
          },
        });
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
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3>Manage Brands</h3>
        <CreateBrandModal />
      </div>
      <NMTable data={brands} columns={columns} />
      {/* Brand confim deleted modal */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Brnad?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              brand.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBrand}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateBrand;
