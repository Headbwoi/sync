"use client"

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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CreateBoardSchema,
  CreateBoardType,
} from "@/lib/validations/form-validations"
import { useBoardStore } from "@/zustand/store"
import { DialogClose } from "@radix-ui/react-dialog"

export function CreateNewBoard({
  expanded,
  setExpanded,
}: {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const matches = useMediaQuery("(min-width: 768px)")

  const { createNewBoard } = useBoardStore((state) => state)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBoardType>({
    resolver: zodResolver(CreateBoardSchema),
  })

  const OnSubmit = (data: CreateBoardType) => {
    const payload = {
      ...data,
      columns: [],
      id: crypto.randomUUID().toString().replaceAll("-", ""),
    }

    // console.log(payload)

    createNewBoard(payload)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          aria-label="Create New Board"
          onClick={() => {
            !matches && setExpanded(false)
          }}
        >
          {!expanded ? (
            <PlusIcon />
          ) : matches ? (
            <>
              <PlusIcon /> Create A New Board
            </>
          ) : (
            <PlusIcon />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create A New Board</DialogTitle>
          <DialogDescription>
            Add a new board to your board here
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 py-4"
          onSubmit={handleSubmit(OnSubmit)}
        >
          {/* title */}
          <div className="flex flex-col items-start gap-4">
            <label htmlFor="board-name" className="text-sm text-right">
              Board Name
            </label>
            <Input
              id="board-name"
              className="col-span-3"
              placeholder="e.g. Start Workout"
              {...register("boardName")}
            />
            <p className="text-xs text-red-500">{errors.boardName?.message}</p>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save Board</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
