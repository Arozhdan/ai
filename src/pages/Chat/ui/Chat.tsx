import styles from "./Chat.module.css"
import { ProfileBtn } from "@/widget/Layout/ui/ProfileBtn/ProfileBtn"
import { ChatList, ChatWindow, fetchChatList, getChatList } from "@/entities/Chat"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const Chat = () => {
  const chats = useSelector(getChatList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (chats.length > 0) return
    dispatch(fetchChatList())
  }, [dispatch])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <ProfileBtn />
        </div>
        <aside className={styles.aside}>
          <ChatList />
        </aside>
        <main className={styles.main}>
          <ChatWindow />
        </main>
      </div>
    </div>
  )
}

export default Chat
