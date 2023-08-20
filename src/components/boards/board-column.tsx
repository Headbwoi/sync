"use client"

import React, { useState } from "react"
import { useWindowSize } from "@/hooks/useWindowSize"
import { AddColumn } from "./add-new-column"
import TaskInfo, { TaskProps } from "../tasks/task-info"
import { useBoardContext } from "@/context/board-context"
import ColumnHeader from "./column-header"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import EditTaskInfo from "../tasks/edit-task-info"

function BoardColumn() {
  const { width } = useWindowSize()
  const { currentBoard } = useBoardContext()
  const [Task, setTask] = useState({} as TaskProps)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <>
      <div
        style={{
          minWidth: `${width}px`,
        }}
        className="relative flex h-full gap-10 px-40 overflow-scroll pt-14"
      >
        <section key={currentBoard?.boardName} className="flex gap-10">
          {/* columns */}

          {currentBoard?.columns?.map((column, index) => (
            <section
              className="flex flex-col min-w-[17.8125rem] gap-10 "
              key={column.name}
            >
              <ColumnHeader
                info={{
                  columnName: column.name,
                  columnIndex: index,
                  boardId: currentBoard.id,
                }}
              />

              {column.tasks?.map((task) => (
                <React.Fragment key={task.id}>
                  <div
                    className="w-[17.8125rem] rounded-lg p-5 bg-muted-foreground cursor-pointer flex items-center justify-between"
                    onClick={() => {
                      setTask({ ...task, column: column.name })
                      setShowTaskModal(true)
                    }}
                  >
                    <header className="text-lg font-semibold capitalize text-background">
                      {task.name}
                    </header>

                    <TaskDropDown
                      setShowEditModal={setShowEditModal}
                      setShowTaskModal={setShowTaskModal}
                    />
                  </div>
                </React.Fragment>
              ))}
            </section>
          ))}

          <AddColumn />
        </section>
      </div>

      {showTaskModal && (
        <TaskInfo
          setShowModal={setShowTaskModal}
          showModal={showTaskModal}
          task={Task}
        />
      )}

      {showEditModal && (
        <EditTaskInfo
          setShowEditModal={setShowEditModal}
          showEditModal={showEditModal}
          task={Task}
          key={""}
        />
      )}
    </>
  )
}

export default BoardColumn

type TaskDropDownProps = {
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
}
const TaskDropDown = ({
  setShowTaskModal,
  setShowEditModal,
}: TaskDropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="cursor-pointer">
        <DropdownMenuLabel>Edit Task</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            setShowEditModal(true)
            setShowTaskModal(false)
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            setShowTaskModal(true)
            setShowEditModal(false)
          }}
        >
          View Info
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
