import { ThemeProvider } from "@/providers/Provider"
import "./globals.css"
import { Raleway } from "next/font/google"
import { BoardContextProvider } from "@/context/board-context"
import Sidebar from "@/components/layouts/side-bar"

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
          <div className="flex overflow-x-scroll">
            <BoardContextProvider>
              <Sidebar />
              {children}
            </BoardContextProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
