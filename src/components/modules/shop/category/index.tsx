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
import { deleteCategory } from "@/services/category";
import { ICategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateCategoryModal from "./CreateCategoryModal";

type TCategoryProps = {
  categories: ICategory[];
};
const CreateCategory = ({ categories }: TCategoryProps) => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="bg-white">
              <Image
                src={row.original.icon}
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
              setCategoryId(row?.original?._id);
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
  const handleDeleteCategory = async () => {
    if (!categoryId) {
      return;
    }
    try {
      const res = await deleteCategory(categoryId);
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
        <h3 className="font-semibold">Manage category</h3>
        <CreateCategoryModal />
      </div>
      <NMTable columns={columns} data={categories} />

      {/* Alert Dialog Modal */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
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

export default CreateCategory;
