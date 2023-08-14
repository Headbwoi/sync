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

export function CreateNewBoard({ expanded }: { expanded: boolean }) {
  const matches = useMediaQuery("(min-width: 768px)")
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          {!expanded ? (
            <PlusIcon />
          ) : matches ? (
            <>
              <PlusIcon /> Create New Board
            </>
          ) : (
            <PlusIcon />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Boards</DialogTitle>
          <DialogDescription>
            Add a new board to your board here
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 py-4">
          {/* title */}
          <div className="flex flex-col items-start gap-4">
            <label htmlFor="title" className="text-sm text-right">
              Title
            </label>
            <Input
              id="title"
              className="col-span-3"
              placeholder="e.g. take coffee break"
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
            />
          </div>

          {/* status */}
          <div className="flex flex-col items-start gap-5">
            <label htmlFor="status" className="text-sm text-right">
              Status
            </label>
            <Select>
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
        </form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
