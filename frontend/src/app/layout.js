
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./Provider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gradewise",
  description: "Gradewise Ai Grader",
  icons:{
    icon:'/ico.webp'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
