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
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { AddTaskSchema, AddTaskType } from "@/lib/validations/form-validations"
import { PlusIcon, X } from "lucide-react"

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
  openTaskModal,
  setOpenTaskModal,
}: {
  task: TaskProps
  setOpenTaskModal: React.Dispatch<React.SetStateAction<boolean>>
  openTaskModal: boolean
}) {
  const { currentBoard } = useBoardContext()

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<AddTaskType>({
    // resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      column: task.column,
      description: task.description,
      sub_tasks: task.subtasks,
      title: task.name,
    },
  })

  const { fields, remove } = useFieldArray({
    control,
    name: "sub_tasks", // unique name for your Field Array
  })

  const completedSubTasks = task.subtasks?.reduce((count, task) => {
    if (task.completed) {
      return count + 1
    }
    return count
  }, 0)

  const onSubmit = (data: AddTaskType) => {
    console.log(data)

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

    console.log(payload)
  }

  return (
    <Modal open={openTaskModal} onOpenChange={setOpenTaskModal}>
      <Modal.Content title={"Edit task"} className="space-y-6 bg-foreground">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm capitalize text-muted">
              Title
            </label>

            <Input
              id="title"
              placeholder="e.g. take coffee break"
              {...register("title")}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="text-sm capitalize text-muted"
            >
              description
            </label>

            <Input
              id="title"
              placeholder="e.g. take coffee break on bulaba"
              {...register("description")}
            />
          </div>

          <div className="space-y-1.5">
            <header className="font-semibold text-card">
              subtasks ({completedSubTasks} of {task.subtasks?.length})
            </header>

            {fields.map((field, index) => (
              <div
                className="flex items-center w-full gap-3 text-background"
                key={field.id}
              >
                <Input
                  id={`sub_task${index}`}
                  {...register(`sub_tasks.${index}.completed`)}
                  placeholder="e.g. do 10 situps"
                  type="checkbox"
                  className="w-5"
                />
                <label
                  htmlFor={field.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {field.task}
                </label>
                <X
                  onClick={() => {
                    remove(index)
                  }}
                />
              </div>
            ))}
          </div>

          {/* status */}

          <div className="space-y-1.5">
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
          </div>

          <Button variant={"outline"}>Save Changes</Button>
        </form>
      </Modal.Content>
    </Modal>
  )
}

export default TaskInfo
