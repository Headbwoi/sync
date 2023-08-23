import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Loader, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { useBoardStore } from "@/zustand/store"

function ClearData() {
  const [show, setShow] = useState(false)
  return <Clear show={show} setShow={setShow} />
}

export default ClearData

const Clear = ({
  setShow,
  show,
}: {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isClearing, setIsClearing] = useState(false)
  const router = useRouter()
  const { reset } = useBoardStore((state) => state)

  const handleClearData = () => {
    setIsClearing(true)
    localStorage.removeItem("my_sync_board")

    setTimeout(() => {
      reset()
    }, 800)

    setTimeout(() => {
      setIsClearing(false)
      setShow(false)
      router.replace("/")
    }, 1000)
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Trash className="text-red-500 mx-auto mb-10 cursor-pointer" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clear Your Data</DialogTitle>
          <DialogDescription>
            Clear all your boards, task, everything. As a result, them go just
            trabaye
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-10">
          <DialogClose>
            <Button variant={"secondary"}>cancel</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={handleClearData}>
            {isClearing ? <Loader className="animate-spin" /> : "Clear"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
