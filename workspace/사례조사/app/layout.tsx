import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EPC DT AI Map (베타)",
  description: "해외 EPC 기업의 AI·BIM·디지털트윈 기술 도입 현황 벤치마킹",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
