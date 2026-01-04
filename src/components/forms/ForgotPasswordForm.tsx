"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";

import { forgotPasswordSchema, ForgotPasswordValues } from "@/lib/validations";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordForm() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setError("");
    setIsPending(true);

    try {
      await authClient.requestPasswordReset(
        { email: values.email },
        {
          onSuccess: () => {
            form.reset();
            toast.success("Password reset link sent to your email");
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          Send Reset Link
        </LoadingButton>
      </form>
    </Form>
  );
}
