'use client';

// app/layout.js
import './global.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />
        <div className="app-container">
          <main className="main-content">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
