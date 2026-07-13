import { ReactLenis } from "lenis/react";
import "./globals.css";
import "@/styles/token.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-void font-body text-text-primary">
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}