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
import { PlusIcon } from "lucide-react"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  // status: z.enum(["todo", "done", "pending"])
  status: z.string(),
  //   sub_tasks: z.array(z.string()),
})

type TaskType = z.infer<typeof TaskSchema>

export function AddTaskModal() {
  const matches = useMediaQuery("(min-width: 768px)")

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TaskType>({
    resolver: zodResolver(TaskSchema),
  })

  const onSubmit = (tasks: TaskType) => {
    console.log(tasks)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          {matches ? (
            <>
              <PlusIcon /> Add New Task
            </>
          ) : (
            <PlusIcon />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your board here
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 py-4"
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
          </div>

          {/* status */}
          <div className="flex flex-col items-start gap-5">
            <label htmlFor="status" className="text-sm text-right">
              Status
            </label>
            <Select {...register("status")}>
              <SelectTrigger>
                <SelectValue placeholder="Todo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="doing">Doing</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Save changes</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
