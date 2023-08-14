"use client"

import React from "react"

type TaskContextType = {
  openTaskModal: boolean
  setOpenTaskModal: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskContext = React.createContext<TaskContextType>({} as TaskContextType)

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [openTaskModal, setOpenTaskModal] = React.useState(false)

  return (
    <TaskContext.Provider value={{ openTaskModal, setOpenTaskModal }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => React.useContext(TaskContext)
