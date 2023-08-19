"use client"
import { useBoardContext } from "@/context/board-context"
import { AddTaskModal } from "../tasks/add-task-modal"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

function PageHeader({ selectedBoard }: { selectedBoard: string }) {
  const router = useRouter()
  // const matches = useMediaQuery("(min-width: 768px)")
  // const { setOpenTaskModal } = useTaskContext()

  const { boards, setCurrentBoard, currentBoard } = useBoardContext()
  useEffect(() => {
    const currentBoard = boards.find(
      (board) => board.boardName === selectedBoard
    )

    if (!currentBoard) {
      router.push("/boards")
      return
    }
    setCurrentBoard(currentBoard)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards, selectedBoard])

  // console.log(currentBoard)

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
