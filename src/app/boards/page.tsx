import { boards } from "@/utils/seed-data"
import Link from "next/link"

function Board() {
  return (
    <main className="flex flex-wrap items-center justify-center h-full min-h-screen gap-10 overflow-x-hidden">
      {boards.map((board, idx) => (
        <Link
          href={`/boards/${board.name.replaceAll(" ", "-")}`}
          key={board.name}
          className="flex flex-col gap-5"
        >
          <p>
            {board.name} ({board.columns.length})
          </p>

          <div className="w-[17.8125rem] rounded-lg p-5 bg-card-foreground">
            <header className="text-lg font-semibold text-background">
              {board.name}
            </header>
          </div>
        </Link>
      ))}
    </main>
  )
}

export default Board
