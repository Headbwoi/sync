"use client"

import React, { useState } from "react"
import { useWindowSize } from "@/hooks/useWindowSize"
import { boards } from "@/utils/seed-data"
import { AddColumn } from "./add-new-column"
import TaskInfo, { TaskProps } from "../tasks/task-info"

function BoardColumn({ board }: { board: string }) {
  const { width } = useWindowSize()
  const [Task, setTask] = useState({} as TaskProps)
  const [showTaskModal, setShowTaskModal] = useState(false)

  const [selectedBoard] = boards.filter((b) => b.name === board)

  return (
    <>
      <div
        style={{
          minWidth: `${width}px`,
        }}
        className="relative flex items-center h-full gap-10 px-40 overflow-scroll"
      >
        <section key={selectedBoard?.name} className="flex gap-10">
          {/* columns */}

          {selectedBoard?.columns.map((column) => (
            <section
              className="flex flex-col min-w-[17.8125rem] gap-10"
              key={column.name}
            >
              <p>{column?.name}</p>

              {column.tasks.map((task) => (
                <React.Fragment key={task.id}>
                  <div
                    className="w-[17.8125rem] rounded-lg p-5 bg-muted-foreground cursor-pointer"
                    onClick={() => {
                      setTask(task)
                      setShowTaskModal(true)
                    }}
                  >
                    <header className="text-lg font-semibold text-background">
                      {task.name}
                    </header>
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
    </>
  )
}

export default BoardColumn
