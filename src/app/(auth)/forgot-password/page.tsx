import forgotImage from "@/assets/signup-image.jpg";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        {/* Left side */}
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Forgot your password?</h1>
            <p className="text-muted-foreground">
              We’ll send you a reset link on your email
            </p>
          </div>

          <div className="space-y-5">
            <ForgotPasswordForm />
            <Link
              href="/login"
              className="block text-center text-sm hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
        <Image
          src={forgotImage}
          alt="Forgot password image"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
