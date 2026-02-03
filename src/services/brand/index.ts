"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createBrandApi = async (data: FormData) => {
  try {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${base_url}/brand`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    const result = res.json();
    revalidateTag("BRAND", "default");
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

export const getAllBrands = async () => {
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = fetch(`${base_url}/brand`, {
      next: {
        tags: ["BRAND"],
      },
    });
    const result = (await res).json();
    return result;
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error("Create brand failed!", {
        cause: err,
      });
    }
    throw new Error("Create brand failed!");
  }
};

export const deleteBrnad = async (categoryId: string) => {
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = fetch(`${base_url}/brand/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    const result = (await res).json();
    revalidateTag("BRAND", "default");
    return result;
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error("delete brand failed!", {
        cause: err,
      });
    }
    throw new Error("delete brand failed!");
  }
};
