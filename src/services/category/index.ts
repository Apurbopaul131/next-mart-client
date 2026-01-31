"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const CreateCategoryApi = async (data: FormData) => {
  try {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${base_url}/category`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    const result = await res.json();
    revalidateTag("CATEGORY", "default");
    return result;
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error("Create category failed!", {
        cause: err,
      });
    }
    throw new Error("Create category failed!");
  }
};
export const getAllCategories = async () => {
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = await fetch(`${base_url}/category`, {
      next: {
        tags: ["CATEGORY"],
      },
    });
    const result = (await res).json();
    return result;
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error("Create category failed!", {
        cause: err,
      });
    }
    throw new Error("Create category failed!");
  }
};
export const deleteCategory = async (categoryId: string) => {
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = await fetch(`${base_url}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    const result = (await res).json();
    revalidateTag("CATEGORY", "default");
    return result;
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error("delete category failed!", {
        cause: err,
      });
    }
    throw new Error("delete category failed!");
  }
};
