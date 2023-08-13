"use client"

import { ChevronDown, KanbanIcon, Menu } from "lucide-react"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Icons } from "../icons"
import { useState } from "react"
import { useBoardContext } from "@/context/board-context"

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { boards, selectedBoard, setSelectedBoard } = useBoardContext()

  return (
    <aside className="px-5 flex items-center justify-between fixed top-0 w-full h-16 bg-foreground  ">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button size={"sm"} className="capitalize">
            {/* <Menu /> */}
            {selectedBoard}
            <ChevronDown />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="pl-0 bg-foreground">
          <SheetHeader className="pl-5">
            <SheetTitle>
              <Icons.logo />
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-5 mt-10">
            <header className="pl-5 uppercase">All Boards ( 3 )</header>

            <div className="space-y-3">
              {boards.map((board) => {
                const isActive = board === selectedBoard
                return (
                  <div
                    key={board}
                    className={`flex items-center gap-3  py-3 px-2 pl-5 capitalize rounded-r-full transition-colors ${
                      isActive
                        ? "bg-background text-foreground font-bold"
                        : "font-medium text-muted-foreground"
                    }`}
                    onClick={() => {
                      setSelectedBoard(board)
                      setIsOpen(false)
                    }}
                  >
                    <KanbanIcon /> {board}
                  </div>
                )
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  )
}

export default MobileNav
