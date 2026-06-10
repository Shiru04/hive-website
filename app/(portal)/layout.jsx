import { Montserrat } from "next/font/google";
import "@/styles/index.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Client Portal | Hive Media",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  themeColor: "#020617",
};

export default function PortalRootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="bg-slate-950 text-slate-50">{children}</body>
    </html>
  );
}
