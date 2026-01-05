"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (data: FieldValues) => {
  try {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${base_url}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export const LoginUser = async (data: FieldValues) => {
  try {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${base_url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    const cookiesStore = await cookies();
    if (result?.data?.accessToken) {
      cookiesStore.set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error("User login failed!", {
        cause: err,
      });
    }
    throw new Error("User login failed");
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")!.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = jwtDecode(accessToken);
  }
  return decodedData;
};
