
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
  title: 'FeedbackAI | Hackathon Solution for Teacher Workload',
  description: 'AI-powered feedback solution for educators',
  icons: {
    icon: '/ico.webp'
  }
};

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Provider>
//           {children}
//           <ToastContainer />
//         </Provider>
//       </body>
//     </html>
//   );
// }

// src/app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'
import { SidebarProvider } from "@/components/sidebar-provider";

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Provider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  )
}


