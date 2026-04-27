import "./globals.css";

export const metadata = {
  title: "Lin Zhiyuan Resume",
  description: "A clean, extensible personal resume and portfolio system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
