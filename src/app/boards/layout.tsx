import { BoardContextProvider } from "@/context/board-context"
import Sidebar from "@/components/layouts/side-bar"
import { TaskContextProvider } from "@/context/task-context"

export const metadata = {
  title: "Boards",
  description: "An app that helps you to manage your tasks quickly",
}

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex min-w-full">
        <BoardContextProvider>
          <Sidebar />

          <TaskContextProvider>{children}</TaskContextProvider>
        </BoardContextProvider>
      </div>
    </>
  )
}
