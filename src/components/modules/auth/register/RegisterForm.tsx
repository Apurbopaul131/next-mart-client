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
import { registerFormSchema } from "@/schemas/RegisterFormSchema";
import { registerUser } from "@/services/AuthServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    formState: { isSubmitting },
  } = form;
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");
  useEffect(() => {
    if (confirmPassword) {
      form.trigger("confirmPassword");
    }
  }, [password, confirmPassword, form]);
  const handleRegisterForm: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser({
        name: data?.name,
        email: data?.email,
        password: data?.password,
      });
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
    <div className="border-2 bg-[#f6f6f6] p-9 border-none rounded-2xl">
      <div className="flex items-center gap-4">
        <Logo width={80} height={30}></Logo>

        <div>
          <h1 className="text-4xl font-bold">Sign Up</h1>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-full focus-visible:ring-[1px]"
                        placeholder="Enter your name"
                        {...field}
                        type="text"
                        value={field?.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
              <Button
                disabled={password !== confirmPassword}
                type="submit"
                className="w-full rounded-full"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
