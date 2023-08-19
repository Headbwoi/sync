import { ThemeProvider } from "@/providers/Provider"
import "./globals.css"
import { Raleway } from "next/font/google"

const raleway = Raleway({ subsets: ["latin"] })

export const metadata = {
  title: "Sync - Manage your tasks Efficiently",
  description: "An app that helps you to manage your tasks quickly",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className} bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
