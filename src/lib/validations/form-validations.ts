import { z } from "zod"

const CreateBoardSchema = z.object({
  boardName: z
    .string({ required_error: "Please enter board name" })
    .min(1, { message: "Please enter board name" }),
  description: z.string(),
})

type CreateBoardType = z.infer<typeof CreateBoardSchema>

const AddTaskSchema = z.object({
  title: z
    .string({ required_error: "Please provide a title" })
    .min(2, { message: "Please provide a title" }),
  description: z.string(),
  column: z
    .string({ required_error: "Please enter a coulmn" })
    .min(1, { message: "Please select a column" }),
  sub_tasks: z
    .array(
      z.object({
        task: z.string(),
        completed: z.boolean(),
      })
    )
    .optional(),
})

type AddTaskType = z.infer<typeof AddTaskSchema>

const columnSchema = z.object({
  column: z
    .string({ required_error: "Please enter column name" })
    .min(1, { message: "Please enter Column Name" }),
})

type ColumnType = z.infer<typeof columnSchema>

export {
  CreateBoardSchema,
  type CreateBoardType,
  AddTaskSchema,
  type AddTaskType,
  columnSchema,
  type ColumnType,
}
