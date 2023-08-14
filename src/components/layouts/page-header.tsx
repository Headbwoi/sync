"use client"

import { useBoardContext } from "@/context/board-context"

function PageHeader() {
  const { boards, selectedBoard, setSelectedBoard } = useBoardContext()
  return (
    <div className="absolute top-0 flex items-center w-full h-12 px-5 ml-1 lg:h-14 bg-foreground">
      <p className="text-lg font-semibold capitalize lg:text-2xl text-secondary">
        {selectedBoard}
      </p>
    </div>
  )
}

export default PageHeader
