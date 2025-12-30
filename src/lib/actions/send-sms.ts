"use server";

import { sendSMS } from "@/helpers/sms-sender";

export async function sendSMSTestAction() {
  return await sendSMS({
    to: "7602831377",
    message: "HI this is for testing",
  });
}
