import NavBar from "@/components/NavBar";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />

      {children}
    </>
  );
}
