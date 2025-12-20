import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Dessert | 수제 디저트 전문점",
  description:
    "매일 아침, 신선한 재료로 정성껏 만드는 수제 디저트. 케이크, 마카롱, 쿠키, 타르트를 만나보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={playfair.variable}>
      <body className="antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
