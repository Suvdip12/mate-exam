"use client";

import { Button } from "@/components/ui/button";
import { sendSMSTestAction } from "@/lib/actions/send-sms";

export default function Page() {
  return (
    <div className="mt-10 flex w-full justify-center">
      <Button
        variant="destructive"
        onClick={async () => {
          console.log("sms sending...");
          await sendSMSTestAction();
        }}
      >
        Send SMS
      </Button>
    </div>
  );
}
