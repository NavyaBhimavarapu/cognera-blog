import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cognera Blog | Digital Analytics",
  description: "Exploring digital analytics and privacy-first data solutions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F7FA] antialiased">
        {children}
      </body>
    </html>
  )
}
