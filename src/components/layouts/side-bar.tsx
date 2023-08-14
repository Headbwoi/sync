"use client"
import {
  ChevronLast,
  ChevronFirst,
  KanbanIcon,
  EyeOff,
  SunIcon,
  MoonStar,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Icons } from "../icons"
import { useBoardContext } from "@/context/board-context"
import { useTheme } from "next-themes"
import { useWindowSize } from "@/hooks/useWindowSize"
import { Switch } from "../ui/switch"

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const { boards, selectedBoard } = useBoardContext()
  const { theme, setTheme } = useTheme()

  const { height } = useWindowSize()

  return (
    <aside
      style={{
        height: `${height}px`,
      }}
    >
      <nav className="flex flex-col h-full border-r shadow-sm bg-foreground">
        <div className="flex items-center justify-between px-4 py-2">
          {expanded && <Icons.logo />}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-secondary"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <>
          <ul className="flex-1 px-3">
            <div className="space-y-3">
              {boards.map((board) => {
                const isActive = board === selectedBoard
                return (
                  <>
                    <SidebarItem
                      active={isActive}
                      alert={isActive}
                      expanded={expanded}
                      text={board}
                      key={board}
                    />
                  </>
                )
              })}
            </div>
          </ul>
        </>

        <section className="px-5 space-y-5">
          <div
            className={`flex items-center justify-center gap-6 p-5 rounded-sm bg-background ${
              !expanded && "overflow-hidden w-0 invisible"
            }`}
          >
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
            className={`flex items-center gap-5 text-xs cursor-pointer text-secondary ${
              !expanded && "overflow-hidden w-0"
            }`}
            onClick={() => setExpanded(false)}
          >
            <EyeOff className="w-3 text-muted" />
            <p className="">Hide Sidebar</p>
          </div>
        </section>
      </nav>
    </aside>
  )
}

export function SidebarItem({
  text,
  active,
  alert,
  expanded,
}: {
  text: string
  active: boolean
  alert: boolean
  expanded: boolean
}) {
  const { setSelectedBoard } = useBoardContext()

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium text-lg rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-secondary font-semibold"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
      onClick={() => setSelectedBoard(text)}
      key={text}
    >
      <KanbanIcon className="text-card" />
      <span
        className={`overflow-hidden transition-all capitalize ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-background ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 capitalize
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}
