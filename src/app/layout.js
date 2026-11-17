import { Instrument_Sans, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${caveatFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-mat text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
