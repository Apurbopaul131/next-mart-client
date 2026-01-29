"use server";

import { cookies } from "next/headers";

export const CreateCategoryApi = async (data: FormData) => {
  try {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log(base_url);
    const res = await fetch(`${base_url}/category`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    const result = await res.json();
    return result;
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error("User registration failed", {
        cause: err,
      });
    }
    throw new Error("User registration failed");
  }
};
