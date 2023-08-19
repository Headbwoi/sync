import BoardColumn from "@/components/boards/board-column"
import PageHeader from "@/components/layouts/page-header"

function Board({ params }: { params: { board: string } }) {
  const { board } = params

  const formattedBoard = board.replaceAll("-", " ")
  return (
    <div className="relative w-full overflow-hidden">
      <PageHeader selectedBoard={formattedBoard} />

      <BoardColumn />
    </div>
  )
}

export default Board
