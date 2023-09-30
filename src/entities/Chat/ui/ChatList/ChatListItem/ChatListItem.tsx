import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline"
import styles from "./ChatListItem.module.css"
import { FC } from "react"
import { useDateFormatter } from "@/shared/lib/useDateFormatter/useDateFormatter"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { chatActions } from "@/entities/Chat"
import clsx from "clsx"

interface Props {
  id: number
  name?: string
  date?: string
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
  return (
    <div className={classes} onClick={handleClick}>
      <div className={styles.icon}>
        <ChatBubbleBottomCenterIcon />
      </div>
      <div className={styles.content}>
        {name || "Без имени"} <small> ({useDateFormatter(date!, null, "dd MMMM, yyyy")})</small>
      </div>
    </div>
  )
}
