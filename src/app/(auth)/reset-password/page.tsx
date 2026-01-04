import resetImage from "@/assets/signup-image.jpg";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        {/* Left side */}
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-muted-foreground">
              Enter a new password to regain access
            </p>
          </div>

          <div className="space-y-5">
            <ResetPasswordForm />
            <Link
              href="/login"
              className="block text-center text-sm hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>

        {/* Right side image */}
        <Image
          src={resetImage}
          alt="Reset password image"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
