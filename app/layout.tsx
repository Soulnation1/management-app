
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <Providers>
      <html lang="en" className="h-full antialiased">
        <body className="min-h-full flex flex-col">
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </Providers>
  );
}
