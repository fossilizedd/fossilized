import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/client/components/NavBar";

export const metadata: Metadata = {
  title: "Fossilized",
  description: "Track festivals, seasonal produce, and picking seasons",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
