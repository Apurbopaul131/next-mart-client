"use client";
import Logo from "@/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginUserValidationSchema } from "@/schemas/LoginValidation";
import { LoginUser } from "@/services/AuthServices";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(LoginUserValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  const handleRegisterForm: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const res = await LoginUser(data);
      if (res?.success) {
        toast.success(res?.message, {
          position: "top-right",
          style: {
            color: "green",
          },
        });
        //clear the form after register
        form.reset();
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
    <div className="border-2 bg-[#f6f6f6] p-9 rounded-2xl">
      <div className="flex items-center space-x-4">
        <Logo width={80} height={30}></Logo>

        <div>
          <h1 className="text-4xl font-bold">Sign In</h1>
          <p className="font-extralight">
            Enter your email and phone number to sign up.
          </p>
        </div>
      </div>
      <div className="mt-9">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegisterForm)}>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-full focus-visible:ring-[1px]"
                        placeholder="Enter your email"
                        {...field}
                        type="email"
                        value={field?.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-full focus-visible:ring-[1px]"
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                        value={field?.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full rounded-full">
                {isSubmitting ? "Loging..." : "Login"}
              </Button>
            </div>
          </form>
        </Form>
        <p className="mt-5 text-sm text-center text-[#01031380]">
          Already have an account?{" "}
          <span className="text-[#010313] text-md">
            <Link href={"/register"}>SigUp</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
