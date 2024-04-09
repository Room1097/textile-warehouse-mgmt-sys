import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/SideBar/sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T.W.M.S.",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="">
          <Sidebar />
          <div className="pl-[16rem] pr-8 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
