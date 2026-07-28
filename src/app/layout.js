import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const caveatFont = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Anshuman Mishra — Product Designer & Developer",
  description:
    "Portfolio of Anshuman Mishra — Think, plan, and build digital products all in one place.",
  keywords: [
    "Anshuman Mishra",
    "Product Designer",
    "UX Designer",
    "Design System",
    "Spatial UI",
    "Frontend Developer",
  ],
  authors: [{ name: "Anshuman Mishra" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${caveatFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F6F7F9] text-[#1E293B] font-sans">
        {children}
      </body>
    </html>
  );
}
