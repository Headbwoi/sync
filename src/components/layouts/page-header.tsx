"use client"

import { useBoardContext } from "@/context/board-context"
import { Button } from "../ui/button"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { PlusIcon } from "lucide-react"
import { useTaskContext } from "@/context/task-context"
import { AddTaskModal } from "../tasks/add-task-modal"

function PageHeader() {
  const { selectedBoard } = useBoardContext()
  const matches = useMediaQuery("(min-width: 768px)")
  const { setOpenTaskModal } = useTaskContext()

  return (
    <div
      className={` flex items-center justify-between h-12 px-5 lg:h-14 bg-foreground`}
    >
      <p className="text-lg font-semibold capitalize lg:text-2xl text-secondary">
        {selectedBoard}
      </p>

      <AddTaskModal />
    </div>
  )
}

export default PageHeader
