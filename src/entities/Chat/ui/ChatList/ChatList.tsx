import { clsx } from "clsx"
import styles from "./ChatList.module.css"
import { ChatListItem } from "./ChatListItem/ChatListItem"
import { Button, LogoExpanded } from "@/shared/ui"
import { PlusCircleIcon } from "@heroicons/react/20/solid"
import { Link } from "react-router-dom"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid"
import { useSelector } from "react-redux"
import { createNewChat, getActiveChat, getChatList } from "../.."
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"

export const ChatList = () => {
  const dispatch = useAppDispatch()
  const classes = clsx(styles.wrapper)

  const chatList = useSelector(getChatList)
  const activeChat = useSelector(getActiveChat)
  const handleClick = () => {
    console.log("click")
    dispatch(createNewChat())
  }

  return (
    <div className={styles.root}>
      <div className={classes}>
        <div className={styles.logo}>
          <Link to='/'>
            <LogoExpanded />
          </Link>
        </div>

        <hr />
        <Button
          iconLeft={<PlusCircleIcon className='text-primary my-4' />}
          size='small'
          variant='white'
          onClick={handleClick}
        >
          Создать чат
        </Button>
        <hr />
        <div className={styles.list}>
          {chatList.map((chat) => (
            <ChatListItem
              active={activeChat?.id === chat.id}
              id={chat.id}
              date={chat.updatedAt}
              name={chat.name}
              key={chat.id}
            />
          ))}
        </div>
      </div>
      <Link to='/' className={styles.back}>
        <Button className='w-full' variant='primary' iconLeft={<ArrowLeftOnRectangleIcon />}>
          Вернуться домой
        </Button>
      </Link>
    </div>
  )
}
