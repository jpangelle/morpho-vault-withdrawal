import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { getConfig } from "@/wagmiConfig";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Morpho Withdraw",
  description: "Morpho Vault Withdraw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );

  return (
    <html lang="en">
      <body className={`${inter.className} bg-morpho-background`}>
        <Providers initialState={initialState}>
          <Header />
          <div className="flex justify-center mt-[200px]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
