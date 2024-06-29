//import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";

//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Support Desk",
  description: "Get the best support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
