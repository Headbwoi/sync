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
            subtasks:
              | {
                  task: string
                  completed: boolean
                }[]
              | undefined
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

  deleteColumn: (data: { boardId: string; columnName: string }) => void
  editColumn: (data: {
    boardId: string
    columnName: string
    columnIndex: number
  }) => void

  // tasks

  addTaskToColumn: (data: {
    id: string
    boardId: string
    columnInfo: {
      name: string
      index: number
    }
    description: string
    title: string
    status: string
    subtasks:
      | {
          completed: boolean
          task: string
        }[]
      | undefined
  }) => void

  editTask: (data: {
    boardId: string
    columnName: string
    taskInfo: {
      id: string
      name: string
      description: string
      subtasks:
        | {
            task: string
            completed: boolean
          }[]
        | undefined
    }
  }) => void
}

export const useBoardStore = create<StoreState>()(
  persist(
    (set) => ({
      boards: [],

      //   creates a new board
      createNewBoard: (data) =>
        set((state) => ({
          boards: [...state.boards, data],
        })),

      // adds a column to the board
      addColumnToBoard: (data) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === data.id
              ? { ...board, columns: [...board.columns, data.newColumn] }
              : board
          ),
        })),

      // delete the column

      deleteColumn: (data) =>
        set((state) => {
          const updatedBoards = state.boards.map((board) => {
            if (board.id === data.boardId) {
              const columns = [...board.columns]

              const newColumns = columns.filter(
                (column) => column.name !== data.columnName
              )

              return {
                ...board,
                columns: newColumns,
              }
            }
            return board
          })

          return {
            boards: updatedBoards,
          }
        }),

      // edits a column
      editColumn: (data) =>
        set((state) => {
          const updatedBoards = state.boards.map((board) => {
            if (board.id === data.boardId) {
              const columns = [...board.columns]

              columns[data.columnIndex].name = data.columnName

              return {
                ...board,
                columns,
              }
            }
            return board
          })

          return {
            boards: updatedBoards,
          }
        }),

      // add tasks to the column in the board
      addTaskToColumn: (data) =>
        set((state) => {
          const updatedBoards = state.boards.map((board) => {
            if (board.id === data.boardId) {
              const updatedColumns = [...board.columns]

              const col = updatedColumns.find(
                (column) => column.name === data.columnInfo.name
              )

              col?.tasks.push({
                id: data.id,
                description: data.description,
                name: data.title,
                subtasks: data.subtasks ? data.subtasks : [],
              })
              return { ...board, columns: updatedColumns }
            }
            return board
          })

          return { boards: updatedBoards }
        }),

      // edit a task
      editTask: (data) =>
        set((state) => {
          const boardIndex = state.boards.findIndex(
            (board) => board.id === data.boardId
          )

          if (boardIndex === -1) {
            return state // If board is not found, return the current state
          }

          // Find the column by name
          const column = state.boards[boardIndex].columns.find(
            (col) => col.name === data.columnName
          )

          if (!column) {
            return state // If column is not found, return the current state
          }

          // Find the task by id
          const taskIndex = column.tasks.findIndex(
            (task) => task.id === data.taskInfo.id
          )

          if (taskIndex === -1) {
            return state // If task is not found, return the current state
          }

          // Update the specific task with the provided data
          column.tasks[taskIndex] = {
            ...column.tasks[taskIndex],
            ...data.taskInfo,
          }

          // Create a new state object with the updated task
          const newState = {
            ...state,
            boards: [...state.boards],
          }

          return newState
        }),
    }),
    {
      name: "my_sync_board",
    }
  )
)
