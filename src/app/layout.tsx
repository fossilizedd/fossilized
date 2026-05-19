import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/client/components/NavBar";

export const metadata: Metadata = {
  title: "Midwest Seasonal Almanac",
  description: "Track seasonal produce and picking seasons in the Midwest",
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
