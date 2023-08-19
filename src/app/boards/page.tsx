"use client"
import { CreateNewBoard } from "@/components/boards/create-new-board"
import { useBoardContext } from "@/context/board-context"
import Link from "next/link"

function Board() {
  const { boards, setCurrentBoard } = useBoardContext()
  return (
    <main className="flex flex-wrap items-center justify-center h-full min-h-screen gap-10 px-20 overflow-x-hidden">
      {boards.map((board, idx) => (
        <Link
          href={`/boards/${board.boardName.replaceAll(" ", "-")}`}
          key={board.boardName}
          className="flex flex-col gap-5"
          onClick={() => {
            setCurrentBoard(board)
          }}
        >
          <p>
            {board.boardName} ({board.columns.length})
          </p>

          <div className="w-[17.8125rem] rounded-lg p-5 bg-card-foreground">
            <header className="text-lg font-semibold text-background">
              {board.boardName}
            </header>
          </div>
        </Link>
      ))}

      {boards.length == 0 && (
        <section className="flex flex-col items-center justify-center w-screen gap-10">
          <h1>You seem to not have any boards yet</h1>

          <p>Create one now 😜</p>

          <CreateNewBoard expanded={true} setExpanded={(prev) => !prev} />
        </section>
      )}
    </main>
  )
}

export default Board
