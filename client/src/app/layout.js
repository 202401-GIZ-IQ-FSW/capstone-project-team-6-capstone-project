//import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ticket Master",
  description: "The best ticket support system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
