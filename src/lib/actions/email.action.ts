"use server";

import MagicLinkEmail from "@/components/emails/magic-link-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to: email,
  subject,
  name,
  message,
  magicLink,
}: {
  to: string;
  subject: string;
  name: string;
  message?: string;
  magicLink: string;
}) {
  try {
    const data = await resend.emails.send({
      from: "MATPG1 <onboarding@matpg1.in>",
      to: [email],
      subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message || ""}`,
      react: MagicLinkEmail({
        magicLink,
        name,
      }),
    });
    console.log("Email sent", data);
    return { success: true, data };
  } catch (error) {
    console.log("Email error", error);
    return { success: false, error };
  }
}
