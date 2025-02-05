"use client";
import "@/assets/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-gray-300">
        <div className="dark:text-bodydark ">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
