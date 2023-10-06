import { ChatBubbleBottomCenterIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline"
import styles from "./ChatListItem.module.css"
import { FC } from "react"
import { useDateFormatter } from "@/shared/lib/useDateFormatter/useDateFormatter"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { chatActions, deleteChat, renameChat } from "@/entities/Chat"
import clsx from "clsx"

interface Props {
  id: number
  name?: string
  date: string
  active: boolean
}

export const ChatListItem: FC<Props> = ({ name, id, date, active }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(chatActions.setSelectedChat({ id }))
  }
  const classes = clsx(styles.wrapper, {
    [styles.active]: active,
  })

  const handleDelete = () => {
    const confirmed = window.confirm("Вы действительно хотите удалить чат?")
    if (!confirmed) return
    dispatch(deleteChat(id))
  }

  const handleRename = () => {
    const newName = window.prompt("Введите новое имя чата")
    if (!newName) return
    dispatch(renameChat({ chatId: id, chatName: newName }))
  }

  return (
    <div className={classes} onClick={handleClick}>
      <div className={styles.chatIcon}>
        <ChatBubbleBottomCenterIcon />
      </div>
      <div className={styles.content}>
        {name || "Без имени"}
        {!name && <small> ({useDateFormatter(date, null, "dd MMMM, yyyy")})</small>}
      </div>
      <div className={styles.actions}>
        <button className={styles.button} onClick={handleRename}>
          <PencilIcon className={styles.icon} />
        </button>
        <button className={styles.button} onClick={handleDelete}>
          <XMarkIcon className={styles.icon} />
        </button>
      </div>
    </div>
  )
}
