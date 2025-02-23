import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "易经数字占卜 - 在线周易卦象查询",
  description: "免费在线易经数字占卜工具，输入数字即可快速获取卦象解读，周易六十四卦完整解析，帮助你了解事物发展趋势。",
  keywords: "易经,周易,数字占卜,六十四卦,在线占卜,卦象解读",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "易经数字占卜 - 在线周易卦象查询",
    description: "免费在线易经数字占卜工具，输入数字即可快速获取卦象解读。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
