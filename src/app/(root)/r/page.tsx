import { getTopRankers } from "@/lib/actions/result.action";
import React from "react";

export default async function page() {
  const data = await getTopRankers("V");
  data.success == true ? data.data : console.log(data.error);

  return <div>page</div>;
}
