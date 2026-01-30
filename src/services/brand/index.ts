"use server";

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
