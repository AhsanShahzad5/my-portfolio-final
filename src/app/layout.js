import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ahsan Shahzad | AI/ML Engineer",
  description:
    "Portfolio of Ahsan Shahzad, an AI/ML engineer building production GenAI systems (RAG, LangGraph agents) with hands-on ML, deep learning and MLOps projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
