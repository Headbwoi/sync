import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { PlusIcon, X } from "lucide-react"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddTaskSchema, AddTaskType } from "@/lib/validations/form-validations"
import { ScrollArea } from "../ui/scroll-area"
import { useWindowSize } from "@/hooks/useWindowSize"
import { useBoardStore } from "@/zustand/store"
import { useBoardContext } from "@/context/board-context"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"

export function AddTaskModal() {
  const matches = useMediaQuery("(min-width: 768px)")
  const { height } = useWindowSize()
  const { addTaskToColumn } = useBoardStore((state) => state)
  const { currentBoard } = useBoardContext()
  const [columnIndex, setColumnIndex] = useState(0)

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<AddTaskType>({
    resolver: zodResolver(AddTaskSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sub_tasks", // unique name for your Field Array
  })

  const onSubmit = (tasks: AddTaskType) => {
    // console.log(tasks)

    const payload = {
      id: crypto.randomUUID().toString().replaceAll("-", ""),
      boardId: currentBoard.id,
      columnInfo: {
        name: tasks.column,
        index: columnIndex,
      },
      description: tasks.description,
      title: tasks.title,
      subtasks: tasks.sub_tasks,
      status: tasks.column,
    }

    // console.log(payload)
    addTaskToColumn(payload)
  }

  // console.log(errors)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} aria-label="Add New Task">
          {matches ? (
            <>
              <PlusIcon /> Add New Task
            </>
          ) : (
            <PlusIcon />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2">
        <ScrollArea
          className="w-full"
          style={{
            height: `${height - 100}px`,
          }}
        >
          <DialogHeader className="px-4">
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your board here
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4 py-4 mx-4"
            onSubmit={handleSubmit(onSubmit)}
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
                      <SelectValue placeholder="Enter Column" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentBoard.columns.map((column, index) => (
                        <SelectItem
                          key={column.name}
                          value={column.name}
                          className="capitalize"
                          onClick={() => {
                            setColumnIndex(index)
                          }}
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

            <DialogFooter>
              {Object.keys(errors).length !== 0 ? (
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              ) : (
                <Button type="submit">Save changes</Button>
              )}
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
