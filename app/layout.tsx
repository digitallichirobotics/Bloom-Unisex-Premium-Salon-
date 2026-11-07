import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLOOM Unisex Premium Salon | Bhubaneswar",
  description:
    "Explore hair styling, keratin, skin care and makeup at BLOOM Unisex Premium Salon in Bhubaneswar. View salon gallery and request an appointment.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
