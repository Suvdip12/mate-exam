import axios from "axios";

const FAST2SMS_URL = "https://www.fast2sms.com/dev/bulkV2";

interface SMSSendPayload {
  to: string | string[];
  message: string;
}

export async function sendSMS({ to, message }: SMSSendPayload) {
  try {
    const numbers = Array.isArray(to) ? to.join(",") : to;

    const res = await axios.post(
      FAST2SMS_URL,
      {
        route: "q", // NO DLT (shared sender)
        message,
        numbers,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY!, // SERVER ONLY
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );

    console.log("[FAST2SMS SUCCESS]", res.data);

    return {
      success: true,
      data: res.data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[FAST2SMS ERROR]", error.response?.data || error.message);

    return {
      success: false,
      error: error.response?.data || "SMS sending failed",
    };
  }
}
