"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter, notFound } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";

import { resetPasswordSchema, ResetPasswordValues } from "@/lib/validations";
import { authClient } from "@/lib/auth-client";
import { PasswordInput } from "../ui/password-input";

export default function ResetPasswordForm() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!token) {
      toast.warning("Invalid or expired reset link");
      return;
    }

    setError("");
    setIsPending(true);

    try {
      await authClient.resetPassword(
        {
          newPassword: values.password,
          token,
        },
        {
          onSuccess: () => {
            form.reset();
            toast.success("Password updated successfully");
            router.replace("/login");
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        },
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  if (!token) return notFound();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="enter a new password"
                  type="password"
                  {...field}
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
                <PasswordInput
                  placeholder="re enter the password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isPending}
          type="submit"
          className="w-full"
          disabled={!token}
        >
          Update Password
        </LoadingButton>
      </form>
    </Form>
  );
}
