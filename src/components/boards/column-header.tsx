import React, { FormEvent, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { MoreVertical } from "lucide-react"
import { useBoardStore } from "@/zustand/store"
import Modal from "../ui/modal"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

type ColumnHeaderProps = {
  info: {
    columnName: string
    boardId: string
    columnIndex: number
  }
}

function ColumnHeader({ info }: ColumnHeaderProps) {
  const { deleteColumn } = useBoardStore((state) => state)
  const [showEditColumn, setShowEditColumn] = useState(false)

  const handleDeleteColumn = ({ info }: ColumnHeaderProps) => {
    deleteColumn(info)
  }

  const editProps = {
    showEditColumn,
    setShowEditColumn,
    info,
  }

  return (
    <>
      <div className="relative flex items-center justify-between">
        <p className="font-bold capitalize ">{info.columnName}</p>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="cursor-pointer">
            <DropdownMenuLabel>Edit Column</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setShowEditColumn(true)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-semibold cursor-pointer text-destructive"
              onClick={() => handleDeleteColumn({ info })}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showEditColumn && <EditColumnName {...editProps} />}
    </>
  )
}

export default ColumnHeader

type EditProps = ColumnHeaderProps & {
  showEditColumn: boolean
  setShowEditColumn: React.Dispatch<React.SetStateAction<boolean>>
}

const EditColumnName = ({
  info,
  setShowEditColumn,
  showEditColumn,
}: EditProps) => {
  const { editColumn } = useBoardStore((state) => state)
  const [columnName, setColumnName] = useState(info.columnName)

  const handleEditColumn = (e: FormEvent) => {
    e.preventDefault()

    // edit column edits the column
    editColumn({
      boardId: info.boardId,
      columnIndex: info.columnIndex,
      columnName,
    })
    setShowEditColumn(false)
  }

  return (
    <Modal open={showEditColumn} onOpenChange={setShowEditColumn}>
      <Modal.Content title="Edit Column" className="w-full">
        <form className="w-full mt-5 space-y-5 " onSubmit={handleEditColumn}>
          <Input
            placeholder="Enter new column name"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />

          <Button variant={"outline"} type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  )
}
