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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ColumnType, columnSchema } from "@/lib/validations/form-validations"
import { PlusIcon } from "lucide-react"
import { useBoardContext } from "@/context/board-context"
import { useBoardStore } from "@/zustand/store"
import { DialogClose } from "@radix-ui/react-dialog"

export function AddColumn() {
  const matches = useMediaQuery("(min-width: 768px)")
  const { selectedBoard, currentBoard } = useBoardContext()
  const { addColumnToBoard } = useBoardStore((state) => state)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ColumnType>({
    resolver: zodResolver(columnSchema),
  })

  const onSubmit = ({ column }: ColumnType) => {
    // console.log(column)
    // console.log(selectedBoard)
    // console.log(currentBoard)

    addColumnToBoard({
      id: currentBoard.id,
      columns: currentBoard.columns as [],
      newColumn: {
        name: column,
        tasks: [],
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} aria-label="Add New Column">
          {matches ? (
            <>
              <PlusIcon /> Add New Column
            </>
          ) : (
            <PlusIcon />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2">
        <DialogHeader className="px-4">
          <DialogTitle>Add New Column</DialogTitle>
          <DialogDescription>
            Add a new column to your board here
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 py-4 mx-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* title */}
          <div className="flex flex-col items-start gap-4">
            <label htmlFor="column" className="text-sm text-right">
              Column
            </label>
            <Input
              id="column"
              className="col-span-3"
              placeholder="e.g. take coffee break"
              {...register("column")}
            />
            <p className="text-xs text-red-500">{errors.column?.message}</p>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
