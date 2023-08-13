"use client"

import { useBoardContext } from "@/context/board-context"

function PageHeader() {
  const { boards, selectedBoard, setSelectedBoard } = useBoardContext()
  return (
    <div className="lg:flex absolute top-0 w-full ml-1 h-16 hidden items-center px-5 bg-foreground">
      <p className="text-2xl text-secondary font-semibold capitalize">
        {selectedBoard}
      </p>
    </div>
  )
}

export default PageHeader
