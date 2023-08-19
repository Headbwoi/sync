"use client"
import { boards } from "@/utils/seed-data"
import React from "react"

type BoardContextType = {
  boards: {
    name: string
    description: string
    columns: {
      name: string
      tasks: {
        name: string
        description: string
        subtasks: {
          name: string
          completed: boolean
        }[]
        id: string
      }[]
    }[]
  }[]

  selectedBoard: string
  setSelectedBoard: React.Dispatch<React.SetStateAction<string>>
  openCreateNewBoard: boolean
  setOpenCreateNewBoard: React.Dispatch<React.SetStateAction<boolean>>
}

export const BoardContext = React.createContext<BoardContextType>(
  {} as BoardContextType
)

export const BoardContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedBoard, setSelectedBoard] = React.useState(boards[0].name)
  const [openCreateNewBoard, setOpenCreateNewBoard] = React.useState(false)

  return (
    <BoardContext.Provider
      value={{
        boards,
        selectedBoard,
        setSelectedBoard,
        openCreateNewBoard,
        setOpenCreateNewBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export const useBoardContext = () => React.useContext(BoardContext)
