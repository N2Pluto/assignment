import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navbar/header";
import { CartProvider } from "@/contexts/CartContext";
import { CartSidebar } from "@/components/cart/CartSidebar";
import NextTopLoader from "nextjs-toploader";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "BTL SOFT ASSIGNMENT",
  description: "BTL SOFT ASSIGNMENT"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <NextTopLoader
          color="#26B689"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #CB987A,0 0 5px #CB987A"
        />
      </head>
      <body className={`${dmSans.className} antialiased text-text-primary`}>
        <CartProvider>
          <Header />
          <CartSidebar />
          <div className="pt-24">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
