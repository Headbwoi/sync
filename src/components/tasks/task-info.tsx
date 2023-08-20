import React, { useState } from "react"
import Modal from "../ui/modal"
import { Checkbox } from "../ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useBoardContext } from "@/context/board-context"

export type TaskProps = {
  name: string
  description: string
  subtasks: {
    task: string
    completed: boolean
  }[]
  id: string
  column: string
}

function TaskInfo({
  task,
  showModal,
  setShowModal,
}: {
  task: TaskProps
  showModal: boolean
  setShowModal: (open: boolean) => void
}) {
  const { currentBoard } = useBoardContext()

  const completedSubTasks = task.subtasks?.reduce((count, task) => {
    if (task.completed) {
      return count + 1
    }
    return count
  }, 0)

  // useEffect(() => {
  //   console.log(status)
  // }, [status])

  return (
    <Modal open={showModal} onOpenChange={(prev) => !prev}>
      <Modal.Content title={task.name} className="space-y-6 bg-foreground">
        <p className="text-muted">{task.description}</p>

        {/* subtasks */}
        <div className="space-y-3">
          <header className="font-semibold text-card">
            subtasks ({completedSubTasks} of {task.subtasks?.length})
          </header>

          <div className="flex flex-col gap-3">
            {task.subtasks?.map((task, index) => (
              <div className="flex items-center space-x-2" key={task.task}>
                <div className="flex items-center rounded-sm ring-blue-500 ring-2">
                  <Checkbox id={`${index}`} />
                </div>
                <label
                  htmlFor={`${index}`}
                  className="text-sm font-medium leading-none text-muted peer-disabled:cursor-not-allowed peer-disabled:opacity-70 checked:line-through"
                >
                  {task.task}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* column */}
        <div className="flex flex-col items-start gap-5">
          <label
            htmlFor="status"
            className="text-sm font-semibold text-right text-background"
          >
            Status
          </label>

          <Select
            // onValueChange={(value) => setStatus(value)}
            defaultValue={task.column}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={task.column}
                className="text-red-500 placeholder:text-red-500"
              />
            </SelectTrigger>
            <SelectContent className="">
              {currentBoard?.columns.map((column) => (
                <SelectItem
                  key={column.name}
                  value={column.name}
                  className="cursor-pointer"
                >
                  {column.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default TaskInfo
