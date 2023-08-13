"use client"
import React from "react"

type BoardContextType = {
  boards: string[]
  selectedBoard: string
  setSelectedBoard: React.Dispatch<React.SetStateAction<string>>
}

export const BoardContext = React.createContext<BoardContextType>(
  {} as BoardContextType
)

export const BoardContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const boards = ["platform Launch", "marketing plan", "roadmap"]

  const [selectedBoard, setSelectedBoard] = React.useState(boards[0])

  return (
    <BoardContext.Provider value={{ boards, selectedBoard, setSelectedBoard }}>
      {children}
    </BoardContext.Provider>
  )
}

export const useBoardContext = () => React.useContext(BoardContext)
