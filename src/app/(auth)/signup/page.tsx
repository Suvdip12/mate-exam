import SignUpForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <p>Sign up for an account.</p>
      <SignUpForm />
    </div>
  );
}
