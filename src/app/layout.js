import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata = {
  title: "Ahsan Shahzad | AI/ML Engineer",
  description:
    "Portfolio of Ahsan Shahzad, an AI/ML engineer building production GenAI systems (RAG, LangGraph agents) with hands-on ML, deep learning and MLOps projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
