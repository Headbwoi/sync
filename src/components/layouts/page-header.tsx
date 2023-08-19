"use client"
import { useBoardContext } from "@/context/board-context"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useTaskContext } from "@/context/task-context"
import { AddTaskModal } from "../tasks/add-task-modal"

function PageHeader({ selectedBoard }: { selectedBoard: string }) {
  // const { selectedBoard } = useBoardContext()
  const matches = useMediaQuery("(min-width: 768px)")
  const { setOpenTaskModal } = useTaskContext()

  return (
    <header
      className={` w-full flex items-center gap-1 sm:justify-between h-12 px-5 lg:h-14 bg-foreground`}
    >
      <p className="text-lg font-semibold capitalize lg:text-2xl text-secondary">
        {selectedBoard}
      </p>

      <AddTaskModal />
    </header>
  )
}

export default PageHeader
