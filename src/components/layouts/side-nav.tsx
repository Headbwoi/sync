"use client"

import { useBoardContext } from "@/context/board-context"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {
  ChevronRight,
  EyeOff,
  KanbanIcon,
  Menu,
  MoonStar,
  SunIcon,
} from "lucide-react"
import { useState } from "react"
import { Icons } from "../icons"
import { Switch } from "../ui/switch"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"

function SideNav() {
  const matches = useMediaQuery("(min-width: 768px)")
  const { boards, selectedBoard, setSelectedBoard } = useBoardContext()
  const [isOpen, setIsOpen] = useState(true)
  const { theme, setTheme } = useTheme()

  if (!matches) return null

  return (
    <>
      {!isOpen && (
        <Button size={"icon"} onClick={() => setIsOpen(true)}>
          <ChevronRight />
        </Button>
      )}
      <aside
        className={`${
          isOpen ? "min-w-[18rem]" : " hidden "
        } h-screen bg-foreground shadow-md`}
      >
        <div className="pl-5 pt-6">
          <Icons.logo />
        </div>

        <div className="flex flex-col gap-5 my-10">
          <header className="pl-5 uppercase">All Boards ( 3 )</header>

          <div className="space-y-3">
            {boards.map((board) => {
              const isActive = board === selectedBoard
              return (
                <div
                  key={board}
                  className={`flex items-center gap-3  py-3 px-2 pl-5 capitalize rounded-r-full transition-colors cursor-pointer ${
                    isActive
                      ? "bg-popover text-foreground font-bold"
                      : "font-medium text-muted-foreground"
                  }`}
                  onClick={() => {
                    setSelectedBoard(board)
                  }}
                >
                  <KanbanIcon /> {board}
                </div>
              )
            })}
          </div>
        </div>

        <section className="px-5 space-y-5">
          <div className="flex items-center justify-center gap-2 bg-background p-5 rounded-sm">
            <SunIcon className="text-foreground" />
            <Switch
              id="theme"
              checked={theme === "dark"}
              onClick={() => {
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }}
            />
            <MoonStar className="text-foreground" />
          </div>

          <div
            className="flex items-center gap-5 cursor-pointer text-secondary"
            onClick={() => setIsOpen(false)}
          >
            <EyeOff className="text-muted" />
            <p className="">Hide Sidebar</p>
          </div>
        </section>
      </aside>
    </>
  )
}

export default SideNav
