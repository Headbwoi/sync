import { create } from "zustand"
import { persist } from "zustand/middleware"

interface StoreState {
  boards: {
    id: string
    boardName: string
    description: string
    columns:
      | {
          name: string
          tasks: {
            id: string
            name: string
            description: string
            subtasks: {
              name: string
              completed: boolean
            }[]
          }[]
        }[]
      | []
  }[]
  createNewBoard: (data: {
    id: string
    boardName: string
    description: string
    columns: never[]
  }) => void

  addColumnToBoard: (data: {
    id: string
    newColumn: {
      name: string
      tasks: []
    }
    columns: []
  }) => void
}

export const useBoardStore = create<StoreState>()(
  persist(
    (set) => ({
      boards: [],
      createNewBoard: (data) =>
        set((state) => ({
          boards: [...state.boards, data],
        })),
      addColumnToBoard: (data) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === data.id
              ? { ...board, columns: [...board.columns, data.newColumn] }
              : board
          ),
        })),
    }),
    {
      name: "my_sync_board",
    }
  )
)
