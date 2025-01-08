import { betterAuth, BetterAuthOptions, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "./lib/prisma";
import { sendEmail } from "./lib/actions/email.action";
import { cache } from "react";
import { headers } from "next/headers";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 hour
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // cache duration in seconds
    },
  },
  plugins: [admin()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.BETTER_AUTH_URL}/email-verified`;
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        magicLink: verificationUrl,
        name: user.name,
      });
    },
  },
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });
    return session
      ? { user: session.user, session }
      : { user: null, session: null };
  },
);
