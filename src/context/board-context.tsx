"use client"
import { useBoardStore } from "@/zustand/store"
import React, { useState } from "react"

type BoardType = {
  id: string
  boardName: string
  description: string
  columns:
    | []
    | {
        name: string
        tasks: {
          id: string
          name: string
          description: string
          subtasks:
            | {
                task: string
                completed: boolean
              }[]
            | undefined
        }[]
      }[]
}

type BoardContextType = {
  boards: BoardType[]

  selectedBoard: string
  setSelectedBoard: React.Dispatch<React.SetStateAction<string>>
  openCreateNewBoard: boolean
  setOpenCreateNewBoard: React.Dispatch<React.SetStateAction<boolean>>
  currentBoard: BoardType
  setCurrentBoard: React.Dispatch<React.SetStateAction<BoardType>>
}

export const BoardContext = React.createContext<BoardContextType>(
  {} as BoardContextType
)

export const BoardContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { boards } = useBoardStore((state) => state)
  const [selectedBoard, setSelectedBoard] = React.useState(
    boards[0]?.boardName ?? ""
  )
  const [currentBoard, setCurrentBoard] = useState({} as BoardType)
  const [openCreateNewBoard, setOpenCreateNewBoard] = React.useState(false)

  // useEffect(() => {
  //   console.log(currentBoard)
  // }, [currentBoard])

  return (
    <BoardContext.Provider
      value={{
        boards,
        selectedBoard,
        setSelectedBoard,
        openCreateNewBoard,
        setOpenCreateNewBoard,
        currentBoard,
        setCurrentBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export const useBoardContext = () => React.useContext(BoardContext)
