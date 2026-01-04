"use server";

import { FieldValues } from "react-hook-form";

export const registerUser = async (data: FieldValues) => {
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log(base_url);
  const res = await fetch(`${base_url}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};
