import React from "react"
import { TaskProps } from "./task-info"
import { useBoardContext } from "@/context/board-context"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddTaskSchema, AddTaskType } from "@/lib/validations/form-validations"
import Modal from "../ui/modal"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { PlusIcon, X } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"

type EditTaskInfoProps = { task: TaskProps } & {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  showEditModal: boolean
}

function EditTaskInfo({
  task,
  setShowEditModal,
  showEditModal,
}: EditTaskInfoProps) {
  const { currentBoard } = useBoardContext()

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<AddTaskType>({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      column: task.column,
      description: task.description,
      sub_tasks: task.subtasks,
      title: task.name,
    },
  })

  console.log(task)

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sub_tasks", // unique name for your Field Array
  })

  const OnSubmit = (data: AddTaskType) => {
    const payload = {
      boardId: currentBoard.id,
      columnName: task.column,
      taskInfo: {
        id: task.id,
        name: data.title,
        description: data.description,
        subtasks: data.sub_tasks,
      },
    }
  }

  return (
    <Modal open={showEditModal} onOpenChange={setShowEditModal}>
      <Modal.Content title={`Edit Task`} className="px-2">
        <ScrollArea className="max-h-[50vh] py-10">
          <form
            onSubmit={handleSubmit(OnSubmit)}
            className="flex flex-col gap-4 py-4 mx-4"
          >
            {/* title */}
            <div className="flex flex-col items-start gap-4">
              <label htmlFor="title" className="text-sm text-right">
                Title
              </label>
              <Input
                id="title"
                className="col-span-3"
                placeholder="e.g. take coffee break"
                {...register("title")}
              />
              <p className="text-xs text-red-500">{errors.title?.message}</p>
            </div>

            {/* description */}
            <div className="flex flex-col items-start gap-5">
              <label htmlFor="description" className="text-sm text-right">
                Description
              </label>
              <Textarea
                id="description"
                className="col-span-3"
                placeholder="e.g. it is always good to take a break and touch grass"
                {...register("description")}
              />
              <p className="text-xs text-red-500">
                {errors.description?.message}
              </p>
            </div>

            {/* column */}
            <div className="flex flex-col items-start gap-5">
              <label htmlFor="column" className="text-sm text-right">
                Column
              </label>

              <Controller
                control={control}
                name="column"
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Edit Column" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentBoard.columns.map((column, index) => (
                        <SelectItem
                          key={column.name}
                          value={column.name}
                          className="capitalize"
                          //   onClick={() => {
                          //     setColumnIndex(index)
                          //   }}
                        >
                          {column.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              <p className="text-xs text-red-500">{errors.column?.message}</p>
            </div>

            {/* sub tasks */}

            <div className="flex flex-col items-start gap-5">
              <label htmlFor="sub_tasks" className="text-sm text-right">
                Sub Tasks
              </label>

              {fields.map((field, index) => (
                <div className="flex items-center w-full gap-3" key={field.id}>
                  <Input
                    id={`sub_task${index}`}
                    {...register(`sub_tasks.${index}.task`)}
                    placeholder="e.g. do 10 situps"
                  />
                  <X
                    onClick={() => {
                      remove(index)
                    }}
                  />
                </div>
              ))}

              <Button
                variant={"secondary"}
                className="flex items-center w-full gap-4"
                onClick={() => {
                  append({
                    completed: false,
                    task: "",
                  })
                }}
                type="button"
              >
                <PlusIcon /> Add New Subtask
              </Button>
            </div>
          </form>
        </ScrollArea>
      </Modal.Content>
    </Modal>
  )
}

export default EditTaskInfo
